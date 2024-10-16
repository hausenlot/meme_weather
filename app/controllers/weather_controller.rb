class WeatherController < ApplicationController
  require 'date'

  def index
    session[:mode] ||= 'hourly'
    @forecast_mode = session[:mode]
    @current_hour = Time.now.strftime("%Y-%m-%dT%H:00")
    @current_day = Time.now.strftime("%Y-%m-%d")
    
    if params[:latitude].present? && params[:longitude].present?
      @latitude = params[:latitude]
      @longitude = params[:longitude]
    
      current_location(latitude: @latitude, longitude: @longitude)
      current_weather(latitude: @latitude, longitude: @longitude)

      if @forecast_mode == 'hourly'
        hourly_forecast(latitude: @latitude, longitude: @longitude)
      else
        daily_forecast(latitude: @latitude, longitude: @longitude)
      end
    end    
  end

  def update_coordinates
    latitude = params[:latitude]
    longitude = params[:longitude]
    redirect_to root_path(latitude: latitude, longitude: longitude)
  end

  def current_location(latitude:, longitude:)
    cache_key = "location/#{@latitude},#{@longitude}"
    location_data = Rails.cache.read(cache_key)
    unless location_data
      begin
        location_response = HTTParty.get("https://nominatim.openstreetmap.org/reverse", {
          query: {
            format: 'json',
            lat: @latitude,
            lon: @longitude
          }
        })
    
        if location_response.success?
          location_data = location_response.parsed_response["address"]
          Rails.cache.write(cache_key, location_data, expires_in: 24.hours)
        else
          location_data = {}
        end
    
      rescue StandardError => e
        Rails.logger.error "Location API failed: #{e.message}"
        location_data = {}
      end
    end      
    
    @city = location_data["city"] || location_data["town"] || location_data["village"] || "Location not available. Wait 1 minute then refresh the page to show location. But the weather API works, no worries."
    @country = location_data["country"] || ""
  end

  def current_weather(latitude:, longitude:)
    weather_response = HTTParty.get("https://api.open-meteo.com/v1/forecast", {
      query: {
        latitude: @latitude,
        longitude: @longitude,
        current_weather: true,
        timezone: 'auto'
      }
    })
  
    if weather_response.success?
      @weather = weather_response.parsed_response
      @weather_code = @weather.dig("current_weather", "weathercode") || 0
    else
      @weather_code = 0
    end
  end

  def hourly_forecast(latitude:, longitude:)
    weather_response_15 = HTTParty.get("https://api.open-meteo.com/v1/forecast", {
        query: {
          latitude: latitude,
          longitude: longitude,
          hourly: 'weather_code,temperature_2m,precipitation_probability',
          timezone: 'auto'
        }
      })
      
      if weather_response_15.success?
        @weather_data = weather_response_15.parsed_response
        @hourly_forecast = @weather_data['hourly']
        today = Date.today.iso8601
        today_forecast = []
        @hourly_forecast['time'].each_with_index do |timestamp, index|
          if timestamp.start_with?(today)
            today_forecast << {
              time: timestamp,
              temperature: @hourly_forecast['temperature_2m'][index],
              weather_code: @hourly_forecast['weather_code'][index],
              precipitation_probability: @hourly_forecast['precipitation_probability'][index]
            }
          end
        end

        @today_forecast = today_forecast

      else
        @error_message = "Failed to fetch weather data: #{weather_response_15.message}"
      end
  end

  def daily_forecast(latitude:, longitude:)
    weather_response_daily = HTTParty.get("https://api.open-meteo.com/v1/forecast", {
      query: {
        latitude: @latitude,
        longitude: @longitude,
        daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max',
        timezone: 'auto'
      }
    })

    if weather_response_daily.success?
      @weather_data = weather_response_daily.parsed_response
      @daily_forecast = @weather_data['daily']
      today_forecast = []
      @daily_forecast['time'].each_with_index do |timestamp, index|
        today_forecast << {
          time: timestamp,
          temperature_2m_max: @daily_forecast['temperature_2m_max'][index], 
          temperature_2m_min: @daily_forecast['temperature_2m_min'][index],
          weather_code: @daily_forecast['weather_code'][index],
          precipitation_probability_max: @daily_forecast['precipitation_probability_max'][index],
        }
      end
      @today_forecast = today_forecast
    else
      @error_message = "Unable to fetch daily forecast."
    end
  end

  def toggle_forecast_mode
    session[:mode] = session[:mode] == 'hourly' ? 'daily' : 'hourly'
    redirect_to root_path
  end
end

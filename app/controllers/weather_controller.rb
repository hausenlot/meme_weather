class WeatherController < ApplicationController
  def index
    if params[:latitude].present? && params[:longitude].present?
      @latitude = params[:latitude]
      @longitude = params[:longitude]
    
      cache_key = "location/#{@latitude},#{@longitude}"
      location_data = Rails.cache.read(cache_key)
      unless location_data
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
      end
    
      @city = location_data["city"] || location_data["town"] || location_data["village"] || "Unknown City"
      @country = location_data["country"] || "Unknown Country"
      
      weather_response = HTTParty.get("https://api.open-meteo.com/v1/forecast", {
        query: {
          latitude: @latitude,
          longitude: @longitude,
          current_weather: true
        }
      })
    
      if weather_response.success?
        @weather = weather_response.parsed_response
        @weather_code = @weather.dig("current_weather", "weathercode") || 0
      else
        @weather_code = 0
      end
    end    
  end

  def update_coordinates
    latitude = params[:latitude]
    longitude = params[:longitude]
    redirect_to root_path(latitude: latitude, longitude: longitude)
  end
end

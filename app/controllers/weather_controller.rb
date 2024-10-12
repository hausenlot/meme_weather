class WeatherController < ApplicationController
  def index

    if !params[:latitude].nil? || !params[:longitude].nil?
      @latitude = params[:latitude].presence
      @longitude = params[:longitude].presence

      response = HTTParty.get("https://api.open-meteo.com/v1/forecast", {
        query: {
          latitude: @latitude,
          longitude: @longitude,
          current_weather: true
        }
      })

      if response.success?
        @weather = response.parsed_response
        @weather_code = @weather["current_weather"]["weathercode"] # Ensure this is getting the correct value
      else
        @weather_code = 0 # Fallback to 0 if there's no response
      end
    end
  end

  def update_coordinates
    latitude = params[:latitude]
    longitude = params[:longitude]
    redirect_to root_path(latitude: latitude, longitude: longitude)
  end
end

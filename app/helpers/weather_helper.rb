module WeatherHelper
  def weather_description(code)
    case code
    when 0
      "Clear sky"
    when 1
      "Mainly clear"
    when 2
      "Partly cloudy"
    when 3
      "Overcast"
    when 45
      "Fog"
    when 45, 48
      "Depositing rime fog"
    when 51
      "Drizzle: Light"
    when 53
      "Drizzle: Moderate"
    when 55
      "Drizzle: Dense intensity"
    when 56
      "Freezing Drizzle: Light"
    when 57
      "Freezing Drizzle: Dense intensity"
    when 61
      "Rain: Slight"
    when 63
      "Rain: Moderate"
    when 65
      "Rain: Heavy intensity"
    when 66
      "Freezing Rain: Light"
    when 67
      "Freezing Rain: Heavy intensity"
    when 71
      "Snow fall: Slight"
    when 73
      "Snow fall: Moderate"
    when 75
      "Snow fall: Heavy intensity"
    when 77
      "Snow grains"
    when 80
      "Rain showers: Slight"
    when 81
      "Rain showers: Moderate"
    when 82
      "Rain showers: Violent"
    when 85
      "Snow showers: Slight"
    when 85, 86
      "Snow showers: Heavy"
    when 95
      "Thunderstorm: Slight or moderate"
    when 96
      "Thunderstorm with slight hail"
    when 99
      "Thunderstorm with heavy hail"
    else
      "Unknown weather code"
    end
  end
end

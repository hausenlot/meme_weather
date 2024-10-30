module WeatherHelper
  def weather_description(code)
    case code
    when 0
      "Clear sky" # DONE
    when 1
      "Mainly clear" # DONE
    when 2
      "Partly cloudy" # DONE
    when 3
      "Overcast" # DONE
    when 45
      "Fog" # DONE
    when 48
      "Depositing rime fog" # DONE
    when 51
      "Drizzle: Light" # DONE
    when 53
      "Drizzle: Moderate" # DONE
    when 55
      "Drizzle: Dense intensity" # DONE
    when 56
      "Freezing Drizzle: Light" # DONE
    when 57
      "Freezing Drizzle: Dense intensity" # DONE
    when 61
      "Rain: Slight" # DONE
    when 63
      "Rain: Moderate" # DONE
    when 65
      "Rain: Heavy intensity" # DONE
    when 66
      "Freezing Rain: Light" # PLACE HOLDER 61
    when 67
      "Freezing Rain: Heavy intensity" # PLACE HOLDER 65
    when 71
      "Snow fall: Slight" # DONE
    when 73
      "Snow fall: Moderate" # DONE
    when 75
      "Snow fall: Heavy intensity" # DONE
    when 77
      "Snow grains" # PLACE HOLDER 71
    when 80
      "Rain showers: Slight" # DONE
    when 81
      "Rain showers: Moderate" # DONE
    when 82
      "Rain showers: Violent" # DONE
    when 85
      "Snow showers: Slight" # DONE
    when 86
      "Snow showers: Heavy" # DONE
    when 95
      "Thunderstorm: Slight to moderate" # DONE
    when 96
      "Thunderstorm with slight hail" # DONE
    when 99
      "Thunderstorm with heavy hail" # DONE
    else
      "Unknown weather code" # DONE
    end
  end
end

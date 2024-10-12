// app/javascript/controllers/weather_controller.js
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static values = { weatherCode: Number };

  connect() {
    const weatherCode = parseInt(this.element.dataset.weatherCodeValue, 10);
    this.setBackgroundColor(weatherCode);
  }

  setBackgroundColor(weatherCode) {
    let backgroundColor;

    switch (weatherCode) {
      case 0:
        backgroundColor = "lightblue"; // Clear sky
        break;
      case 1:
      case 2:
      case 3:
        backgroundColor = "lightgray"; // Mainly clear, partly cloudy, overcast
        break;
      case 45:
      case 48:
        backgroundColor = "lightyellow"; // Fog and depositing rime fog
        break;
      case 51:
      case 53:
      case 55:
        backgroundColor = "lightgreen"; // Drizzle: Light, moderate, dense
        break;
      case 56:
      case 57:
        backgroundColor = "lightcyan"; // Freezing Drizzle: Light, dense
        break;
      case 61:
      case 63:
      case 65:
        backgroundColor = "blue"; // Rain: Slight, moderate, heavy intensity
        break;
      case 66:
      case 67:
        backgroundColor = "deepskyblue"; // Freezing Rain: Light, heavy
        break;
      case 71:
      case 73:
      case 75:
        backgroundColor = "white"; // Snow fall: Slight, moderate, heavy
        break;
      case 77:
        backgroundColor = "lightgray"; // Snow grains
        break;
      case 80:
      case 81:
      case 82:
        backgroundColor = "dodgerblue"; // Rain showers: Slight, moderate, violent
        break;
      case 85:
      case 86:
        backgroundColor = "whitesmoke"; // Snow showers: Slight, heavy
        break;
      case 95:
        backgroundColor = "darkgray"; // Thunderstorm: Slight, moderate
        break;
      case 96:
      case 99:
        backgroundColor = "purple"; // Thunderstorm with hail: Slight, heavy
        break;
      default:
        backgroundColor = "white"; // Default
        break;
    }

    // Set background color
    document.body.style.backgroundColor = backgroundColor;

    // Log the selected color to the console
    console.log(`Weather code: ${weatherCode}, Background color: ${backgroundColor}`);
  }
}

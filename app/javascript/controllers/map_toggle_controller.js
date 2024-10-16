import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="map-toggle"
export default class extends Controller {
  initialize() {
    this.mapWrapper = document.getElementById('map-wrapper');
  }

  toggleMap() {
    const toggleBtn = document.getElementById('toggle-btn');

    if (this.mapWrapper.style.height === "500px") {
      this.mapWrapper.style.height = "0";
      toggleBtn.innerHTML  = "Show Map";
    } else {
      this.mapWrapper.style.height = "500px";
      toggleBtn.innerHTML  = "Hide Map";
    }
  }
}

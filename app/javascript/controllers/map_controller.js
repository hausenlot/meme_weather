import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["map"];

  connect() {
    const latitude = this.data.get("latitude");
    const longitude = this.data.get("longitude");
    console.log(latitude, longitude);

    if (latitude && longitude) {
      this.initializeMap(latitude, longitude);
      console.log("initializing map");
    } else {
      this.getCurrentLocation();
      console.log("getting current location and initializing map");
    }
  }

  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        
        this.initializeMap(latitude, longitude)
        this.updateCoordinatesDisplay(latitude, longitude);
        document.getElementById('latitude').value = latitude;
        document.getElementById('longitude').value = longitude;
        document.querySelector('form').submit();
      },
      (error) => {
        console.error("Error getting location: ", error);
      }
    );
  }

  initializeMap(latitude, longitude) {
    const map = L.map(this.mapTarget).setView([latitude, longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const marker = L.marker([latitude, longitude], { draggable: true }).addTo(map)
      .bindPopup('Drag me to set a new location!')
      .openPopup();

    marker.on('dragend', (event) => {
      const markerPosition = event.target.getLatLng();
      console.log(`New Latitude: ${markerPosition.lat}, New Longitude: ${markerPosition.lng}`);
      
      this.updateCoordinatesDisplay(markerPosition);
    });
    
    map.on('click', (event) => {
      const markerPosition = event.latlng;
      marker.setLatLng(markerPosition);
      this.updateCoordinatesDisplay(markerPosition);
    });
  }

  updateCoordinatesDisplay(markerPosition) {
    const coordinatesDisplay = document.getElementById("coordinates");
    coordinatesDisplay.innerText = `Latitude: ${markerPosition.lat}, Longitude: ${markerPosition.lng}`;
    document.getElementById('latitude').value = markerPosition.lat;
    document.getElementById('longitude').value = markerPosition.lng;
  }
}

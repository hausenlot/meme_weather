import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="video"
export default class extends Controller {
  connect() {
    this.video = document.getElementById('myVideo');
    this.playButton = document.getElementById('playButton');

    // Show the button after the video is loaded
    this.video.addEventListener('loadeddata', () => {
      this.playButton.style.display = 'block'; // Show the button
    });

    // Add event listener to unmute the video on button click
    this.playButton.addEventListener('click', () => {
      this.video.muted = false; // Unmute the video
      this.playButton.style.display = 'none'; // Hide the button after unmuting
      this.video.play(); // Play the video if not already playing
    });
  }
}

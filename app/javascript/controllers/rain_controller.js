import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    this.createRain();
  }

  createRain() {
    let counter = 200;
    for (let i = 0; i < counter; i++) {
      let hrElement = document.createElement("HR");

      // Randomize raindrop size by adjusting width and border-right-width
      let rainWidth = Math.random() * 20 + 10;  // Random width between 20px and 50px

      hrElement.style.left = Math.floor(Math.random() * window.innerWidth) + "px";
      hrElement.style.animationDuration = 0.2 + Math.random() * 0.3 + "s";
      hrElement.style.animationDelay = Math.random() * 5 + "s";

      // Dynamically set width and border-right-width to adjust raindrop size
      hrElement.style.width = `${rainWidth}px`;
      hrElement.style.borderRightWidth = `${rainWidth}px`;

      // Add the HR element to the container
      this.element.appendChild(hrElement);
    }
  }
}

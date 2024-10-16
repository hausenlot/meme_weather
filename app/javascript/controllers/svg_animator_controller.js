import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["container"];

  connect() {
    this.spawnSVGs();
  }

  spawnSVGs() {
    const svgCount = 5; // Number of SVGs to spawn
    for (let i = 0; i < svgCount; i++) {
      const svgElement = this.createSVGElement(i);
      const speed = this.randomSpeed();
      const top = this.randomPosition("height"); // Get random top position
      const left = this.randomPosition("width");  // Get random left position

      // Set styles dynamically
      svgElement.style.top = `${top}px`;
      svgElement.style.left = `${left}px`;
      svgElement.style.animationDuration = `${speed}s`;

      this.containerTarget.appendChild(svgElement);
    }
  }

  createSVGElement(index) {
    const svgWrapper = document.createElement("div");
    svgWrapper.classList.add("absolute", "animate-move"); // Animating class

    // Customize the SVG shapes here or pass them dynamically
    svgWrapper.innerHTML = `
      <svg width="300" height="300" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M51.8038 58.2347C52.2128 58.2547 52.1121 58.2882 52.5 58.2996C52.1322 58.2306 52.227 58.1969 51.8038 58.2347ZM51.8038 58.2347C40.2615 57.6709 20.8643 53.4833 25.5 33.7815C30.3 13.3815 48.5 10.9482 57 12.2815C61.6083 13.1044 70.3771 17.6654 69.0551 29.3346M51.8038 58.2347C49.1586 58.4712 45.8103 60.7988 46.5 65.2815C46.8333 66.1149 48 67.7815 50 67.7815L3.5 73.7815L59 71.7815L52 73.7815H118L98 71.7815C103.833 70.9482 118.5 66.0815 114.5 57.2815C110.5 48.4815 97.5 51.2815 93.5 53.2815C100.5 47.5 96.8333 42.3544 90.5 42C101.5 31 96.5 17 84 17.982C77.5 17.982 69.7515 25.571 69.0551 29.3346M69.0551 29.3346C69.0384 29.4824 69.0752 29.1845 69.0551 29.3346ZM69.0551 29.3346C69.062 29.198 69.0254 29.4954 69.0551 29.3346Z" fill="#FFFFFF" stroke="black"/>
      </svg>`;
    
    return svgWrapper;
  }

  randomSpeed() {
    return Math.random() * 4 + 3; // Random speed between 3s to 7s
  }

  randomPosition(dimension) {
    const svgSize = 300; // SVG size (300px height and width)
    if (dimension === "height") {
      const maxHeight = window.innerHeight; // Get viewport height
      return Math.random() * (maxHeight - svgSize); // Random top position within viewport
    } else if (dimension === "width") {
      const maxWidth = window.innerWidth; // Get viewport width
      return Math.random() * (maxWidth - svgSize); // Random left position within viewport
    }
  }
}

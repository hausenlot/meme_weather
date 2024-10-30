import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["cloudContainer", "cycleContainer"];
  static values = { weatherCode: Number, cycleCode: Number };

  connect() {
    const weatherCode = parseInt(this.element.dataset.weatherCodeValue, 10);
    const cycleCode = parseInt(this.element.dataset.cycleCodeValue, 10);
    this.weatherCode(weatherCode, cycleCode);
    this.updateColor(cycleCode);
    // this.wholeHail();
  }

  updateColor(cycleCode) {
    let backgroundColor

    if (cycleCode === 1) {
      this.cycleContainerTarget.classList.remove("text-night");
      backgroundColor = `linear-gradient(to bottom, #87CEEB 10%, #b4dded 80%, #c5e2ed 100%)` // DAY CLEAR
      this.cycleContainerTarget.classList.add("text-day"); // Change color for day
      document.querySelector(".celestial-body").classList.add("sun");
    } else if (cycleCode === 0) {
      this.cycleContainerTarget.classList.remove("text-day");
      backgroundColor = `linear-gradient(to bottom, #001F3F 20%, #0d2d4f 50%, #123d6b 100%)` // NIGHT CLEAR
      this.cycleContainerTarget.classList.add("text-night"); // Change color for night
      document.querySelector(".celestial-body").classList.add("moon");
    }

    document.body.style.backgroundImage = backgroundColor;
  }

  weatherCode(weatherCode, cycleCode) {
    let cloud
    let density
    let overlay
    let precipitation
    
    switch (weatherCode) {
      case 0: // Clear Sky
        cloud = 0
        break;
      case 1: // Mainly clear
        cloud = 1
        break;
      case 2: // Partly cloudy
        cloud = 3
        break;
      case 3: // Overcast
        cloud = 7
        break;
      case 45: // Fog
        overlay = `linear-gradient(to bottom, rgba(44, 62, 80, 0.3), rgba(70, 92, 116, 0.1) 50%, rgba(187, 194, 201, 0) 100%)`
        cloud = 4
        this.insertFog();
        break;
      case 48: // Depositing rime fog
        overlay = `linear-gradient(to bottom, rgba(44, 62, 80, 0.3), rgba(70, 92, 116, 0.1) 50%, rgba(187, 194, 201, 0) 100%)`
        cloud = 4
        this.insertFog();
        this.createRime();
        break;
      case 51: // Drizzle: Light
        overlay = `linear-gradient(to bottom, rgba(44, 62, 80, 0.3), rgba(70, 92, 116, 0.1) 50%, rgba(187, 194, 201, 0) 100%)`
        cloud = 4
        precipitation = 3
        this.createDrizzle(precipitation);
        break;
      case 53: // Drizzle: Moderate
        overlay = `linear-gradient(to bottom, rgba(44, 62, 80, 0.5), rgba(70, 92, 116, 0.2) 50%, rgba(187, 194, 201, 0) 100%)`
        cloud = 5
        drizzle = 2
        this.createDrizzle(precipitation);
        break;
      case 55: // Drizzle: Dense intensity
        overlay = `linear-gradient(to bottom, rgba(44, 62, 80, 0.8), rgba(70, 92, 116, 0.5) 50%, rgba(187, 194, 201, 0) 100%)`
        cloud = 6
        precipitation = 1
        this.createDrizzle(precipitation);
        break;
      case 56: // Freezing Drizzle: Light
        overlay = `linear-gradient(to bottom, rgba(44, 62, 80, 0.3), rgba(70, 92, 116, 0.1) 50%, rgba(187, 194, 201, 0) 100%)`
        cloud = 4
        density = "slight" // This time were just straight up using a class to insert via if statement idc anymore im so lazy
        this.freezingDrizzle(density, cycleCode);
        break;
      case 57: // Freezing Drizzle: Dense intensity
        overlay = `linear-gradient(to bottom, rgba(44, 62, 80, 0.8), rgba(70, 92, 116, 0.5) 50%, rgba(187, 194, 201, 0) 100%)`
        cloud = 6
        density = "dense"
        this.freezingDrizzle(density, cycleCode);
        break;
      case 61: // Rain: Slight
      case 66: // Freezing Rain: Light intensity (Placeholder)
        overlay = `linear-gradient(to bottom, rgba(44, 62, 80, 0.3), rgba(70, 92, 116, 0.1) 50%, rgba(187, 194, 201, 0) 100%)`
        cloud = 4
        precipitation = 3
        this.createRain(precipitation);
        break;
      case 63: // Rain: Moderate
        overlay = `linear-gradient(to bottom, rgba(44, 62, 80, 0.5), rgba(70, 92, 116, 0.2) 50%, rgba(187, 194, 201, 0) 100%)`
        cloud = 6
        precipitation = 2
        this.createRain(precipitation);
        break;
      case 65: // Rain: Heavy intensity
      case 67: // Freezing Rain: Heavy intensity (Placeholder)
        overlay = `linear-gradient(to bottom, rgba(44, 62, 80, 0.8), rgba(70, 92, 116, 0.5) 50%, rgba(187, 194, 201, 0) 100%)`
        cloud = 8
        precipitation = 1
        this.createRain(precipitation);
        break;
      case 71: // Snow fall: Slight
      case 77: // Snow Grain (Placeholder)
        overlay = `linear-gradient(to bottom, rgba(44, 62, 80, 0.3), rgba(70, 92, 116, 0.1) 50%, rgba(187, 194, 201, 0) 100%)`
        cloud = 4
        precipitation = 3
        this.createSnow(precipitation);
        break;
      case 73: // Snow fall: Moderate
        overlay = `linear-gradient(to bottom, rgba(44, 62, 80, 0.5), rgba(70, 92, 116, 0.2) 50%, rgba(187, 194, 201, 0) 100%)`
        cloud = 6
        precipitation = 2
        this.createSnow(precipitation);
        break;
      case 75: // Snow fall: Heavy intensity
        overlay = `linear-gradient(to bottom, rgba(44, 62, 80, 0.8), rgba(70, 92, 116, 0.5) 50%, rgba(187, 194, 201, 0) 100%)`
        cloud = 8
        precipitation = 1
        this.createSnow(precipitation);
        break;
      case 80: // Rain showers: Slight
        overlay = `linear-gradient(to bottom, rgba(44, 62, 80, 0.3), rgba(70, 92, 116, 0.1) 50%, rgba(187, 194, 201, 0) 100%)`
        cloud = 4
        precipitation = 3
        this.createRainBurst(precipitation);
        break;
      case 81: // Rain showers: Moderate
        overlay = `linear-gradient(to bottom, rgba(44, 62, 80, 0.5), rgba(70, 92, 116, 0.2) 50%, rgba(187, 194, 201, 0) 100%)`
        cloud = 6
        precipitation = 2
        this.createRainBurst(precipitation);
        break;
      case 82: // Rain showers: Violent
        overlay = `linear-gradient(to bottom, rgba(44, 62, 80, 0.8), rgba(70, 92, 116, 0.5) 50%, rgba(187, 194, 201, 0) 100%)`
        cloud = 8
        precipitation = 1
        this.createRainBurst(precipitation);
        break;
      case 85: // Snow showers: Slight
        overlay = `linear-gradient(to bottom, rgba(44, 62, 80, 0.3), rgba(70, 92, 116, 0.1) 50%, rgba(187, 194, 201, 0) 100%)`
        cloud = 4
        precipitation = 3
        this.createSnowBurst(precipitation);
        break;
      case 86: // Snow showers: Heavy
        overlay = `linear-gradient(to bottom, rgba(44, 62, 80, 0.8), rgba(70, 92, 116, 0.5) 50%, rgba(187, 194, 201, 0) 100%)`
        cloud = 6
        precipitation = 2
        this.createSnowBurst(precipitation);
        break;
      case 95: // Thunderstorm: Slight to moderate
        overlay = `linear-gradient(to bottom, rgba(44, 62, 80, 0.5), rgba(70, 92, 116, 0.2) 50%, rgba(187, 194, 201, 0) 100%)`
        cloud = 6
        this.startLightning();
        break;
      case 96: // Thunderstorm with slight hail
        overlay = `linear-gradient(to bottom, rgba(44, 62, 80, 0.3), rgba(70, 92, 116, 0.1) 50%, rgba(187, 194, 201, 0) 100%)`
        cloud = 6
        precipitation = 3
        this.createHail(precipitation);
        this.startLightning();
        break;
      case 99: // Thunderstorm with heavy hail
        overlay = `linear-gradient(to bottom, rgba(44, 62, 80, 0.8), rgba(70, 92, 116, 0.5) 50%, rgba(187, 194, 201, 0) 100%)`
        cloud = 6
        precipitation = 1
        this.createHail(precipitation);
        this.startLightning();
        break;
      default:
        // end of the f-in world
        break;
    }
    this.spawnSVGs(cloud);
    document.querySelector(".bg-overlay").style.backgroundImage  = overlay;
  }

  spawnSVGs(cloud) {
    const svgCount = Math.random() * (cloud * 2); // Number of SVGs to spawn
    for (let i = 0; i < svgCount; i++) {
      const svgElement = this.createSVGElement(i);
      const speed = Math.random() * 4 + 3; // 3 to 7 speed. lets scale this with windspeed later.
      const top = this.randomPosition("height"); // Get random top position
      const left = this.randomPosition("width");  // Get random left position

      svgElement.style.top = `${top}px`;
      svgElement.style.left = `${left}px`;
      svgElement.style.animationDuration = `${speed}s`;

      this.cloudContainerTarget.appendChild(svgElement);
    }
  }

  createSVGElement(index) {
    const svgWrapper = document.createElement("div");
    svgWrapper.classList.add("absolute", "animate-move");

    const svgOptions = [
      `<svg width="300" height="300" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M51.8038 58.2347C52.2128 58.2547 52.1121 58.2882 52.5 58.2996C52.1322 58.2306 52.227 58.1969 51.8038 58.2347ZM51.8038 58.2347C40.2615 57.6709 20.8643 53.4833 25.5 33.7815C30.3 13.3815 48.5 10.9482 57 12.2815C61.6083 13.1044 70.3771 17.6654 69.0551 29.3346M51.8038 58.2347C49.1586 58.4712 45.8103 60.7988 46.5 65.2815C46.8333 66.1149 48 67.7815 50 67.7815L3.5 73.7815L59 71.7815L52 73.7815H118L98 71.7815C103.833 70.9482 118.5 66.0815 114.5 57.2815C110.5 48.4815 97.5 51.2815 93.5 53.2815C100.5 47.5 96.8333 42.3544 90.5 42C101.5 31 96.5 17 84 17.982C77.5 17.982 69.7515 25.571 69.0551 29.3346M69.0551 29.3346C69.0384 29.4824 69.0752 29.1845 69.0551 29.3346ZM69.0551 29.3346C69.062 29.198 69.0254 29.4954 69.0551 29.3346Z" fill="#D9D9D9" stroke="black"/>
      </svg>`,
      `<svg width="300" height="300" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M73.0909 43.5079C78.3939 29.5412 70.5818 10.9935 47.4545 17.2505C24.9435 23.3409 25.0672 51.9792 39.1739 57.1073C34.4182 56.1138 28.7919 60.2358 33.8181 66.4133L0 69.2067L62.1818 69.7653L43.6364 72H109.091L93.2727 69.7653L120 69.2067L97.6364 67.5307C112.5 67 102.5 35 80.1818 52.4466C90.1818 44.0666 76.0606 35.6866 73.0909 43.5079Z" fill="#D9D9D9"/>
        <path d="M73.0909 43.5079C78.3939 29.5412 70.5818 10.9935 47.4545 17.2505C24.3273 23.5076 25.0909 53.5639 40.3636 57.4746C35.4545 55.4262 28.3636 59.7093 33.8181 66.4133L0 69.2067L62.1818 69.7653L43.6364 72H109.091L93.2727 69.7653L120 69.2067L97.6364 67.5307C112.5 67 102.5 35 80.1818 52.4466C90.1818 44.0666 76.0606 35.6866 73.0909 43.5079Z" stroke="black"/>
      </svg>`,
      `<svg width="300" height="300" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M117 69H2L37.1699 65.639C33.6445 65.639 34.6626 59.2563 41.4537 61.7088C32.2897 55.8194 37.1084 37.08 50.568 44.3524C45.9159 40.6179 54.9322 32.3455 60.6165 32.0286C70.5627 31.4741 71.7579 39.0847 67.9916 45.7585C73.1547 36.9347 89.6885 32.6834 95.2282 44.9126C102.625 61.2416 77.9223 65.0788 69.5485 65.639L117 69Z" fill="#D9D9D9"/>
        <path d="M2 69H117L69.5485 65.639C77.9223 65.0788 102.625 61.2416 95.2282 44.9126C89.6456 32.5888 72.8981 37.0015 67.8738 45.9642C71.7816 39.2421 70.6651 31.4684 60.6165 32.0286C54.9322 32.3455 45.9159 40.6179 50.568 44.3524C36.0534 36.51 31.5874 58.9169 43.8689 62.8381C34.9369 57.7966 33.2621 65.639 37.1699 65.639L2 69Z" stroke="black"/>
      </svg>`]
    const randomSVG = svgOptions[Math.floor(Math.random() * svgOptions.length)];
    svgWrapper.innerHTML = randomSVG;
    return svgWrapper;
  }

  randomPosition(dimension) {
    const svgSize = 300;
    if (dimension === "height") {
      const maxHeight = window.innerHeight;
      return Math.random() * (maxHeight / 2 + (maxHeight / 3 + 0.25) - svgSize);
    } else if (dimension === "width") {
      const maxWidth = window.innerWidth;
      return Math.random() * (maxWidth - svgSize);
    }
  }

  createRain(rain) {
    let counter = 200 / rain;
    for (let i = 0; i < counter; i++) {
      let hrElement = document.createElement("HR");
      let rainWidth = Math.random() * (40 / rain) + (60 / rain);
      let rotationAngle = 120 - (10 * rain);

      hrElement.style.left = Math.floor(Math.random() * window.innerWidth) + "px";
      hrElement.style.animationDuration = (0.2 * (rain / 2)) + Math.random() * ( 0.3 * (rain / 2)) + "s";
      hrElement.style.animationDelay = Math.random() * 5 + "s";
      hrElement.style.width = `${rainWidth}px`;
      hrElement.style.borderRightWidth = `${rainWidth}px`;
      hrElement.style.setProperty('--rotation-angle', `${rotationAngle}deg`);

      this.element.querySelector('.precipitation-container').appendChild(hrElement);
    }
  }

  createDrizzle(drizzle) {
    let counter = 300 / drizzle;
    for (let i = 0; i < counter; i++) {
      let hrElement = document.createElement("HR");
      let rainWidth = Math.random() * 5 + 10;
      let rotationAngle = 90;

      hrElement.style.left = Math.floor(Math.random() * window.innerWidth) + "px";
      hrElement.style.animationDuration = (0.2 * (drizzle / 2)) + Math.random() * ( 0.3 * drizzle ) / 2 + "s";
      hrElement.style.animationDelay = Math.random() * 5 + "s";

      hrElement.style.width = `${rainWidth}px`;
      hrElement.style.borderRightWidth = `${rainWidth}px`;
      hrElement.style.setProperty('--rotation-angle', `${rotationAngle}deg`);

      this.element.querySelector('.precipitation-container').appendChild(hrElement);
    }
  }

  createRainBurst(rain) {
    const burstDuration = 8000; // THIS IS THE TIME OF THE RAINSHOWER
    const burstInterval = 10000; // THIS IS THE TIME OF THE WHOLE CYCLE. SO MEANIING 10-8 = 2SEC OF PAUSE
    const startRain = () => { this.createRain(rain); };
    const container = document.querySelector('.precipitation-container');
    const stopRain = () => { this.clearRain(container); };
    startRain();
    setTimeout(stopRain, burstDuration);

    setInterval(() => {
      startRain();
      setTimeout(stopRain, burstDuration); 
    }, burstInterval);
  }

  clearRain(container) {
    const rainContainer = container;
    if (rainContainer) {
      while (rainContainer.firstChild) {
        rainContainer.removeChild(rainContainer.firstChild);
      }
    }
  }

  // I will Improve the branching logic once everything is done.
  generateBranch(startX, startY, endY, maxWidth, branchProbability = 0.3) {
    let path = `M${startX},${startY} `;
    let x = startX;
    let y = startY;
    
    while (y < endY) {
        const nextY = Math.min(y + Math.random() * (endY - y) / 3 + 10, endY);
        const nextX = x + (Math.random() - 0.5) * maxWidth;
        path += `L${nextX},${nextY} `;

        // Possible branching
        if (Math.random() < branchProbability && y < endY - 100) {
            const branchEndY = y + (endY - y) * (0.3 + Math.random() * 0.4);
            path += this.generateBranch(nextX, nextY, branchEndY, maxWidth / 2, branchProbability / 2);
            path += `M${nextX},${nextY} `; // Move back to continue the main branch
        }

        x = nextX;
        y = nextY;
    }
    
    return path;
  }

  createLightning() {
    const svg = document.querySelector('.lightning');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.classList.add('bolt');

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    svg.setAttribute('viewBox', `0 0 ${viewportWidth} ${viewportHeight}`);

    const startX = viewportWidth / 2;
    const mainBranch = this.generateBranch(startX, 0, viewportHeight, viewportWidth / 3);

    path.setAttribute('d', mainBranch);
    svg.innerHTML = '';
    svg.appendChild(path);
    
  }

  animateLightning(){
    this.createLightning();
    const bolt = document.querySelector('.bolt');
    const bgOverlay = document.querySelector('.bg-overlay');

    bolt.style.animation = 'none';
    bolt.offsetHeight;
    bolt.style.animation = null;

    bgOverlay.style.animation = 'bgflash 0.5s ease-out';
    setTimeout(() => {
      bgOverlay.style.animation = 'none';
    }, 500);
  }

  startLightning(){
    const animateLightning = () => { this.animateLightning() }
    window.addEventListener('resize', animateLightning);
    setInterval(animateLightning, 3000);
    this.animateLightning();
  }

  insertFog() {
    const fogContainer = this.element.querySelector('.fog-container');
    fogContainer.innerHTML = `<div class="fog-1"></div>
        <div class="fog-2"></div>`
  }

  createRime(){
    const scene = this.element.querySelector('.precipitation-container');
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'frost-particle';
    
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 4 + 's';
      
      scene.appendChild(particle);
    }
  }

  createSnow(snow) {
    let counter = 200 / snow;
    for (let i = 0; i < counter; i++) {
      let particle = document.createElement('div');
      let rotationAngle = (3 - snow) * 15;
      let size = Math.random() * (7 + (snow * -1));
      let opacity = ((3 - snow) * 0.30) + 0.4
      particle.className = 'snow-particle';

      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (0.5 * (snow / 2)) + Math.random() * ( 0.6 * (snow / 2)) + "s";
      particle.style.animationDelay = Math.random() * 5 + "s";
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.opacity = opacity;
      particle.style.setProperty('--rotation-angle', `${rotationAngle}deg`);

      this.element.querySelector('.precipitation-container').appendChild(particle);
    }
  }

  createSnowBurst(snow) {
    const burstDuration = 8000;
    const burstInterval = 10000;
    const startSnow = () => { this.createSnow(snow); };
    const container = document.querySelector('.precipitation-container');
    const stopSnow = () => { this.clearRain(container); };
    startSnow();
    setTimeout(stopSnow, burstDuration);

    setInterval(() => {
      startSnow();
      setTimeout(stopSnow, burstDuration); 
    }, burstInterval);
  }

  freezingDrizzle(density, cycleCode){
    const drizzleContainer = document.querySelector(".precipitation-container");

    function createDrizzle() {
      const drizzleDrop = document.createElement("div");
      drizzleDrop.classList.add("drizzle-drop", density);

      drizzleDrop.style.backgroundColor = cycleCode != 1 ? `rgba(200, 200, 255, 0.6)` : `rgba(150, 150, 255, 0.8)`
      drizzleDrop.style.left = `${Math.random() * 100}vw`;
      drizzleDrop.style.animationDuration = `${2 + Math.random() * 2}s`;
      drizzleDrop.style.animationName = "fall, shimmer";
      drizzleDrop.style.setProperty('--rotation-angle', `0deg`);
      drizzleContainer.appendChild(drizzleDrop);
      drizzleDrop.addEventListener("animationend", () => drizzleDrop.remove());
    }
  
    setInterval(createDrizzle, 100);
  }

  createHail(hail){
    let counter = 100 / hail;
    for (let i = 0; i < counter; i++) {
      let particle = document.createElement('div');
      let size = 5 + Math.random() * (7 + (hail * -1));
      let opacity = ((3 - hail) * 0.30) + 0.4
      particle.className = 'hail-particle';

      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (0.5 * (hail / 2)) + Math.random() * ( 0.6 * (hail / 2)) + "s";
      particle.style.animationDelay = Math.random() * 5 + "s";
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.opacity = opacity;
      particle.style.setProperty('--rotation-angle', `0deg`);

      this.element.querySelector('.precipitation-container').appendChild(particle);
    }
  }
}

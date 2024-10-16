import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="scroll"
export default class extends Controller {
  connect() {
    this.scrollContainer = document.getElementById('forecastScrollContainer');
    let isDown = false;
    let startX;
    let scrollLeft;

    this.scrollContainer.addEventListener('mousedown', (e) => {
      isDown = true;
      this.scrollContainer.classList.add('scrolling-active');
      startX = e.pageX - this.scrollContainer.offsetLeft;
      scrollLeft = this.scrollContainer.scrollLeft;
      document.body.style.userSelect = 'none';
    });

    this.scrollContainer.addEventListener('mouseleave', () => {
      isDown = false;
      this.scrollContainer.classList.remove('scrolling-active');
    });

    this.scrollContainer.addEventListener('mouseup', () => {
      isDown = false;
      this.scrollContainer.classList.remove('scrolling-active');
    });

    this.scrollContainer.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - this.scrollContainer.offsetLeft;
      const walk = (x - startX) * 2;
      this.scrollContainer.scrollLeft = scrollLeft - walk;
    });

    const scrollAmount = 200;

    document.getElementById('scrollLeft').addEventListener('click', () => {
      this.scrollContainer.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    });

    document.getElementById('scrollRight').addEventListener('click', () => {
      this.scrollContainer.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    });

    this.scrollToCurrentHour();
  }

  scrollToCurrentHour() {
    const currentHour = new Date().getHours();
    const cards = this.scrollContainer.querySelectorAll('.weather-card');

    cards.forEach(card => {
      const cardHour = parseInt(card.dataset.hour, 10);
      if (cardHour === currentHour) {
        card.scrollIntoView({ behavior: 'smooth', inline: 'center' });
      }
    });
  }
}

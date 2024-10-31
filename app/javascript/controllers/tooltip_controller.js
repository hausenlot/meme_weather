import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
    static targets = ["tooltip"];

    async connect() {
        await this.fetchReadmeContent();
        console.log('tooltip connected');
    }

    async fetchReadmeContent() {
        try {
            const response = await fetch('https://raw.githubusercontent.com/hausenlot/meme_weather/main/README.md');
            if (!response.ok) {
                console.log('response was not okay');
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const text = await response.text();
            const tooltipText = this.extractRelevantContent(text);
            this.tooltipTarget.innerHTML = tooltipText;
        } catch (error) {
            console.error('Error fetching README:', error);
            this.tooltipTarget.textContent = 'Error loading content';
        }
    }

    extractRelevantContent(text) {
      const notesMatch = text.match(/## Notes([\s\S]*?)(?=\n##|$)/);
      const problemsMatch = text.match(/## Problems([\s\S]*?)(?=\n##|$)/);
  
      let tooltipContent = "<strong>No updates available.</strong>";
  
      if (notesMatch) {
          tooltipContent = "<strong>Notes:</strong><br>" + notesMatch[1].trim().replace(/\n/g, "<br>");
      }
      
      if (problemsMatch) {
          tooltipContent += "<br><strong>Issues:</strong><br>" + problemsMatch[1].trim().replace(/\n/g, "<br>");
      }
  
      return tooltipContent;
  }
}

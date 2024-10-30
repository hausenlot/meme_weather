module.exports = {
  content: [
    './app/views/**/*.html.erb',
    './app/helpers/**/*.rb',
    './app/assets/stylesheets/**/*.css',
    './app/javascript/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        night: '#001F3F', // Example night color, adjust as necessary
        day: '#87CEEB', // Example evening color
      },
    },
  }
}

## Notes
This WebApp is Hosted in fly.io.
- Using Open Meteo REST API
- Made from Rails 7, JavaScript and Tailwind.
- Soo many things to improve.

## Problems
- The nominatim API is free tier, It supposed to be 1 request per minute. So its mostly broken.
- Coordinate and form submission (JS version) for every new visit.
- Bottom Overlay Container looks basic.
- Weather cards information is not appealing (Hourly and Weekly).
- Toggle button for Forecast doesnt look like a button.
- Weather code 66, 67 and 77 doesnt have unique function.
- The API request for current weather, hourly and weekly doesnt have a rescue.
- Lightning Function needs an overhaul.
- Hail function needs an overhaul.
- Rime (Depositing Rime fog) needs an overhaul.
- Drizzle (Freezing) needs an overhaul.
- Clouds speed should scale with the wind speed.
- The overall Overlay for Precipation should scale base on the % of precipitation.
- Add a default weather (kinda 2012 yknow lol)
- Add more assets depending on Day/Night Cycle and Weather Code.
- Make the celestial body move in an orbit. (Position will be based on Sunset/Sunrise Timezone)

## Done
- API consume Test Deploy
- API consume for different function at the same time
- Make the Website respond via BG color base on API Weather code response
- Added Map (leaflet)
- Added feature to relocate pin, Either drag or click
- Added a way to pass coordinate to controller then to the API
- Added toggle for map
- Fixed bug regards of toggle button deleting everything via innerHTML
- Added Screaming Cowboy
- Added unmute
- Added Overlay for other forecast
- Added Weather Card partial
- Added Hourly forescast
- Added Drag or click for scrolling
- Fixed a bug when the whole canvas scrolls
- Added Weekly forecast
- Added Toggle between the two
- Fixed bug when Toggling with two forecast it forgots the current coordinate
- Added SVG for hill, sea and cloud.
- Made the cloud move
- Added Stimulus for weather code hub
- Added Background for day/night cycle
- Added Different Particle system for weather code eg. rain, snow, hail, etc
- Added Celestial body
- Added Overlay for darker sky
- Configured for Deployment for Fly
- Added Tooltip that fetches this readme's notes and issues.

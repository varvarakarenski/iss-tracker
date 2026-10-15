# ISS Tracker 

Keep track of where the International Space Station is, along with information about it's past and predicted trajectory and crew members onboard.

## Features
- **Real-time ISS Tracking:** Updates the ISS position every 2 seconds on an interactive Leaflet map, powered by the "[Where the ISS at?](https://api.wheretheiss.at/)" API
- **Trajectories:** Shows the ISS's last orbit and predicted next orbit
- **Live Stats:** Latitude, longitude, altitude, and velocity
- **Current Crew:** Cards for each astronaut currently aboard the ISS, with photo, name, country, and role (their photos link to their Wikipedia pages)
- **Fun Facts:** A few things you might not know about the ISS

## How it Works

This page fetches everything directly from the browser using these APIs:

1. **Where the ISS at? API** (`https://api.wheretheiss.at/`)
    - `/v1/satellites/25544` - Current ISS position, altitude, and velocity
    - `/v1/satellites/25544/positions?timestamps=...` - past and future ISS positions, used to draw the trajectory 
2. **People in Space API** (`https://corquaid.github.io/international-space-station-APIs/`)
    - `/JSON/people-in-space.json` - Crew aboard and their details

The map uses [Leaflet](https://leafletjs.com/) with [OpenStreetMap](https://www.openstreetmap.org/) tiles. 

## Original Turtle Version

`main.py` is the original version of this project, built with Python's `turtle` graphics and the [Open-Notify API](http://open-notify.org/). It writes the current astronauts to a local file `iss.txt` and continuously draws the ISS moving across a world map.

## Acknowledgments

- ISS position data from [Where the ISS at?](https://wheretheiss.at/)
- Crew data from [corquaid's ISS APIs](https://github.com/corquaid/international-space-station-APIs)
- Original turtle version data from [Open-Notify](http://open-notify.org/)
- Inspired by tutorial by BekBrace: [YouTube](https://youtu.be/5UWeOfdESZE?si=u3H_jDMhvCx6hmjv)

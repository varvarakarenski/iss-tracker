# ISS Tracker 

A real-time International Space Station (ISS) tracker that displays its current location on an interactive world map, along with its past and predicted path. 

## Features
- **Real-time ISS Tracking:** Updates the ISS position every 2 seconds on an interactive Leaflet map
- **Future and Past Trajectory:** Shows where the ISS has been over the last 90 minutes (dashed gray line) and where it's headed over the next 90 minutes (orange line), with a key in the corner of the map
- **Live Stats:** Latitude, longitude, altitude, and velocity
- **Current Crew:** Cards for each astronaut currently aboard the ISS, with photo, name, country, and role (photos link to their Wikipedia pages)
- **Fun Facts:** A few things you might not know about the ISS

## Running Locally

The site is a single static page, so you can just open `index.html` in a browser. 

To serve it with Flask instead:

1. Clone the repository
```bash
git clone https://github.com/varvarakarenski/iss-tracker.git
cd iss-tracker
```

2. Create a virtual environment (optional but recommended):
```bash
python -m venv venv
source venv/bin/activate 
# On Windows: venv\Scripts\activate
```

3. Install dependencies and run:
```bash
pip install flask geocoder
python app.py
```

Then open http://localhost:5001.

## How it Works

The page fetches everything directly from the browser using these APIs:

1. **Where the ISS at? API** (`https://api.wheretheiss.at/`)
    - `/v1/satellites/25544` - Current ISS position, altitude, and velocity
    - `/v1/satellites/25544/positions?timestamps=...` - ISS positions at past/future times, used to draw the trajectory (max 10 timestamps per request)
2. **People in Space API** (`https://corquaid.github.io/international-space-station-APIs/`)
    - `/JSON/people-in-space.json` - Current crew and their details

The map uses [Leaflet](https://leafletjs.com/) with [OpenStreetMap](https://www.openstreetmap.org/) tiles. 

## Project Structure

```
iss-tracker/
├── index.html           # Web app page (served by GitHub Pages)
├── app.py               # Flask server for running the web app locally
├── main.py              # Original turtle-graphics tracker
├── static/
│   ├── css/
│   │   ├── style.css    # Page styling
│   │   └── script.js    # Map, live ISS position, trajectory, crew cards
│   └── img/
│       ├── iss.gif      # ISS sprite/icon
│       └── map.gif      # World map background (turtle version)
├── README.md            # This file
└── .gitignore           # Git ignore patterns
```

## Original Turtle Version

`main.py` is the original version of this project, built with Python's `turtle` graphics and the [Open-Notify API](http://open-notify.org/). It writes the current astronauts to `iss.txt` and draws the ISS moving across a world map. To run it:

```bash
pip install geocoder
python main.py
```

Press `Ctrl+C` to stop it.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- ISS position data from [Where the ISS at?](https://wheretheiss.at/)
- Crew data from [corquaid's ISS APIs](https://github.com/corquaid/international-space-station-APIs)
- Original turtle version data from [Open-Notify](http://open-notify.org/)
- Inspired by tutorial by BekBrace: [YouTube](https://youtu.be/5UWeOfdESZE?si=u3H_jDMhvCx6hmjv)

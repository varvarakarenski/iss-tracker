# ISS Tracker 

A real-time International Space Station (ISS) tracker that displays its current location on a world map. 

## Features
- Real-time ISS Tracking: Updates the ISS position every second from the Open-Notify API
- World Map visualization: Uses Python's 'turtle' graphics to display the ISS location on a world map
- Astronaut Information: Shows the current number of astronauts on the ISS and lists their names
- Live Updates: Continuously fetches and updates ISS coordinates to track movement across the globe

## Requirements 

- Python 3.x
- 'turtle' - Built-in Python graphics library

## Installation

1. Clone the repository
```bash
git clone
https https://github.com/varvarakarenski iss-tracker.git
cd iss-tracker
```

2. Create a virtual environment (optional but recommended):
```bash
python -m venv venv
source venv/bin/activate 
# On Windows: venv/Scripts/activate
```

## Usage
Run the tracker: 
```bash
python main.py
```

The program will:
1. Fetch current ISS astronaut data and save it to iss.txt
2. Open the 'iss.txt' file in your default text editor
3. Display an interactive world map with the ISS's current position
4. Update the ISS location every second in real-time

## How it Works

The tracker uses one API:

1. **Open-Notify API** ('http://api.open-notify.org/')
    - '/astros.json' - Gets current astronauts on the ISS
    - '/iss-now.json' - Gets real time ISS coordinates

## Project Structure

```
iss-tracker/
├── main.py          # Main tracking script
├── map.gif          # World map background image
├── iss.gif          # ISS sprite/icon
├── README.md        # This file
└── .gitignore       # Git ignore patterns
```

## Output

The program displays:
    - Console Output: Real-time latitude and longitude updates
    - iss.txt File: Text file with astronaut names
    - Map Display: Visual representation of ISS position on a world map

## Notes

    - Internet connection is required for API calls
    - The program runs indefinitely and updates every second
    - Press `Ctrl+C` to stop the tracker
    - Ensure the `map.gif` and `iss.gif` files are in the same directory as `main.py`

## License

This project is open source and available under the MIT License.

## Acknowledgments

    - Data provided by [Open-Notify](http://open-notify.org/)
    - Inspired by tutorial by BekBrace: [YouTube](https://youtu.be/5UWeOfdESZE?si=u3H_jDMhvCx6hmjv)

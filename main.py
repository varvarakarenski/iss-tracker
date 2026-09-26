import json
import turtle 
import urllib.request 
import time 
import webbrowser 

url = "http://api.open-notify.org/astros.json"
response = urllib.request.urlopen(url)
result = json.loads(response.read())
file = open("iss.txt", "w")
file.write("There are currently" +
           str(result["number"]) + " astronauts on the ISS: \n\n")
people = result["people"]
for p in people:
    file.write(p['name']+ " - on board" + "\n")
# print longitude and latitude
file.close()
webbrowser.open("iss.txt")

# Set up world map in turtle
screen = turtle.Screen()
screen.setup(1280, 720)
screen.setworldcoordinates(-180, -90, 180, 90)

# Load world map image
screen.bgpic("map.gif")
screen.register_shape("iss.gif")
iss = turtle.Turtle()
iss.shape("iss.gif")
iss.setheading(45)
iss.penup()

while True: 
    # Load current status of ISS in real time
    url = "http://api.open-notify.org/iss-now.json"
    response = urllib.request.urlopen(url)
    result = json.loads(response.read())

    # Extract ISS Location
    location = result["iss_position"]
    lat = location['latitude']
    lon = location['longitude']

    # Output to terminal
    lat = float(lat)
    lon = float(lon)
    print("\nLatitude: " + str(lat))
    print("\nLongitude: " + str(lon))

    # Update ISS location on the map
    iss.goto(lon, lat)

    # Refresh
    time.sleep(1)
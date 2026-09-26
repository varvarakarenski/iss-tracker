from flask import Flask, render_template, jsonify
import json, urllib.request, geocoder

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/iss')
def get_iss():
    url = "http://api.open-notify.org/iss-now.json"
    response = urllib.request.urlopen(url)
    result = json.loads(response.read())
    return jsonify({
        'lat': float(result["iss_position"]['latitude']),
        'lon': float(result["iss_position"]['longitude'])
    })

@app.route('/api/user-location')
def get_user_location():
    g = geocoder.ip('me')
    lat, long - g.latlng
    return jsonify({'lat' : lat, 'lon' : lon})

if __name__ == '__main__':
    app.run(debug=True)
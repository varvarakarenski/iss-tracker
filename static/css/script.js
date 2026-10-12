//star background code

const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const STARS_COUNT = 150;
const stars = [];

for (let i = 0; i < STARS_COUNT; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random(),
        twinkleSpeed: Math.random() * 0.02 + 0.005
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < STARS_COUNT; i++) {
        let star = stars[i];

        star.alpha += star.twinkleSpeed;

        if(star.alpha <= 0 || star.alpha >= 1) {
            star.twinkleSpeed = -star.twinkleSpeed;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, star.alpha)})`;
        ctx.fill();
    }
    
    requestAnimationFrame(animate);
}

animate();

//map code

async function tracker() {
    const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
    const data = await response.json();

    document.getElementById('vel').textContent = data.velocity.toFixed(3);
    document.getElementById('alt').textContent = data.altitude.toFixed(3);

    document.getElementById('lat').textContent = data.latitude.toFixed(3);
    document.getElementById('lon').textContent = data.longitude.toFixed(3);
    issMarker.setLatLng([data.latitude, data.longitude]);
}

const map = L.map('map', { zoomSnap: 0.1 }).fitWorld();

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

var issIcon = L.icon( {
    iconUrl: 'static/img/iss.gif',
    iconSize: [20, 20],
    iconAnchor:  [10, 10],
});

const issMarker = L.marker([0, 0], {icon: issIcon}).addTo(map);

const pastLine = L.polyline([], {color: 'gray', dashArray: '4 6'}).addTo(map);
const futureLine = L.polyline([], {color: 'orange'}).addTo(map);

const legend = L.control({position: 'bottomleft'});
legend.onAdd = () => {
    const div = L.DomUtil.create('div', 'legend');
    div.innerHTML = `
        <div><svg width="30" height="6"><line x1="0" y1="3" x2="30" y2="3" stroke="orange" stroke-width="3"/></svg>Future</div>
        <div><svg width="30" height="6"><line x1="0" y1="3" x2="30" y2="3" stroke="gray" stroke-width="3" stroke-dasharray="4 6"/></svg> Past</div>
    `;
    return div;
};
legend.addTo(map);

async function getPositions(timestamps) {
    const points = [];
    for (let i = 0; i < timestamps.length; i += 10) { //10 timestamps per request
        const batch = timestamps.slice(i, i + 10).join(',');
        const response = await fetch(`https://api.wheretheiss.at/v1/satellites/25544/positions?timestamps=${batch}`);
        const data = await response.json();
        points.push(...data.map(p => [p.latitude, p.longitude]));
    }
    return points;
}

function splitAtDateLine(points) {
    const segments = [[]];
    for (let i = 0; i < points.length; i++) {
        if (i > 0 && Math.abs(points[i][1] - points[i-1][1]) > 180) {
            const [lat1, lon1] = points[i-1];
            const [lat2, lon2] = points[i];
            const edge = lon1 > 0 ? 180: -180;
            const lon2Unwrapped = lon2 + 2 * edge;
            const lat = lat1 + (lat2 - lat1) * (edge - lon1) / (lon2Unwrapped - lon1);
            segments[segments.length -1].push([lat, edge]);
            segments.push([[lat, -edge]]);
        }
        segments[segments.length - 1].push(points[i]);
    }
    return segments;
}

let zoomedToPath = false;

async function drawPath() {
    const now = Math.floor(Date.now() / 1000);
    const times = [];
    for (let min = -90; min <= 90; min += 3) times.push(now + min * 60); 

    const points = await getPositions(times);
    const nowIndex = 30;
    pastLine.setLatLngs(splitAtDateLine(points.slice(0, nowIndex +1)));
    futureLine.setLatLngs(splitAtDateLine(points.slice(nowIndex)));

    if(!zoomedToPath) {
        map.fitBounds(pastLine.getBounds().extend(futureLine.getBounds()));
        zoomedToPath = true;
    }
}

drawPath();
setInterval(drawPath, 5*60 * 1000);

setInterval(tracker, 2000);
tracker();

async function loadCrew() {
    const response = await fetch('https://corquaid.github.io/international-space-station-APIs/JSON/people-in-space.json');
    const data = await response.json();

    const crew = data.people.filter(p => p.iss);

    for (const person of crew) {
        const card = document.createElement('div');
        card.className = 'astronaut';
        card.innerHTML = `
            <a href = "${person.url}"><img src="${person.image}" alt="${person.url}"></a>
            <p><strong>${person.name}</strong></p>
            <p>${person.country}</p>
            <p>${person.position}</p>
        `;
        document.getElementById('crew').appendChild(card);
    }
}

loadCrew();

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

    document.getElementById('vel').textContent = data.velocity.toFixed(1);
    document.getElementById('alt').textContent = data.altitude.toFixed(1);

    document.getElementById('lat').textContent = data.latitude;
    document.getElementById('lon').textContent = data.longitude;
    issMarker.setLatLng([data.latitude, data.longitude]);
}

const map = L.map('map').setView([0, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

var issIcon = L.icon( {
    iconUrl: 'static/img/iss.gif',
    iconSize: [20, 20],
    iconAnchor:  [10, 10],
});

const issMarker = L.marker([0, 0], {icon: issIcon}).addTo(map);

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

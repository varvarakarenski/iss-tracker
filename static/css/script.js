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
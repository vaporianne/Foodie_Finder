let canvas = document.getElementById("wheel");
let ctx = canvas.getContext("2d");

let options = ["Sushi", "Ethiopian", "Indian", "Thai", "Mexican", "Korean", "BBQ"];
let angle = 0;
let spinning = false;

function drawWheel() {
    let sliceAngle = (2 * Math.PI) / options.length;
    for (let i = 0; i < options.length; i++) {
        ctx.beginPath();
        ctx.moveTo(100, 100);
        ctx.arc(100, 100, 100, sliceAngle * i, sliceAngle * (i + 1));
        ctx.fillStyle = i % 2 == 0 ? "#ffcc00" : "#ff5733";
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "black";
        ctx.font = "12px Arial";
        ctx.fillText(options[i], 100 + Math.cos(sliceAngle * i) * 70, 100 + Math.sin(sliceAngle * i) * 70);
    }
}

document.getElementById("spin").addEventListener("click", () => {
    if (!spinning) {
        spinning = true;
        let spinTime = Math.random() * 3000 + 2000;
        let interval = setInterval(() => {
            angle += Math.PI / 20;
            canvas.style.transform = `rotate(${angle}rad)`;
        }, 50);

        setTimeout(() => {
            clearInterval(interval);
            spinning = false;
            let selected = Math.floor(Math.random() * options.length);
            alert(`Try: ${options[selected]}!`);
        }, spinTime);
    }
});

drawWheel();

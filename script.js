"use strict";
window.onload = function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const particlesArray = [];
  let i = 0;
  let clr = [
    "rgba(6, 182, 212, 0.5)",
    "rgba(99, 102, 241, 0.5)",
    "rgba(139, 92, 246, 0.5)",
    "rgba(236, 72, 153, 0.5)",
    "rgba(45, 212, 191, 0.5)",
  ];
  let sze = [16, 30, 20, 12, 56];

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  const touch = {
    x: null,
    y: null,
  };

  document.addEventListener("mousemove", function (e) {
    touch.x = e.x;
    touch.y = e.y;
  });
  class Particle {
    constructor() {
      this.x = Math.random() * window.innerWidth;
      this.y = Math.random() * window.innerHeight;
      //   this.size = Math.random() * 24 + 1;
      this.size = 1;
      //   this.size = sze[Math.trunc(Math.random() * sze.length + 1)];
      this.speedX = (Math.random() - 0.5) * 2.5;
      this.speedY = (Math.random() - 0.5) * 2.5;
      this.color = clr[Math.trunc(Math.random() * clr.length + 1)];
      this.move = true;
      this.point = false;
    }
    update() {
      if (this.move) {
        this.x += this.speedX;
        this.y += this.speedY;
        if (
          this.size + this.x >= window.innerWidth ||
          this.size + this.x <= 0
        ) {
          this.speedX = -this.speedX;
        }
        if (
          this.size + this.y >= window.innerHeight ||
          this.size + this.y <= 0
        ) {
          this.speedY = -this.speedY;
        }
      }
      if (this.point) {
        this.x = touch.x;
        this.y = touch.y;
        this.speedX = 0;
        this.speedY = 0;
      }
    }
    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  for (let i = 0; i < 360; i++) {
    particlesArray.push(new Particle());
  }
  function handleParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();

      for (let j = i + 1; j < particlesArray.length; j++) {
        const dx = particlesArray[i].x - particlesArray[j].x;
        const dy = particlesArray[i].y - particlesArray[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          ctx.beginPath();
          ctx.strokeStyle = particlesArray[i].color;
          ctx.lineWidth = 2;
          ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
          ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
          ctx.stroke();
          ctx.closePath();
        }
        //      if(distance <= particlesArray[i].size + particlesArray[j].size){
        //          let t1 = particlesArray[i].speedX;
        //          let t2 = particlesArray[i].speedY;
        //          particlesArray[i].speedY = particlesArray[j].speedY;
        //          particlesArray[i].speedX  = particlesArray[j].speedX;
        //          particlesArray[j].speedX = t1;
        //          particlesArray[j].speedY = t2;

        //      const overlap = (particlesArray[i].size + particlesArray[j].size) - distance;
        // const nx = dx / distance; // Normal X
        // const ny = dy / distance; // Normal Y

        // //console.log(nx, ny)

        // particlesArray[i].x += nx * overlap / 2;
        // particlesArray[i].y += ny * overlap / 2;
        // particlesArray[j].x -= nx * overlap / 2;
        // particlesArray[j].y -= ny * overlap / 2;
        //  }
      }
      const dx1 = touch.x - particlesArray[i].x;
      const dy1 = touch.y - particlesArray[i].y;
      const distance = Math.sqrt(dx1 * dx1 + dy1 * dy1);
      if (distance < 90) {
        const nx = dx1 / distance; // Normal X
        const ny = dy1 / distance; // Normal Y
        document.addEventListener("click", function () {
          particlesArray[i].point = false;
          particlesArray[i].move = true;
        });
        if (distance <= 5) {
          particlesArray[i].point = true;
          particlesArray[i].move = false;
          particlesArray[i].size = 12;
        } else {
          particlesArray[i].speedX += nx;
          particlesArray[i].speedY += ny;
        }
      }
    }
  }

  function animate() {
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animate);
  }
  animate();
};

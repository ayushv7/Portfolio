"use strict";
window.onload = function () {
  const pointer = document.getElementById("pointer");
  const particlesArray = [];
  const header = document.querySelector(".header");
  const clickbtn = document.querySelectorAll(".click");
  const box = document.querySelectorAll(".ss");
  const box2 = document.querySelectorAll(".ps");
  const click = new Audio("/click.mp3");
  const boxclick = new Audio("/divisionclick.mp3");
  const boxhover = new Audio("/hoverbox.mp3");
  const darkmd = document.querySelector(".darkmd");
  const lightmd = document.querySelector(".lightmd");
  const themebtn = document.querySelector(".theme");
  const thememodal = document.querySelector(".theme-modal");
  boxclick.volume = 0.34;
  click.volume = 0.25;
  let i = 0;
  // let clr = [
  //   "rgba(6, 182, 212, 0.5)",
  //   "rgba(99, 102, 241, 0.5)",
  //   "rgba(139, 92, 246, 0.5)",
  //   "rgba(236, 72, 153, 0.5)",
  //   "rgba(13, 121, 106, 0.88)",
  // ];
  let clr = [
    "rgba(41, 45, 45, 0.5)",
    "rgba(75, 77, 78, 0.5)",
    "rgba(90, 83, 106, 0.5)",
    "rgba(236, 72, 153, 0.5)",
    "rgba(27, 29, 29, 0.5)",
  ];
  let sze = [16, 30, 20, 12, 56];

  window.addEventListener("scroll", () => {
    header.classList.toggle("phase2", window.scrollY <= 50);
  });
  const touch = {
    x: null,
    y: null,
  };
  for (i = 0; i < clickbtn.length; i++) {
    clickbtn[i].addEventListener("mouseenter", function () {
      click.play();
      pointer.style.transition = "0.1s";
      pointer.style.transform = "scale(2)";
    });
    clickbtn[i].addEventListener("mouseleave", function () {
      click.play();
      pointer.style.transition = "0s";
      pointer.style.transform = "scale(1)";
    });
  }
  for (i = 0; i < box.length; i++) {
    box[i].addEventListener("click", function () {
      boxclick.play();
    });
    box[i].addEventListener("mouseenter", function () {
      boxhover.play();
    });
  }
  for (i = 0; i < box2.length; i++) {
    box2[i].addEventListener("click", function () {
      boxclick.play();
    });
    box2[i].addEventListener("mouseenter", function () {
      boxhover.play();
    });
  }
  document.addEventListener("mousemove", function (e) {
    touch.x = e.x;
    touch.y = e.y;
    pointer.style.left = e.x - 10 + "px";
    pointer.style.top = e.y - 10 + "px";
  });
  themebtn.addEventListener("click", () => {
    thememodal.classList.toggle("hidden");
  });

  thememodal.addEventListener("click", (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    thememodal.classList.toggle("hidden");
  });
  document.addEventListener("mousedown", function () {
    pointer.style.transition = "0.4s";
    pointer.style.transform = "scale(1.5)";
  });
  document.addEventListener("mouseup", function () {
    pointer.style.transition = "0s";
    pointer.style.transform = "scale(1)";
  });

  document.querySelectorAll(".canvasbg").forEach((canvas) => {
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener("resize", function () {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
    class Particle {
      constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.x1;
        this.y1;
        //   this.size = Math.random() * 24 + 1;
        this.size = 1;
        //   this.size = sze[Math.trunc(Math.random() * sze.length + 1)];
        this.speedX = (Math.random() - 0.5) * 3.5;
        this.speedY = (Math.random() - 0.5) * 3.5;
        this.sy = this.speedY;
        this.sx = this.speedX;
        this.color = clr[Math.trunc(Math.random() * clr.length + 1)];
        this.move = true;
        this.point = false;
        this.nx = null;
        this.ny = null;
      }

      nsn(nx1, ny1) {
        this.speedX = 4.5 * nx1;
        this.speedY = 4.5 * ny1;
        this.x += this.speedX;
        this.y += this.speedY;
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
            this.sx = this.speedX;
          }
          if (
            this.size + this.y >= window.innerHeight ||
            this.size + this.y <= 0
          ) {
            this.speedY = -this.speedY;
            this.sy = this.speedY;
          }
          this.x1 = this.x;
          this.y1 = this.y;
          this.speedX = this.sx;
          this.speedY = this.sy;
        }
        if (this.point) {
          this.nsn(this.nx, this.ny);
        }
      }
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    for (let i = 0; i < 280; i++) {
      particlesArray.push(new Particle());
    }
    let num = 0;
    function handleParticles() {
      for (i = 0; i < particlesArray.length; i++) {
        if (
          particlesArray[i].x >= -5 &&
          particlesArray[i].x <= canvas.width + 5 &&
          particlesArray[i].y >= -5 &&
          particlesArray[i].y <= canvas.height + 5
        ) {
          num += 1;
          particlesArray[0].color = "lightblue";
          particlesArray[0].x = touch.x;
          particlesArray[0].y = touch.y;

          particlesArray[i].update();
          particlesArray[i].draw();

          for (let j = i + 1; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
              ctx.beginPath();
              ctx.strokeStyle = particlesArray[i].color;
              ctx.lineWidth = 3.5;
              ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
              ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
              ctx.stroke();
              ctx.closePath();
            }
          }
          const dx1 = touch.x - particlesArray[i].x;
          const dy1 = touch.y - particlesArray[i].y;
          const distance = Math.sqrt(dx1 * dx1 + dy1 * dy1);
          if (distance < 90) {
            const nx = dx1 / distance;
            const ny = dy1 / distance;
            if (distance <= 35) {
              particlesArray[i].nx = nx;
              particlesArray[i].ny = ny;
              particlesArray[i].point = true;
              particlesArray[i].move = false;
              // particlesArray[i].speedX += 4.1 * nx;
              // particlesArray[i].speedY += 4.1 * ny;
            } else {
              particlesArray[i].point = false;
              particlesArray[i].move = true;
            }
          }
        } else if (i !== 0) {
          particlesArray.splice(i, 1);
        }
      }
      // console.log("current num: ", num);
      // console.log("particles length: ", particlesArray.length);
      if (num <= 260) {
        for (let i = 0; i <= 20; i++) {
          particlesArray.push(new Particle());
        }
      }
    }

    function animate() {
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      handleParticles();
      requestAnimationFrame(animate);
      num = 0;
    }

    animate();
  });
};

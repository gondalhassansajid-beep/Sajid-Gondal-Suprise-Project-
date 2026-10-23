// ===================================
// SAJID GONDAL SURPRISE WEBSITE
// Made with love by Hassan Sajid ❤️
// ===================================

// 1. Surprise message

const surpriseBtn = document.getElementById("surpriseBtn");
const surpriseBox = document.getElementById("surpriseBox");

surpriseBtn.addEventListener("click", () => {
  const isHidden = surpriseBox.classList.contains("hidden");

  if (isHidden) {
    surpriseBox.classList.remove("hidden");
    surpriseBtn.textContent = "❤️ میرا پیغام بند کریں";

    surpriseBox.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

    createHearts();
  } else {
    surpriseBox.classList.add("hidden");
    surpriseBtn.textContent = "🎁 میرا سرپرائز کھولیں";
  }
});


// 2. Floating hearts

function createHearts() {
  const symbols = ["❤️", "💖", "✨", "💛"];

  for (let i = 0; i < 18; i++) {
    const heart = document.createElement("div");

    heart.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.bottom = "-30px";
    heart.style.fontSize = 16 + Math.random() * 22 + "px";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "10";

    document.body.appendChild(heart);

    const duration = 2500 + Math.random() * 2500;

    const animation = heart.animate(
      [
        {
          transform: "translateY(0) rotate(0deg)",
          opacity: 1
        },
        {
          transform:
            `translateY(-${window.innerHeight + 100}px) rotate(360deg)`,
          opacity: 0
        }
      ],
      {
        duration: duration,
        easing: "ease-out"
      }
    );

    animation.onfinish = () => heart.remove();
  }
}


// 3. Photo gallery

const photoInput = document.getElementById("photoInput");
const gallery = document.getElementById("gallery");

photoInput.addEventListener("change", (event) => {
  const files = Array.from(event.target.files || []);

  if (!files.length) return;

  const emptyMessage = gallery.querySelector(".empty-gallery");

  if (emptyMessage) {
    emptyMessage.remove();
  }

  files.forEach((file) => {
    if (!file.type.startsWith("image/")) return;

    const imageUrl = URL.createObjectURL(file);
    const img = document.createElement("img");

    img.src = imageUrl;
    img.alt = "ہماری خوبصورت یاد";

    img.addEventListener("click", () => {
      const viewer = document.createElement("div");

      viewer.style.position = "fixed";
      viewer.style.inset = "0";
      viewer.style.background = "rgba(0,0,0,0.95)";
      viewer.style.display = "flex";
      viewer.style.alignItems = "center";
      viewer.style.justifyContent = "center";
      viewer.style.zIndex = "100";
      viewer.style.padding = "20px";
      viewer.style.cursor = "pointer";

      const largeImage = document.createElement("img");

      largeImage.src = imageUrl;
      largeImage.style.maxWidth = "100%";
      largeImage.style.maxHeight = "85vh";
      largeImage.style.objectFit = "contain";
      largeImage.style.border = "2px solid #f5cf72";
      largeImage.style.borderRadius = "12px";

      viewer.appendChild(largeImage);

      viewer.addEventListener("click", () => {
        viewer.remove();
      });

      document.body.appendChild(viewer);
    });

    gallery.appendChild(img);
  });

  // Allow selecting the same files again.
  photoInput.value = "";
});


// 4. Golden stars animation

const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let stars = [];
let animationFrame;

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;

  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  stars = [];

  const count = Math.min(
    100,
    Math.floor(window.innerWidth / 5)
  );

  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 1.7 + 0.3,
      opacity: Math.random(),
      speed: Math.random() * 0.008 + 0.002
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  stars.forEach((star) => {
    star.opacity += star.speed;

    if (star.opacity > 1 || star.opacity < 0.15) {
      star.speed *= -1;
    }

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

    ctx.fillStyle =
      `rgba(255, 215, 120, ${star.opacity})`;

    ctx.fill();
  });

  animationFrame = requestAnimationFrame(drawStars);
}

resizeCanvas();
drawStars();

window.addEventListener("resize", resizeCanvas);


// 5. Gentle background music using Web Audio

const musicBtn = document.getElementById("musicBtn");

let audioContext = null;
let musicTimer = null;
let musicPlaying = false;
let noteIndex = 0;

const melody = [
  261.63, 329.63, 392.00, 329.63,
  293.66, 349.23, 440.00, 349.23,
  261.63, 329.63, 392.00, 523.25,
  440.00, 392.00, 329.63, 293.66
];

function playNote() {
  if (!audioContext || !musicPlaying) return;

  const now = audioContext.currentTime;

  const oscillator = audioContext.createOscillator();
  const volume = audioContext.createGain();

  oscillator.type = "sine";
  oscillator.frequency.value = melody[noteIndex];

  volume.gain.setValueAtTime(0.0001, now);
  volume.gain.exponentialRampToValueAtTime(0.045, now + 0.15);
  volume.gain.exponentialRampToValueAtTime(0.0001, now + 1.1);

  oscillator.connect(volume);
  volume.connect(audioContext.destination);

  oscillator.start(now);
  oscillator.stop(now + 1.15);

  noteIndex = (noteIndex + 1) % melody.length;
}

async function startMusic() {
  try {
    const AudioContextClass =
      window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) {
      alert("آپ کا براؤزر موسیقی چلانے کی سہولت فراہم نہیں کرتا۔");
      return;
    }

    if (!audioContext) {
      audioContext = new AudioContextClass();
    }

    await audioContext.resume();

    musicPlaying = true;
    playNote();

    musicTimer = setInterval(playNote, 900);

    musicBtn.textContent = "🔇 موسیقی بند کریں";
  } catch (error) {
    console.error("Music error:", error);

    alert("موسیقی شروع نہیں ہو سکی۔ دوبارہ کوشش کریں۔");
  }
}

function stopMusic() {
  musicPlaying = false;

  if (musicTimer) {
    clearInterval(musicTimer);
    musicTimer = null;
  }

  if (audioContext && audioContext.state === "running") {
    audioContext.suspend();
  }

  musicBtn.textContent = "🎵 موسیقی چلائیں";
}

musicBtn.addEventListener("click", () => {
  if (musicPlaying) {
    stopMusic();
  } else {
    startMusic();
  }
});


// 6. Console welcome

console.log(
  "❤️ یہ ویب سائٹ حسن ساجد نے اپنے ابو ساجد گوندل کے لیے بنائی ہے۔"
);
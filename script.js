// ==========================================
// ELEMENT
// ==========================================

const loading = document.getElementById("loading");
const opening = document.getElementById("opening");

const startBtn = document.getElementById("startBtn");
const openBtn = document.getElementById("openBtn");

const letter = document.getElementById("letter");

const typing = document.querySelector(".typing");

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

// ==========================================
// LOADING
// ==========================================

window.addEventListener("load", () => {

    setTimeout(() => {

        loading.style.opacity = "0";
        loading.style.visibility = "hidden";

    }, 2000);

});

// ==========================================
// OPENING
// ==========================================

startBtn.addEventListener("click", () => {

    opening.style.opacity = "0";

    setTimeout(() => {

        opening.style.display = "none";

    }, 1000);

});

// ==========================================
// SURAT
// ==========================================

const text = typing.innerText.trim();

typing.innerHTML = "";

let i = 0;

function typeWriter() {

    if (i < text.length) {

        typing.innerHTML += text.charAt(i);

        i++;

        setTimeout(typeWriter, 35);

    }

}

openBtn.addEventListener("click", () => {

    letter.classList.remove("hidden");

    letter.scrollIntoView({

        behavior: "smooth"

    });

    if (i === 0) {

        typeWriter();

    }

});

// ==========================================
// MUSIC
// ==========================================

let playing = false;

musicBtn.addEventListener("click", () => {

    if (!playing) {

        music.play();

        musicBtn.innerHTML = "⏸️";

        playing = true;

    } else {

        music.pause();

        musicBtn.innerHTML = "🎵";

        playing = false;

    }

});

// ==========================================
// AUTO PLAY MUSIC
// ==========================================

startBtn.addEventListener("click", () => {

    music.play().catch(() => { });

    playing = true;

    musicBtn.innerHTML = "⏸️";

});

// ==========================================
// HEART
// ==========================================

setInterval(() => {

    const heart = document.createElement("div");

    heart.className = "heart";

    heart.innerHTML = "❤️";

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.fontSize = (18 + Math.random() * 20) + "px";

    heart.style.animationDuration = (4 + Math.random() * 4) + "s";

    document.body.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 8000);

}, 350);

// ==========================================
// SLIDER
// ==========================================

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

let current = 0;

function showSlide(index) {

    slides.forEach(slide => slide.classList.remove("active"));

    dots.forEach(dot => dot.classList.remove("active"));

    slides[index].classList.add("active");

    dots[index].classList.add("active");

}

next.addEventListener("click", () => {

    current++;

    if (current >= slides.length) {

        current = 0;

    }

    showSlide(current);

});

prev.addEventListener("click", () => {

    current--;

    if (current < 0) {

        current = slides.length - 1;

    }

    showSlide(current);

});

setInterval(() => {

    current++;

    if (current >= slides.length) {

        current = 0;

    }

    showSlide(current);

}, 4000);
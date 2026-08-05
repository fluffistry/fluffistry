/* =======================================
   FLUFFISTRY V1.0
   JavaScript
======================================= */

/* =======================================
   Navbar Scroll Effect
======================================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.style.padding = "16px 6%";

        navbar.style.background = "rgba(10,10,10,.90)";

    }

    else {

        navbar.style.padding = "22px 6%";

        navbar.style.background = "rgba(10,10,10,.55)";

    }

});

/* =======================================
   Smooth Fade Elements
======================================= */

const fadeElements = document.querySelectorAll(

    ".about, .services, .portfolio, .process, .faq, .contact"

);

fadeElements.forEach((element) => {

    element.style.opacity = "0";

    element.style.transform = "translateY(60px)";

    element.style.transition = "1s";

});
/* =======================================
   Fade In On Scroll
======================================= */

function revealSections() {

    const triggerPoint = window.innerHeight * 0.85;

    fadeElements.forEach((element) => {

        const top = element.getBoundingClientRect().top;

        if (top < triggerPoint) {

            element.style.opacity = "1";

            element.style.transform = "translateY(0)";

        }

    });

}

window.addEventListener("scroll", revealSections);

window.addEventListener("load", revealSections);

/* =======================================
   Active Navigation
======================================= */

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 120;

        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach((link) => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});
/* =======================================
   Scroll To Top Button
======================================= */

// Create Button

const topButton = document.createElement("button");

topButton.innerHTML = "↑";

topButton.className = "scroll-top";

document.body.appendChild(topButton);

// Show / Hide Button

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        topButton.classList.add("show");

    }

    else {

        topButton.classList.remove("show");

    }

});

// Scroll To Top

topButton.addEventListener("click", () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

/* =======================================
   Page Load Animation
======================================= */

window.addEventListener("load", () => {

    document.body.style.opacity = "1";

});
/* =======================================
   Mouse Glow Effect
======================================= */

const glow = document.createElement("div");

glow.className = "mouse-glow";

document.body.appendChild(glow);

document.addEventListener("mousemove", (e) => {

    glow.style.left = e.clientX + "px";

    glow.style.top = e.clientY + "px";

});


/* =======================================
   Hero Parallax Effect
======================================= */

const heroVideo = document.querySelector(".hero-video");

window.addEventListener("scroll", () => {

    const scroll = window.scrollY;

    if(heroVideo){

        heroVideo.style.transform =
        `scale(1.08) translateY(${scroll * 0.15}px)`;

    }

});


/* =======================================
   Button Ripple Effect
======================================= */

const buttons = document.querySelectorAll(

    ".hero-btn, .about-btn, .contact-card a"

);

buttons.forEach((button) => {

    button.addEventListener("click", function(e){

        const circle = document.createElement("span");

        const size = Math.max(

            this.clientWidth,

            this.clientHeight

        );

        circle.style.width = size + "px";

        circle.style.height = size + "px";

        circle.style.left =
            e.offsetX - size / 2 + "px";

        circle.style.top =
            e.offsetY - size / 2 + "px";

        circle.classList.add("ripple");

        this.appendChild(circle);

        setTimeout(()=>{

            circle.remove();

        },600);

    });

});
/* =======================================
   Portfolio Image Lightbox
======================================= */

const portfolioItems = document.querySelectorAll(".portfolio-item img");

// Create Lightbox

const lightbox = document.createElement("div");

lightbox.className = "lightbox";

lightbox.innerHTML = `

    <span class="close-lightbox">&times;</span>

    <img class="lightbox-img" src="" alt="Preview">

`;

document.body.appendChild(lightbox);

const lightboxImage = document.querySelector(".lightbox-img");

const closeLightbox = document.querySelector(".close-lightbox");

// Open Lightbox

portfolioItems.forEach((image)=>{

    image.addEventListener("click",()=>{

        lightbox.classList.add("show");

        lightboxImage.src = image.src;

    });

});

// Close Button

closeLightbox.addEventListener("click",()=>{

    lightbox.classList.remove("show");

});

// Close Outside

lightbox.addEventListener("click",(e)=>{

    if(e.target === lightbox){

        lightbox.classList.remove("show");

    }

});

// ESC Key

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        lightbox.classList.remove("show");

    }

});
/* =======================================
   Mobile Navigation
======================================= */

const menu=document.getElementById("mobile-menu");
const nav=document.getElementById("nav-links");

menu.addEventListener("click",()=>{

nav.classList.toggle("open");

});
/* =======================================
   Close Menu When Clicking Outside
======================================= */

document.addEventListener("click",(e)=>{

    if(!menuButton || !navMenu) return;

    if(
        !navMenu.contains(e.target) &&
        !menuButton.contains(e.target)
    ){

        navMenu.classList.remove("open");

        menuButton.classList.remove("active");

    }

});

/* =======================================
   Prevent Multiple Rapid Clicks
======================================= */

let menuBusy = false;

if(menuButton){

    menuButton.addEventListener("click",()=>{

        if(menuBusy) return;

        menuBusy = true;

        setTimeout(()=>{

            menuBusy = false;

        },300);

    });

}
/* =======================================
   Image Lazy Loading
======================================= */

const images = document.querySelectorAll("img");

const imageObserver = new IntersectionObserver((entries, observer) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            const img = entry.target;

            img.classList.add("loaded");

            observer.unobserve(img);

        }

    });

});

images.forEach((img) => {

    imageObserver.observe(img);

});


/* =======================================
   Page Loading Spinner
======================================= */

const loader = document.querySelector(".loader");

window.addEventListener("load", () => {

    setTimeout(() => {

        if(loader){

            loader.classList.add("hide");

        }

    },600);

});

/* =======================================
   Disable Right Click
======================================= */

document.addEventListener("contextmenu", (e) => {

    e.preventDefault();

});


/* =======================================
   Disable Image Drag
======================================= */

document.querySelectorAll("img").forEach((img) => {

    img.addEventListener("dragstart", (e) => {

        e.preventDefault();

    });

});
/* =======================================
   Scroll Progress Bar
======================================= */

// Create Progress Bar

const progressBar = document.createElement("div");

progressBar.className = "progress-bar";

document.body.appendChild(progressBar);

// Update Progress

window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;

    const pageHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress = (scrollTop / pageHeight) * 100;

    progressBar.style.width = progress + "%";

});


/* =======================================
   Reveal Cards One By One
======================================= */

const cards = document.querySelectorAll(

    ".service-card, .process-card, .contact-card, .portfolio-item, .faq-item"

);

const cardObserver = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show-card");

        }

    });

},{

    threshold:.15

});

cards.forEach((card)=>{

    cardObserver.observe(card);

});


/* =======================================
   Console Message
======================================= */

console.log(

"%c🐾 Welcome to Fluffistry",

"color:#ff5a92;font-size:22px;font-weight:bold;"

);

console.log(

"%cDesigned with ❤️ by Fluffistry",

"color:white;font-size:14px;"

);


/* =======================================
   Finished
======================================= */

console.log("Fluffistry V1.0 Loaded Successfully");
/* ==========================================
   Custom Cursor
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const cursor = document.querySelector(".custom-cursor");

    if (!cursor) return;

    document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    });

    document.querySelectorAll("a, button").forEach(item => {

        item.addEventListener("mouseenter", () => {
            cursor.classList.add("active");
        });

        item.addEventListener("mouseleave", () => {
            cursor.classList.remove("active");
        });

    });

});

console.log("Custom Cursor Loaded");// ==========================

console.log("END OF SCRIPT");

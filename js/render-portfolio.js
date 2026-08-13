/* =======================================
   Renders the portfolio gallery from
   content/portfolio.json (managed via
   the /admin CMS dashboard)
======================================= */

fetch("content/portfolio.json")
    .then((res) => res.json())
    .then((data) => {

        const grid = document.getElementById("gallery-grid");

        if (!grid || !data.items) return;

        grid.innerHTML = data.items.map((item) => `
            <div class="gallery-card">
                <img src="${item.image}" alt="${item.category}">
                <div class="gallery-content">
                    <span>${item.category}</span>
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            </div>
        `).join("");

        // Re-wire the lightbox for the newly-added images
        // (reuses the .lightbox element already created by script.js)
        const lightbox = document.querySelector(".lightbox");
        const lightboxImage = document.querySelector(".lightbox-img");

        if (lightbox && lightboxImage) {

            grid.querySelectorAll(".gallery-card img").forEach((img) => {

                img.addEventListener("click", () => {
                    lightbox.classList.add("show");
                    lightboxImage.src = img.src;
                });

            });

        }

        // Re-run the card reveal-on-scroll animation for the new cards
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show-card");
                }
            });
        }, { threshold: .15 });

        grid.querySelectorAll(".gallery-card").forEach((card) => {
            cardObserver.observe(card);
        });

    })
    .catch((err) => {
        console.error("Could not load portfolio.json", err);
    });

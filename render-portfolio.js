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

        // Normalize each item so it always has an "images" array,
        // whether it was saved with the old single "image" field
        // or the new multi-image "images" field.
        const items = data.items.map((item) => {
            let images = item.images;
            if (!images || !images.length) {
                images = item.image ? [item.image] : [];
            }
            return { ...item, images };
        });

        grid.innerHTML = items.map((item, i) => `
            <div class="gallery-card" data-index="${i}">
                <img src="${item.images[0] || ''}" alt="${item.category}">
                ${item.images.length > 1 ? `<span class="image-count">1 / ${item.images.length}</span>` : ""}
                <div class="gallery-content">
                    <span>${item.category}</span>
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            </div>
        `).join("");

        // ---- Lightbox setup (reuses the .lightbox element from script.js) ----
        const lightbox = document.querySelector(".lightbox");
        const lightboxImage = document.querySelector(".lightbox-img");

        if (lightbox && lightboxImage) {

            // Add prev/next arrows to the lightbox once, if not already there
            if (!lightbox.querySelector(".lightbox-prev")) {
                lightbox.insertAdjacentHTML("beforeend", `
                    <button class="lightbox-prev" aria-label="Previous image">&#10094;</button>
                    <button class="lightbox-next" aria-label="Next image">&#10095;</button>
                    <span class="lightbox-counter"></span>
                `);
            }

            const prevBtn = lightbox.querySelector(".lightbox-prev");
            const nextBtn = lightbox.querySelector(".lightbox-next");
            const counter = lightbox.querySelector(".lightbox-counter");

            let currentImages = [];
            let currentIndex = 0;

            function showImage(idx) {
                currentIndex = (idx + currentImages.length) % currentImages.length;
                lightboxImage.src = currentImages[currentIndex];

                const hasMultiple = currentImages.length > 1;
                prevBtn.style.display = hasMultiple ? "flex" : "none";
                nextBtn.style.display = hasMultiple ? "flex" : "none";
                counter.style.display = hasMultiple ? "block" : "none";
                counter.textContent = hasMultiple ? `${currentIndex + 1} / ${currentImages.length}` : "";
            }

            grid.querySelectorAll(".gallery-card").forEach((card) => {
                const idx = Number(card.dataset.index);
                card.querySelector("img").addEventListener("click", () => {
                    currentImages = items[idx].images;
                    lightbox.classList.add("show");
                    showImage(0);
                });
            });

            prevBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                showImage(currentIndex - 1);
            });

            nextBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                showImage(currentIndex + 1);
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

        // Fix: newly-inserted images are invisible by default (site-wide
        // lazy-load CSS sets opacity:0 until a "loaded" class is added).
        // script.js only watches images that existed at page load, so these
        // dynamically-added ones need their own observer to ever become visible.
        const imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("loaded");
                    observer.unobserve(entry.target);
                }
            });
        });

        grid.querySelectorAll("img").forEach((img) => {
            imgObserver.observe(img);
        });

    })
    .catch((err) => {
        console.error("Could not load portfolio.json", err);
    });

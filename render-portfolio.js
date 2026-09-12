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

        // Normalize each item so it always has a clean "images" array of
        // plain URL strings, no matter how the CMS saved it:
        // - new multi-image field can save as ["url1","url2"] OR as
        //   [{image:"url1"},{image:"url2"}] depending on CMS version
        // - old single-image items only have "image": "url"
        const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%23171717'/%3E%3C/svg%3E";

        const items = data.items.map((item) => {
            let images = item.images;

            if (Array.isArray(images)) {
                images = images
                    .map((img) => (typeof img === "string" ? img : img && img.image))
                    .filter(Boolean);
            } else {
                images = [];
            }

            if (!images.length && item.image) {
                images = [item.image];
            }

            if (!images.length) {
                images = [PLACEHOLDER];
            }

            return { ...item, images };
        });

        grid.innerHTML = items.map((item, i) => `
            <div class="gallery-card" data-index="${i}">
                <img src="${item.images[0]}" alt="${item.category}" onerror="this.onerror=null;this.src='${PLACEHOLDER}';">
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

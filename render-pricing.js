/* =======================================
   Renders the pricing cards from
   content/pricing.json (managed via
   the /admin CMS dashboard)
======================================= */

fetch("content/pricing.json")
    .then((res) => res.json())
    .then((data) => {

        const grid = document.getElementById("pricing-grid");

        if (!grid) return;

        function renderFeatures(features) {
            return (features || []).map((f) => `<li>✔ ${f}</li>`).join("");
        }

        const refSheets = data.reference_sheets || {};
        const fursuits = data.custom_fursuits || {};

        grid.innerHTML = `
            <div class="pricing-card">
                <h3>${refSheets.title || "Reference Sheets"}</h3>
                <div class="price">
                    <span>Starting From</span>
                    <h2>${refSheets.starting_price || ""}</h2>
                </div>
                <ul>${renderFeatures(refSheets.features)}</ul>
                <a href="contact.html" class="about-btn">Request Quote</a>
            </div>

            <div class="pricing-card featured">
                <span class="popular">MOST POPULAR</span>
                <h3>${fursuits.title || "Custom Fursuits"}</h3>
                <div class="price">
                    <span>Starting From</span>
                    <h2>${fursuits.starting_price || ""}</h2>
                </div>
                <ul>${renderFeatures(fursuits.features)}</ul>
                <a href="contact.html" class="about-btn">Get Your Quote</a>
            </div>
        `;

    })
    .catch((err) => {
        console.error("Could not load pricing.json", err);
    });

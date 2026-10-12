/* =========================================================
   ISOKORW — APP
   Génération dynamique des produits, vendeurs, catégories
========================================================= */

const ISOKO = (function () {

    /* ============ HELPERS ============ */

    function formatPrice(price) {
        return price.toLocaleString("en-US") + " RWF";
    }

    function getProductById(id) {
        return ISOKO_DATA.products.find(p => p.id === Number(id));
    }

    function getSellerById(id) {
        return ISOKO_DATA.sellers.find(s => s.id === Number(id));
    }

    function getCategoryById(id) {
        return ISOKO_DATA.categories.find(c => c.id === id);
    }

    /* ============ TEMPLATE : CARTE PRODUIT ============ */

    function renderProductCard(product, options = {}) {
        const seller = getSellerById(product.seller_id);
        const showBadge = options.showBadge || null;
        const badgeText = product.badge ? product.badge : null;

        let specialBadge = "";
        if (showBadge === "new") {
            specialBadge = `<span class="new-badge" data-i18n="badge_new">🆕 NEW</span>`;
        } else if (showBadge === "top") {
            specialBadge = `<span class="top-badge" data-i18n="badge_top_rated">⭐ TOP RATED</span>`;
        }

        const promoBadge = badgeText
            ? `<span class="deal-badge">${badgeText}</span>`
            : "";

        const oldPrice = product.old_price
            ? `<span class="product-price-old">${product.old_price.toLocaleString("en-US")}</span>`
            : "";

        const verifiedLabel = product.is_verified
            ? `<span class="verified-label" data-i18n="verified">✓ Verified</span>`
            : "";

        const locationText = options.showPostedTime
            ? `<span data-i18n="location">${product.location}</span> · <span data-i18n="posted_${product.posted_hours_ago}h">Posted ${product.posted_hours_ago}h ago</span>`
            : `<span data-i18n="location">${product.location}</span>`;

        return `
            <article class="product-card" data-product-id="${product.id}">
                <div class="product-image">
                    ${specialBadge}
                    ${promoBadge}
                    <a href="product.html?id=${product.id}">
                        <img src="../${product.image}" alt="${product.title}">
                    </a>
                    <button class="favorite-button" aria-label="Add to favorites" data-fav-id="${product.id}">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/></svg>
                    </button>
                    ${verifiedLabel}
                </div>
                <div class="product-info">
                    <h3><a href="product.html?id=${product.id}" style="color:inherit;text-decoration:none;">${product.title}</a></h3>
                    <div class="price-row">
                        <strong class="product-price">${formatPrice(product.price)}</strong>
                        ${oldPrice}
                    </div>
                    <p class="product-location">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M12 21s7-7.1 7-12a7 7 0 1 0-14 0c0 4.9 7 12 7 12Z"/></svg>
                        ${locationText}
                    </p>
                    <p class="product-rating">★★★★★ <span>${product.rating} (${product.reviews})</span></p>
                </div>
            </article>
        `;
    }

    /* ============ TEMPLATE : CARTE VENDEUR ============ */

    function renderSellerCard(seller) {
        return `
            <article class="seller-card">
                <div class="seller-avatar">${seller.avatar}</div>
                <div class="seller-info">
                    <h3>${seller.name}</h3>
                    <p class="seller-rating">★★★★★ ${seller.rating} (${seller.reviews_count} reviews)</p>
                    <p data-i18n="${seller.type_key}">${seller.listings_count}+ products</p>
                    <span class="seller-verified" data-i18n="seller_verified_badge">✓ Verified Seller</span>
                </div>
                <button class="follow-button" data-i18n="follow">Follow</button>
            </article>
        `;
    }

    /* ============ RENDU : LISTE DE PRODUITS ============ */

    function renderProducts(containerId, options = {}) {
        const container = document.getElementById(containerId);
        if (!container) return;

        let products = [...ISOKO_DATA.products];

        if (options.filter === "new") {
            products = products.filter(p => p.is_new);
        } else if (options.filter === "top") {
            products = products.filter(p => p.is_top_rated);
        } else if (options.filter === "verified") {
            products = products.filter(p => p.is_verified);
        }

        if (options.sort === "price-asc") {
            products.sort((a, b) => a.price - b.price);
        } else if (options.sort === "price-desc") {
            products.sort((a, b) => b.price - a.price);
        } else if (options.sort === "rating") {
            products.sort((a, b) => b.rating - a.rating);
        } else if (options.sort === "newest") {
            products.sort((a, b) => a.posted_hours_ago - b.posted_hours_ago);
        }

        if (options.limit) {
            products = products.slice(0, options.limit);
        }

        const badgeType = options.badge || null;

        container.innerHTML = products
            .map(p => renderProductCard(p, { showBadge: badgeType, showPostedTime: options.showPostedTime }))
            .join("");

        attachFavoriteEvents();
    }

    /* ============ RENDU : PRODUITS D'UN VENDEUR ============ */

    function renderSellerProducts(containerId, sellerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const products = ISOKO_DATA.products.filter(p => p.seller_id === Number(sellerId));

        container.innerHTML = products.map(p => renderProductCard(p)).join("");

        attachFavoriteEvents();
    }

    /* ============ RENDU : LISTE DE VENDEURS ============ */

    function renderSellers(containerId, options = {}) {
        const container = document.getElementById(containerId);
        if (!container) return;

        let sellers = [...ISOKO_DATA.sellers];

        if (options.limit) {
            sellers = sellers.slice(0, options.limit);
        }

        container.innerHTML = sellers.map(renderSellerCard).join("");
    }

    /* ============ RENDU : CATÉGORIES ============ */

    function renderCategories(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = ISOKO_DATA.categories.map(cat => `
            <a href="products.html?cat=${cat.id}" class="category-card">
                <div class="category-icon">${cat.icon}</div>
                <span data-i18n="${cat.name_key}"></span>
                <small data-i18n="ads_${cat.count}">${cat.count.toLocaleString("en-US")} ads</small>
            </a>
        `).join("");
    }

    /* ============ FAVORIS ============ */

    function attachFavoriteEvents() {
        document.querySelectorAll("[data-fav-id]").forEach(btn => {
            /* Éviter de réattacher plusieurs fois */
            if (btn.dataset.favAttached === "1") return;
            btn.dataset.favAttached = "1";

            btn.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                const id = btn.getAttribute("data-fav-id");
                toggleFavorite(id, btn);
            });
        });
    }

    function getFavorites() {
        try {
            return JSON.parse(localStorage.getItem("isokorw_favorites") || "[]");
        } catch {
            return [];
        }
    }

    function toggleFavorite(productId, btnElement) {
        const id = Number(productId);
        let favorites = getFavorites();

        if (favorites.includes(id)) {
            favorites = favorites.filter(f => f !== id);
            if (btnElement) btnElement.classList.remove("active");
        } else {
            favorites.push(id);
            if (btnElement) btnElement.classList.add("active");
        }

        localStorage.setItem("isokorw_favorites", JSON.stringify(favorites));
        updateFavoritesCount();
    }

    function updateFavoritesCount() {
        const count = getFavorites().length;
        document.querySelectorAll(".favorites-count").forEach(el => {
            el.textContent = count;
            el.style.display = count > 0 ? "flex" : "none";
        });
    }

    function markFavoritesAsActive() {
        const favorites = getFavorites();
        document.querySelectorAll("[data-fav-id]").forEach(btn => {
            const id = Number(btn.getAttribute("data-fav-id"));
            if (favorites.includes(id)) {
                btn.classList.add("active");
            }
        });
    }

    /* ============ AUTO-INIT AU CHARGEMENT ============ */

    document.addEventListener("DOMContentLoaded", () => {
        attachFavoriteEvents();
        markFavoritesAsActive();
        updateFavoritesCount();
    });

    /* ============ API PUBLIQUE ============ */

    return {
        formatPrice,
        getProductById,
        getSellerById,
        getCategoryById,
        renderProducts,
        renderSellers,
        renderCategories,
        renderSellerProducts,
        toggleFavorite,
        getFavorites,
        updateFavoritesCount,
        markFavoritesAsActive,
        attachFavoriteEvents
    };

})();
const favoriteButtons =
    document.querySelectorAll(".favorite");

favoriteButtons.forEach(button => {

    button.addEventListener("click", () => {

        button.classList.toggle("active");

    });

});
/* =========================================================
   MEGA MENU (All Categories)
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const toggleBtn = document.getElementById("allCategoriesToggle");
    const megaMenu = document.getElementById("megaMenu");
    const megaOverlay = document.getElementById("megaMenuOverlay");
    const closeBtn = document.getElementById("megaMenuClose");

    if (!toggleBtn || !megaMenu) return;

    /* Ouvrir / fermer au clic sur "All Categories" */
    toggleBtn.addEventListener("click", (e) => {
        e.stopPropagation();

        const isOpen = megaMenu.classList.contains("open");

        if (isOpen) {
            closeMegaMenu();
        } else {
            openMegaMenu();
        }
    });

    /* Fermer via le bouton X */
    if (closeBtn) {
        closeBtn.addEventListener("click", closeMegaMenu);
    }

    /* Fermer au clic sur l'overlay */
    if (megaOverlay) {
        megaOverlay.addEventListener("click", closeMegaMenu);
    }

    /* Fermer avec la touche Échap */
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeMegaMenu();
        }
    });

    /* Empêcher la fermeture quand on clique à l'intérieur du menu */
    megaMenu.addEventListener("click", (e) => {
        e.stopPropagation();
    });

    /* Fonctions */
    function openMegaMenu() {
        megaMenu.classList.add("open");
        megaOverlay?.classList.add("open");
        toggleBtn.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeMegaMenu() {
        megaMenu.classList.remove("open");
        megaOverlay?.classList.remove("open");
        toggleBtn.classList.remove("active");
        document.body.style.overflow = "";
    }
});
/* =========================================================
   6. DARK MODE TOGGLE
========================================================= */

(function () {

    const THEME_KEY = "isokorw-theme";

    /* Appliquer le thème sauvegardé IMMÉDIATEMENT (évite le flash blanc) */
    const savedTheme = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
        document.body.classList.add("dark-mode");
    }

    /* Attendre que le DOM soit prêt pour attacher le listener */
    document.addEventListener("DOMContentLoaded", () => {

        const themeToggle = document.getElementById("themeToggle");
        if (!themeToggle) return;

        /* Mettre à jour l'état du bouton au chargement */
        updateToggleState();

        /* Toggle au clic */
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");

            const isDark = document.body.classList.contains("dark-mode");
            localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");

            updateToggleState();
        });

        /* Met à jour le title et l'aria-label selon l'état */
        function updateToggleState() {
            const isDark = document.body.classList.contains("dark-mode");
            themeToggle.setAttribute(
                "title",
                isDark ? "Switch to light mode" : "Switch to dark mode"
            );
            themeToggle.setAttribute(
                "aria-label",
                isDark ? "Switch to light mode" : "Switch to dark mode"
            );
        }

    });

})();
/* =========================================================
   7. BACK TO TOP + SCROLL PROGRESS
========================================================= */

(function () {

    document.addEventListener("DOMContentLoaded", () => {

        const backToTop = document.getElementById("backToTop");
        const scrollProgress = document.getElementById("scrollProgress");


        /* ============ SCROLL HANDLER ============ */

        function handleScroll() {

            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;


            /* --- Bouton Back to top --- */
            if (backToTop) {
                if (scrollTop > 400) {
                    backToTop.classList.add("visible");
                } else {
                    backToTop.classList.remove("visible");
                }
            }


            /* --- Barre de progression --- */
            if (scrollProgress) {
                scrollProgress.style.width = progress + "%";
            }
        }


        /* ============ CLIC = RETOUR EN HAUT ============ */

        if (backToTop) {
            backToTop.addEventListener("click", () => {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            });
        }


        /* ============ ÉCOUTE DU SCROLL ============ */

        /* Utiliser requestAnimationFrame pour éviter de surcharger */
        let ticking = false;

        window.addEventListener("scroll", () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });


        /* Initial call au chargement */
        handleScroll();

    });

})();
/* =========================================================
   8. GESTION DES LIENS CASSÉS (sécurité)
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* Détecter les liens qui pointent vers un fichier HTML */
    const internalLinks = document.querySelectorAll('a[href$=".html"]');

    internalLinks.forEach(link => {

        /* Ignorer les liens externes */
        const href = link.getAttribute("href");
        if (!href || href.startsWith("http") || href.startsWith("#")) return;

        /* Au clic, vérifier que le lien est valide */
        link.addEventListener("click", (e) => {

            /* Si le lien est "#" ou vide, empêcher */
            if (href === "#" || href === "") {
                e.preventDefault();
                return;
            }

            /* Log pour debug */
            console.log("Navigation vers :", href);
        });
    });


    /* =====================================================
       FIX : Empêcher la page blanche au retour arrière
    ===================================================== */

    window.addEventListener("pageshow", (event) => {

        /* Si la page est restaurée depuis le cache (bfcache) */
        if (event.persisted) {
            console.log("Page restaurée depuis le cache");
        }

        /* Re-forcer la réinitialisation du body (au cas où un menu était ouvert) */
        if (document.body.style.overflow === "hidden") {
            document.body.style.overflow = "";
        }
    });


    /* =====================================================
       FIX : Fermer le mega menu si on quitte la page
    ===================================================== */

    window.addEventListener("beforeunload", () => {
        document.body.style.overflow = "";
    });

});
/* =========================================================
   9. LANGUAGE SWITCHER (Multilingue)
========================================================= */

(function () {

    const LANG_KEY = "isokorw-lang";

    /* Récupérer la langue sauvegardée ou détecter celle du navigateur */
    const savedLang = localStorage.getItem(LANG_KEY);
    const browserLang = (navigator.language || "en").slice(0, 2).toLowerCase();

    const defaultLang = savedLang || (["en", "rw", "fr"].includes(browserLang) ? browserLang : "en");

    /* Appliquer la langue IMMÉDIATEMENT (avant le DOMContentLoaded) */
    document.documentElement.lang = defaultLang;


    document.addEventListener("DOMContentLoaded", () => {

        const langSwitcher = document.getElementById("langSwitcher");
        const langBtn = document.getElementById("langBtn");
        const langDropdown = document.getElementById("langDropdown");
        const langCurrent = document.getElementById("langCurrent");
        const langOptions = document.querySelectorAll(".lang-option");

        if (!langSwitcher || !langBtn) return;


        /* ============ APPLIQUER LA TRADUCTION ============ */

        function applyLanguage(lang) {

            const dict = translations[lang] || translations.en;

            /* Mettre à jour tous les éléments avec data-i18n */
            document.querySelectorAll("[data-i18n]").forEach(el => {
                const key = el.getAttribute("data-i18n");
                if (dict[key]) {
                    el.textContent = dict[key];
                }
            });

            /* Mettre à jour les placeholders avec data-i18n-placeholder */
            document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
                const key = el.getAttribute("data-i18n-placeholder");
                if (dict[key]) {
                    el.setAttribute("placeholder", dict[key]);
                }
            });

            /* Mettre à jour les title avec data-i18n-title */
            document.querySelectorAll("[data-i18n-title]").forEach(el => {
                const key = el.getAttribute("data-i18n-title");
                if (dict[key]) {
                    el.setAttribute("title", dict[key]);
                }
            });

            /* Mettre à jour l'affichage du code langue dans le bouton */
            if (langCurrent) {
                langCurrent.textContent = lang.toUpperCase();
            }

            /* Marquer l'option active */
            langOptions.forEach(opt => {
                opt.classList.toggle("active", opt.getAttribute("data-lang") === lang);
            });

            /* Mettre à jour l'attribut lang du HTML */
            document.documentElement.lang = lang;

            /* Sauvegarder */
            localStorage.setItem(LANG_KEY, lang);
        }


        /* ============ OUVRIR / FERMER LE DROPDOWN ============ */

        langBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle("open");
        });

        /* Fermer au clic extérieur */
        document.addEventListener("click", (e) => {
            if (!langSwitcher.contains(e.target)) {
                langDropdown.classList.remove("open");
            }
        });

        /* Fermer avec Échap */
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                langDropdown.classList.remove("open");
            }
        });


        /* ============ CHANGER DE LANGUE ============ */

        langOptions.forEach(option => {
            option.addEventListener("click", () => {
                const lang = option.getAttribute("data-lang");
                applyLanguage(lang);
                langDropdown.classList.remove("open");
            });
        });


        /* ============ APPLIQUER AU CHARGEMENT ============ */

        applyLanguage(defaultLang);

    });

})();
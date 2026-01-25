/* ============================================
   VISION.JS - Scripts pour la page Manifeste
   
   Ce fichier gère:
   - Navigation entre les catégories
   - Ouverture/fermeture des mesures
   - Animations et interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
    // ============================================
    // NAVIGATION DES CATÉGORIES
    // ============================================
    const categoryBtns = document.querySelectorAll('.category-btn');
    const categoryContents = document.querySelectorAll('.category-content');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const categoryId = this.getAttribute('data-category');

            // Désactiver tous les boutons
            categoryBtns.forEach(b => b.classList.remove('active'));

            // Activer le bouton cliqué
            this.classList.add('active');

            // Cacher tous les contenus
            categoryContents.forEach(content => {
                content.classList.remove('active');
            });

            // Afficher le contenu correspondant
            const targetContent = document.getElementById(categoryId);
            if (targetContent) {
                targetContent.classList.add('active');

                // Scroll vers le contenu si nécessaire
                setTimeout(() => {
                    targetContent.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                        inline: 'nearest'
                    });
                }, 100);
            }
        });
    });

    // ============================================
    // TOGGLE DES MESURES (Accordéon)
    // ============================================
    const mesureCards = document.querySelectorAll('.mesure-card');

    mesureCards.forEach(card => {
        const resume = card.querySelector('.mesure-resume');
        const toggle = card.querySelector('.mesure-toggle');

        // Clic sur le résumé ou le bouton toggle
        const handleToggle = function (e) {
            e.preventDefault();

            // Toggle de la carte actuelle
            card.classList.toggle('open');

            // Mettre à jour l'attribut aria-expanded
            const isOpen = card.classList.contains('open');
            toggle.setAttribute('aria-expanded', isOpen);

            // Optionnel: Fermer les autres cartes de la même catégorie
            // Décommentez les lignes suivantes pour un comportement accordéon strict
            /*
            const parentCategory = card.closest('.category-content');
            if (parentCategory) {
                parentCategory.querySelectorAll('.mesure-card').forEach(otherCard => {
                    if (otherCard !== card && otherCard.classList.contains('open')) {
                        otherCard.classList.remove('open');
                        otherCard.querySelector('.mesure-toggle').setAttribute('aria-expanded', 'false');
                    }
                });
            }
            */
        };

        resume.addEventListener('click', handleToggle);
    });

    // ============================================
    // GESTION DES VIDÉOS TWITTER/X
    // ============================================
    // Les vidéos Twitter sont chargées automatiquement par le script Twitter
    // Vérifier si le script Twitter est chargé
    if (typeof twttr !== 'undefined' && twttr.widgets) {
        twttr.widgets.load();
    }

    // ============================================
    // LAZY LOADING DES VIDÉOS
    // ============================================
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target;
                if (iframe.dataset.src) {
                    iframe.src = iframe.dataset.src;
                    videoObserver.unobserve(iframe);
                }
            }
        });
    }, {
        rootMargin: '100px'
    });

    // Observer les iframes avec data-src (lazy loading)
    document.querySelectorAll('iframe[data-src]').forEach(iframe => {
        videoObserver.observe(iframe);
    });

    // ============================================
    // SMOOTH SCROLL POUR LES LIENS INTERNES
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ============================================
    // ANIMATION AU SCROLL
    // ============================================
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.mesure-card').forEach(card => {
        animateOnScroll.observe(card);
    });

    // ============================================
    // COMPTEUR DE MESURES (Optionnel)
    // ============================================
    categoryContents.forEach(content => {
        const mesures = content.querySelectorAll('.mesure-card');
        const header = content.querySelector('.category-header');
        if (header && mesures.length > 0) {
            const countBadge = document.createElement('span');
            countBadge.className = 'mesure-count';
            countBadge.textContent = mesures.length + ' mesure' + (mesures.length > 1 ? 's' : '');
            countBadge.style.cssText = `
                display: inline-block;
                background: var(--accent-orange);
                color: white;
                padding: 0.25rem 0.75rem;
                border-radius: 20px;
                font-size: 0.85rem;
                margin-top: 0.5rem;
            `;
            const intro = header.querySelector('.category-intro');
            if (intro) {
                intro.insertAdjacentElement('afterend', countBadge);
            }
        }
    });

    // ============================================
    // NAVIGATION AU CLAVIER
    // ============================================
    document.addEventListener('keydown', function (e) {
        // Échap pour fermer toutes les mesures ouvertes
        if (e.key === 'Escape') {
            document.querySelectorAll('.mesure-card.open').forEach(card => {
                card.classList.remove('open');
                card.querySelector('.mesure-toggle').setAttribute('aria-expanded', 'false');
            });
        }
    });

    // ============================================
    // TOGGLE DES ANNEXES (Accordéon)
    // ============================================
    const annexeCards = document.querySelectorAll('.annexe-card');

    annexeCards.forEach(card => {
        const resume = card.querySelector('.annexe-resume');
        const toggle = card.querySelector('.annexe-toggle');

        const handleAnnexeToggle = function (e) {
            e.preventDefault();
            card.classList.toggle('open');
            const isOpen = card.classList.contains('open');
            if (toggle) {
                toggle.setAttribute('aria-expanded', isOpen);
            }
        };

        if (resume) {
            resume.addEventListener('click', handleAnnexeToggle);
        }
    });

    console.log('Vision.js chargé avec succès!');
});

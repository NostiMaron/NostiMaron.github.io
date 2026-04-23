window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('header--scrolled');
    } else {
        header.classList.remove('header--scrolled');
    }

    // Animación de rotación al hacer scroll para la mascota
    const heroCharacter = document.querySelector('.hero__character');
    if (heroCharacter) {
        // Inclinación basada en el scroll (multiplicador reducido para hacerlo más sutil)
        const rotation = window.scrollY * 0.03;
        heroCharacter.style.setProperty('--scroll-rot', `${rotation}deg`);
    }

    // Animación de rotación para el tweet
    const tweetBlock = document.querySelector('.lore__photo-block');
    if (tweetBlock) {
        const rect = tweetBlock.getBoundingClientRect();
        // Solo animar si el elemento está visible en pantalla
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            // Calculamos cuánto ha entrado en pantalla
            const visibleOffset = window.innerHeight - rect.top;
            // Empieza en -2 grados y suma una rotación muy suave (0.005) a medida que sube
            const tweetRotation = -2 + (visibleOffset * 0.005);
            // Limitamos un poco la rotación máxima para que nunca sea ilegible (ej. de -2 a 3 grados máximo)
            const clampedRotation = Math.min(tweetRotation, 3);
            tweetBlock.style.setProperty('--scroll-rot-tweet', `${clampedRotation}deg`);
        }
    }

    // Aparición del banner "Hi! I am Puppeth"
    const mainBanner = document.querySelector('.hero__main-banner');
    if (mainBanner) {
        // Si el usuario hace scroll hacia abajo (más de 20px), aparece
        if (window.scrollY > 20) {
            mainBanner.classList.add('visible');
        } else {
            mainBanner.classList.remove('visible'); // Se oculta si vuelve hasta arriba del todo
        }
    }
});

// Intersection Observer para revelar los párrafos del Lore
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // 20% del elemento debe ser visible para que entre
    };

    const loreObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                // Opcional: remover para que vuelva a entrar si subes y bajas
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    const loreSteps = document.querySelectorAll('.lore__step');
    loreSteps.forEach((step, index) => {
        // Alternamos las clases: el primero (index 0) derecha, segundo izquierda, etc.
        if (index % 2 === 0) {
            step.classList.add('slide-from-right');
        } else {
            step.classList.add('slide-from-left');
        }
        loreObserver.observe(step);
    });

    // Observar también el título para su animación de entrada
    const loreTitle = document.querySelector('.lore__title');
    if (loreTitle) {
        loreObserver.observe(loreTitle);
    }

    // Observar la mascota pequeña del medio
    const smallMascot = document.querySelector('.lore__character-small');
    if (smallMascot) {
        loreObserver.observe(smallMascot);
    }

    // Observar el título del footer
    const footerTitle = document.querySelector('.footer__title-wrapper');
    if (footerTitle) {
        loreObserver.observe(footerTitle);
    }

    // Lógica del Menú Hamburguesa
    const burgerMenu = document.getElementById('burger-menu');
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.header__link');

    if (burgerMenu) {
        burgerMenu.addEventListener('click', () => {
            header.classList.toggle('is-open');
        });
    }

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            header.classList.remove('is-open');
        });
    });
});

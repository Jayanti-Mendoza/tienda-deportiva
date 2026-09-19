document.addEventListener('DOMContentLoaded', () => {

    // 1. MENÚ RESPONSIVO (HAMBURGUESA)
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

   // 2. CARRUSEL DE "MÁS VENDIDOS" (TOP 5 SIN ESPACIOS BLANCOS)
const track = document.getElementById('carruselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (track && prevBtn && nextBtn) {
    let index = 0;

    // Obtener las tarjetas del carrusel
    const cards = track.querySelectorAll('.carrusel-card');

    const updateCarrusel = () => {
        // Calcular cuántas tarjetas son visibles en la pantalla según el ancho
        const containerWidth = track.parentElement.offsetWidth;
        const cardWidth = cards[0].offsetWidth + 20; // Ancho + gap
        const visibleCards = Math.round(containerWidth / cardWidth);

        // El límite máximo es: Total de Tarjetas (5) - Tarjetas Visibles (3 en escritorio = maxIndex 2)
        const maxIndex = Math.max(0, cards.length - visibleCards);

        // Si el índice actual supera el máximo permitido, se corrige
        if (index > maxIndex) {
            index = maxIndex;
        }

        track.style.transform = `translateX(-${index * cardWidth}px)`;
    };

    nextBtn.addEventListener('click', () => {
        const containerWidth = track.parentElement.offsetWidth;
        const cardWidth = cards[0].offsetWidth + 20;
        const visibleCards = Math.round(containerWidth / cardWidth);
        const maxIndex = Math.max(0, cards.length - visibleCards);

        if (index < maxIndex) {
            index++;
        } else {
            index = 0; // Vuelve al Top 1 inmediatamente cuando ya no hay más espacio
        }
        updateCarrusel();
    });

    prevBtn.addEventListener('click', () => {
        const containerWidth = track.parentElement.offsetWidth;
        const cardWidth = cards[0].offsetWidth + 20;
        const visibleCards = Math.round(containerWidth / cardWidth);
        const maxIndex = Math.max(0, cards.length - visibleCards);

        if (index > 0) {
            index--;
        } else {
            index = maxIndex; // Salta al Top 3-4-5 sin dejar espacios en blanco
        }
        updateCarrusel();
    });

    window.addEventListener('resize', updateCarrusel);
}

    // 3. FILTRADO DE PRODUCTOS
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Activar botón seleccionado
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'todos' || filterValue === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 4. ACORDEÓN DE PREGUNTAS FRECUENTES (FAQ)
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;

            // Cerrar los demás items opcionalmente
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('open');
                }
            });

            faqItem.classList.toggle('open');
        });
    });

});
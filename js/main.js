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

    // 2. CARRUSEL DE "MÁS VENDIDOS"
    const track = document.getElementById('carruselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (track && prevBtn && nextBtn) {
        let index = 0;

        const updateCarrusel = () => {
            const cardWidth = track.querySelector('.carrusel-card').offsetWidth + 20; // Ancho + gap
            track.style.transform = `translateX(-${index * cardWidth}px)`;
        };

        nextBtn.addEventListener('click', () => {
            const cards = track.querySelectorAll('.carrusel-card');
            if (index < cards.length - 1) {
                index++;
                updateCarrusel();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (index > 0) {
                index--;
                updateCarrusel();
            }
        });
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
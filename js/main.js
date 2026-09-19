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

    // 2. CARRUSEL DE "MÁS VENDIDOS" (CONTROL DE FLECHAS INICIO/FIN SIN ESPACIOS BLANCOS)
    const track = document.getElementById('carruselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (track && prevBtn && nextBtn) {
        let index = 0;
        const cards = track.querySelectorAll('.carrusel-card');

        const updateCarrusel = () => {
            if (!cards.length) return;

            const containerWidth = track.parentElement.offsetWidth;
            const cardWidth = cards[0].offsetWidth + 20; // Ancho tarjeta + gap
            const visibleCards = Math.max(1, Math.round(containerWidth / cards[0].offsetWidth));
            const maxIndex = Math.max(0, cards.length - visibleCards);

            if (index > maxIndex) index = maxIndex;
            if (index < 0) index = 0;

            track.style.transform = `translateX(-${index * cardWidth}px)`;

            // Ocultar/mostrar flechas de navegación según posición
            if (index === 0) {
                prevBtn.classList.add('hidden');
            } else {
                prevBtn.classList.remove('hidden');
            }

            if (index >= maxIndex) {
                nextBtn.classList.add('hidden');
            } else {
                nextBtn.classList.remove('hidden');
            }
        };

        nextBtn.addEventListener('click', () => {
            const containerWidth = track.parentElement.offsetWidth;
            const visibleCards = Math.max(1, Math.round(containerWidth / cards[0].offsetWidth));
            const maxIndex = Math.max(0, cards.length - visibleCards);

            if (index < maxIndex) {
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

        window.addEventListener('resize', updateCarrusel);
        updateCarrusel(); // Estado inicial
    }

    // 3. FUNCIONALIDAD DE TALLAS Y MENSAJE DE WHATSAPP
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const tallaBtns = card.querySelectorAll('.talla-btn');
        const btnBuy = card.querySelector('.btn-buy');
        const titleEl = card.querySelector('.product-title') || card.querySelector('h4');

        if (!btnBuy || !titleEl) return;

        const updateWhatsAppLink = (selectedSize) => {
            const productName = titleEl.textContent.trim();
            let textMessage = '';

            if (productName.toLowerCase().includes('kit') || productName.toLowerCase().includes('espinilleras')) {
                textMessage = `Hola, me interesa el ${productName} en Talla ${selectedSize}`;
            } else {
                textMessage = `Hola, me interesa la playera ${productName} en Talla ${selectedSize}`;
            }

            btnBuy.href = `https://wa.me/529993688277?text=${encodeURIComponent(textMessage)}`;
        };

        tallaBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tallaBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const selectedSize = btn.getAttribute('data-talla') || btn.textContent.trim();
                updateWhatsAppLink(selectedSize);
            });
        });

        // Inicializar link con la talla activa por defecto (si existe)
        const activeBtn = card.querySelector('.talla-btn.active') || card.querySelector('.talla-btn');
        if (activeBtn) {
            const defaultSize = activeBtn.getAttribute('data-talla') || activeBtn.textContent.trim();
            updateWhatsAppLink(defaultSize);
        }
    });

    // 4. FILTRADO DE PRODUCTOS EN EL CATÁLOGO
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'todos' || filterValue === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 5. ACORDEÓN DE PREGUNTAS FRECUENTES (FAQ)
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;

            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('open');
                }
            });

            faqItem.classList.toggle('open');
        });
    });

});
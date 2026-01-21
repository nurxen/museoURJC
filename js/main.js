document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================
    // 1. BLOQUEOS DE MODO KIOSCO (SEGURIDAD TÁCTIL)
    // =========================================

    // Bloquear menú contextual (clic derecho / pulsación larga)
    document.addEventListener('contextmenu', e => e.preventDefault());

    // Bloquear arrastre de imágenes y enlaces (evita que "saquen" fotos de la web)
    document.addEventListener('dragstart', e => e.preventDefault());

    // Bloquear zoom con dos dedos y gestos de sistema
    document.addEventListener('touchstart', (e) => {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });

    // Evitar selección de texto al dejar pulsado
    document.addEventListener('selectstart', e => e.preventDefault());

    // Desactivar el menú de "Guardar imagen" en dispositivos táctiles
    document.body.style.webkitTouchCallout = 'none';
    document.body.style.webkitUserSelect = 'none';

    // =========================================
    // 2. VARIABLES Y SELECTORES
    // =========================================
    const modal = document.getElementById('modal-info');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.querySelector('.btn-close');

    // Seleccionamos todos los elementos interactivos (Galería y Personajes)
    const clickableItems = document.querySelectorAll('.item-galeria, .bento-item, .card-personaje');

    // =========================================
    // 3. FUNCIONES DEL MODAL
    // =========================================

    /**
     * Abre el modal y rellena la información del objeto
     * @param {HTMLElement} item - El elemento pulsado
     */
    const openModal = (item) => {
        const nombre = item.getAttribute('data-nombre');
        const info = item.getAttribute('data-info');
        const foto = item.getAttribute('data-foto');

        // Si el elemento no tiene datos (prevención), no hacemos nada
        if (!nombre) return;

        // Feedback táctil: Vibración corta de 10ms (solo en dispositivos compatibles)
        if (window.navigator.vibrate) {
            window.navigator.vibrate(10);
        }

        // Rellenar contenido del modal
        modalTitle.textContent = nombre;
        modalDesc.innerHTML = info;
        modalImg.src = foto;
        
        // Mostrar modal y bloquear el scroll del fondo
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        // Pequeño delay para permitir que la transición CSS se active
        setTimeout(() => modal.classList.add('active'), 10);
    };

    /**
     * Cierra el modal y limpia los recursos
     */
    const closeModal = () => {
        modal.classList.remove('active');
        
        // Reactivar scroll del fondo
        document.body.style.overflow = '';
        
        setTimeout(() => { 
            modal.style.display = 'none';
            // Limpiar la imagen para que no parpadee el objeto anterior la próxima vez
            modalImg.src = ''; 
        }, 300); // Tiempo coincidente con la transición CSS
    };

    // =========================================
    // 4. LISTENERS DE EVENTOS
    // =========================================

    // Delegación de eventos para los elementos de la galería
clickableItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            // Usamos 'this' porque en un event listener normal 
            // 'this' siempre apunta al elemento al que se le añadió el evento
            // (en este caso, la tarjeta .item-galeria)
            openModal(this); 
        });
    });

    // Cerrar modal al pulsar el botón de cerrar
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeModal();
        });
    }

    // Cerrar modal al tocar fuera del contenido (en el fondo oscuro)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Cerrar con tecla Escape (útil para pruebas con teclado o mantenimiento)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});
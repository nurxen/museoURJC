document.addEventListener('DOMContentLoaded', () => {
    // 1. Configuración de Modo Kiosco (Bloqueos)
    document.addEventListener('contextmenu', e => e.preventDefault());
    // Evita que el usuario arrastre imágenes fuera de su sitio
    document.addEventListener('dragstart', e => e.preventDefault());

    const modal = document.getElementById('modal-info');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.querySelector('.btn-close');

    // Seleccionamos todos los items (usando ambas clases por seguridad)
    const clickableItems = document.querySelectorAll('.item-galeria, .bento-item');

    // 2. Función para Abrir Modal
    const openModal = (item) => {
        const nombre = item.getAttribute('data-nombre');
        const info = item.getAttribute('data-info');
        const foto = item.getAttribute('data-foto');

        // Feedback táctil (vibración corta 10ms)
        if (window.navigator.vibrate) {
            window.navigator.vibrate(10);
        }

        // Rellenar contenido
        modalTitle.textContent = nombre;
        modalDesc.innerHTML = info;
        modalImg.src = foto;
        
        // Mostrar modal con animación
        modal.style.display = 'flex';
        // Bloquear scroll del fondo
        document.body.style.overflow = 'hidden';

        setTimeout(() => modal.classList.add('active'), 10);
    };

    // 3. Función para Cerrar Modal
    const closeModal = () => {
        modal.classList.remove('active');
        // Reactivar scroll del fondo
        document.body.style.overflow = '';
        
        setTimeout(() => { 
            modal.style.display = 'none';
            // Limpiar src para que la siguiente carga no muestre la imagen anterior por un segundo
            modalImg.src = ''; 
        }, 300);
    };

    // 4. Listeners de Eventos
    clickableItems.forEach(item => {
        item.addEventListener('click', () => openModal(item));
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeModal();
        });
    }

    // Cerrar al tocar fuera del contenido o en el fondo oscuro
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Soporte para tecla Escape (por si hay teclado conectado o para desarrollo)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});
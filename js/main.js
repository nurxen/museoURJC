document.addEventListener('DOMContentLoaded', () => {
    // --- BLOQUEOS DE MODO KIOSCO EXTENDIDOS ---
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('dragstart', e => e.preventDefault());

    document.addEventListener('touchstart', (e) => {
        if (e.touches.length > 1) e.preventDefault(); 
    }, { passive: false });

    document.addEventListener('selectstart', e => e.preventDefault());

    // --- VARIABLES ---
    const modal = document.getElementById('modal-info');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.querySelector('.btn-close');

    // Seleccionamos todos los posibles elementos interactivos
    const clickableItems = document.querySelectorAll('.item-galeria, .bento-item, .card-personaje');

    // --- FUNCIÓN ABRIR MODAL ---
    const openModal = (item) => {
        // Aseguramos que estamos leyendo del elemento que tiene los datos
        const nombre = item.getAttribute('data-nombre');
        const info = item.getAttribute('data-info');
        const foto = item.getAttribute('data-foto');

        if (!nombre) return; // Si no hay datos, no hace nada

        if (window.navigator.vibrate) window.navigator.vibrate(10);

        modalTitle.textContent = nombre;
        modalDesc.innerHTML = info;
        modalImg.src = foto;
        
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        setTimeout(() => modal.classList.add('active'), 10);
    };

    // --- FUNCIÓN CERRAR MODAL ---
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => { 
            modal.style.display = 'none';
            modalImg.src = ''; 
        }, 300);
    };

    // --- LISTENERS ---
    clickableItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // USAMOS .closest() -> Esto garantiza que aunque pinches en un icono o borde interno, 
            // el navegador busque el contenedor padre correcto que tiene la información
            const targetItem = e.target.closest('.item-galeria, .bento-item, .card-personaje');
            if (targetItem) {
                openModal(targetItem);
            }
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeModal();
        });
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // --- BLOQUEOS DE MODO KIOSCO EXTENDIDOS ---

    // 1. Bloquear menú contextual (clic derecho)
    document.addEventListener('contextmenu', e => e.preventDefault());

    // 2. Bloquear arrastre de imágenes y enlaces
    document.addEventListener('dragstart', e => e.preventDefault());

    // 3. Bloquear pulsación larga que activa "Google Lens" o "Guardar imagen"
    document.addEventListener('touchstart', (e) => {
        if (e.touches.length > 1) e.preventDefault(); // Bloquea zoom con dos dedos
    }, { passive: false });

    // 4. Evitar que el sistema operativo intente seleccionar texto al dejar pulsado
    document.addEventListener('selectstart', e => e.preventDefault());

    // --- RESTO DEL CÓDIGO DEL MODAL ---
    const modal = document.getElementById('modal-info');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.querySelector('.btn-close');

    const clickableItems = document.querySelectorAll('.item-galeria, .bento-item');

    const openModal = (item) => {
        const nombre = item.getAttribute('data-nombre');
        const info = item.getAttribute('data-info');
        const foto = item.getAttribute('data-foto');

        if (window.navigator.vibrate) window.navigator.vibrate(10);

        modalTitle.textContent = nombre;
        modalDesc.innerHTML = info;
        modalImg.src = foto;
        
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        setTimeout(() => modal.classList.add('active'), 10);
    };

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => { 
            modal.style.display = 'none';
            modalImg.src = ''; 
        }, 300);
    };

    clickableItems.forEach(item => {
        item.addEventListener('click', () => openModal(item));
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
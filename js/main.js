document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Bloquear Click Derecho (Modo Kiosco)
    document.addEventListener('contextmenu', event => event.preventDefault());

    // 2. Efecto visual simple en los enlaces
    const allLinks = document.querySelectorAll('a');
    allLinks.forEach(link => {
        link.addEventListener('touchstart', function() {
            this.style.opacity = "0.7";
        });
        link.addEventListener('touchend', function() {
            this.style.opacity = "1";
        });
    });

    // --- LÓGICA DE LA VENTANA MODAL ---
    
    const modal = document.getElementById('modal-info');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const closeBtn = document.querySelector('.btn-close');
    
    // AQUI ESTÁ EL CAMBIO: Ahora buscamos .item-galeria Y TAMBIÉN .card-personaje
    const clickableItems = document.querySelectorAll('.item-galeria, .card-personaje');

    function openModal(nombre, info, foto) {
        if(!modal) return; // Seguridad
        modalTitle.textContent = nombre;
        // Usamos innerHTML para que funcionen las negritas y saltos de linea
        modalDesc.innerHTML = info; 
        modalImg.src = foto;
        modal.classList.add('active');
    }

    function closeModal() {
        if(!modal) return;
        modal.classList.remove('active');
        setTimeout(() => { modalImg.src = ''; }, 300);
    }

    // Asignamos el evento click a todos los elementos encontrados
    clickableItems.forEach(item => {
        // Forzamos el cursor mano para asegurar que se ve clickeable
        item.style.cursor = 'pointer';

        item.addEventListener('click', function() {
            const nombre = this.getAttribute('data-nombre');
            const info = this.getAttribute('data-info');
            const foto = this.getAttribute('data-foto');

            openModal(nombre, info, foto);
        });
    });

    if(closeBtn) closeBtn.addEventListener('click', closeModal);

    if(modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }
});
document.addEventListener('DOMContentLoaded', async () => {

    // --- CORRECCIÓN DE RUTAS ---
    const cloudSVGs = [
        'assets/img/svg/cloud_rounded.svg',
        'assets/img/svg/cloud_elongated.svg',
        'assets/img/svg/cloud_nube1.svg',
        'assets/img/svg/cloud_nube2.svg',
        'assets/img/svg/cloud_nube3.svg',
        'assets/img/svg/cloud_nube4.svg'
    ];

    // --- Precargamos el contenido de los archivos SVG ---
    const loadedClouds = await Promise.all(
        cloudSVGs.map(url => fetch(url).then(res => res.text()).catch(e => {
            console.error('Error cargando SVG:', url, e);
            // Fallback SVG simple
            return '<svg viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg"><ellipse cx="25" cy="35" rx="25" ry="15"/><ellipse cx="45" cy="25" rx="30" ry="20"/><ellipse cx="70" cy="35" rx="25" ry="15"/></svg>';
        }))
    );

    // Variables para el parallax
    let stars = [];
    let clouds = [];

    window.onload = function () {
        createDynamicSky();
        setupParallax();
        window.addEventListener('resize', createDynamicSky);
    };

    function createDynamicSky() {
        const starContainer = document.getElementById('star-container');
        const cloudContainer = document.getElementById('cloud-layer');

        if (!starContainer || !cloudContainer) return;

        // Limpiar contenedores
        starContainer.innerHTML = '';
        cloudContainer.innerHTML = '';
        stars = [];
        clouds = [];

        const NUM_STARS = 200;
        const NUM_CLOUDS = 15;

        // --- GENERADOR DE ESTRELLAS ---
        for (let i = 0; i < NUM_STARS; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            
            // Posición aleatoria en pantalla
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            star.style.left = `${x}%`;
            star.style.top = `${y}%`;
            
            // Tamaño aleatorio
            const size = Math.random() * 3 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            
            // Animación de parpadeo
            star.style.animationDuration = `${Math.random() * 3 + 2}s`;
            star.style.animationDelay = `${Math.random() * 5}s`;
            
            starContainer.appendChild(star);
            
            // Guardamos referencia para parallax
            stars.push({
                element: star,
                originalY: y,
                speed: 0.2 // Velocidad de parallax para estrellas (más lento)
            });
        }

        // --- GENERADOR DE NUBES ---
        for (let i = 0; i < NUM_CLOUDS; i++) {
            const cloud = document.createElement('div');
            cloud.classList.add('parallax-cloud');
            
            // Posición aleatoria
            const x = Math.random() * 120 - 10; // Permite que salgan un poco de los bordes
            const y = Math.random() * 100;
            
            cloud.style.left = `${x}%`;
            cloud.style.top = `${y}%`;
            
            // Escala aleatoria
            const scale = Math.random() * 0.8 + 0.3;
            cloud.style.transform = `scale(${scale})`;
            
            // Opacidad aleatoria
            cloud.style.opacity = Math.random() * 0.4 + 0.2;
            
            // Ancho base
            cloud.style.width = '100px';
            
            // Animación de deriva
            cloud.style.animationDelay = `${Math.random() * 60}s`;
            cloud.style.animationDuration = `${Math.random() * 40 + 60}s`;
            
            // SVG aleatorio
            const randomCloudIndex = Math.floor(Math.random() * loadedClouds.length);
            if (loadedClouds[randomCloudIndex]) {
                cloud.innerHTML = loadedClouds[randomCloudIndex];
            }
            
            cloudContainer.appendChild(cloud);
            
            // Guardamos referencia para parallax
            clouds.push({
                element: cloud,
                originalY: y,
                speed: 0.5 // Velocidad de parallax para nubes (más rápido que estrellas)
            });
        }
    }

    function setupParallax() {
        const wrapper = document.querySelector('.wrapper');
        if (!wrapper) return;

        // Función para actualizar posiciones parallax
        function updateParallax() {
            const scrollTop = wrapper.scrollTop;
            const scrollPercent = scrollTop / (wrapper.scrollHeight - wrapper.clientHeight);
            
            // Actualizar estrellas
            stars.forEach(star => {
                const moveY = scrollTop * star.speed;
                const newY = star.originalY - (moveY / window.innerHeight * 100);
                star.element.style.top = `${newY}%`;
            });
            
            // Actualizar nubes
            clouds.forEach(cloud => {
                const moveY = scrollTop * cloud.speed;
                const newY = cloud.originalY - (moveY / window.innerHeight * 100);
                cloud.element.style.top = `${newY}%`;
            });
        }

        // Evento de scroll para parallax
        wrapper.addEventListener('scroll', updateParallax);
        
        // Llamar una vez para inicializar
        updateParallax();
    }

    // --- LÓGICA PARA LA ANIMACIÓN DE NUBES CORTINA ---
    const sections = document.querySelectorAll('section');
    const observerOptions = { 
        root: null, 
        rootMargin: '0px', 
        threshold: 0.4 
    };
    
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => sectionObserver.observe(section));

    // --- LÓGICA PARA EL MODAL DE DESCARGAS ---
    const downloadButton = document.getElementById('download-btn');
    const modalContainer = document.getElementById('modal-container');
    const closeModalButton = modalContainer?.querySelector('.close-modal');
    
    if (downloadButton && modalContainer) {
        downloadButton.addEventListener('click', () => {
            modalContainer.classList.add('visible');
        });
        
        if (closeModalButton) {
            closeModalButton.addEventListener('click', () => {
                modalContainer.classList.remove('visible');
            });
        }
        
        modalContainer.addEventListener('click', (e) => {
            if (e.target === modalContainer) {
                modalContainer.classList.remove('visible');
            }
        });
    }
});

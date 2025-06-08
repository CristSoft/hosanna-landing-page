document.addEventListener('DOMContentLoaded', () => {

    // --- PASO 1: Define el contenido de tus SVG directamente aquí ---
    // Pega el contenido de tus archivos SVG dentro de las comillas.
    // He puesto un SVG de ejemplo. Reemplázalo con los tuyos.
    const loadedClouds = [
        // assets/img/svg/cloud_rounded.svg
        `<svg viewBox="0 0 120 70" xmlns="http://www.w3.org/2000/svg"><path d="M110.7,35.3c-0.1-13.4-10.9-24.2-24.3-24.2c-4.9,0-9.4,1.5-13.2,4c-4.4-10.5-15.1-17.9-27.5-17.9c-16.5,0-29.8,13.4-29.8,29.8c0,2.1,0.2,4.2,0.6,6.2C7.3,34.8,0,42.9,0,52.8C0,62.3,7.7,70,17.2,70h86.2c9.5,0,17.2-7.7,17.2-17.2C120.5,45.8,116.5,38.6,110.7,35.3z"/></svg>`,
        // assets/img/svg/cloud_elongated.svg
        `<svg viewBox="0 0 150 50" xmlns="http://www.w3.org/2000/svg"><path d="M142.2,20.3c-0.1-8.9-7.3-16.1-16.2-16.1c-3.3,0-6.3,1-8.8,2.7c-2.9-7-10.1-11.9-18.3-11.9c-11,0-19.9,8.9-19.9,19.9c0,1.4,0.1,2.8,0.4,4.1C69.7,20.1,60.2,28.6,60.2,35.2c0,6.2,5.1,11.2,11.4,11.2h60.1c6.3,0,11.4-5,11.4-11.2C143.2,30.5,142.8,25.7,142.2,20.3z"/></svg>`,
        // Pega el contenido de cloud_nube1.svg aquí
        `<svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:rgb(255,255,255);stop-opacity:0.5" />
      <stop offset="100%" style="stop-color:rgb(173,216,230);stop-opacity:0.5" />
    </linearGradient>
  </defs>
  <path fill="url(#cloudGradient)" d="M0,42 Q5,45 10,42 Q10,36 20,39 Q30,18 45,24 Q60,15 75,24 Q85,30 100,42 Q98,51 85,54 Q75,60 60,60 Q40,60 20,57 Q5,54 0,48 Z" />
</svg>`,
        // Pega el contenido de cloud_nube2.svg aquí
        `<svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:rgb(255,255,255);stop-opacity:0.5" />
      <stop offset="100%" style="stop-color:rgb(173,216,230);stop-opacity:0.5" />
    </linearGradient>
  </defs>
  <path fill="url(#cloudGradient)" d="M10,60 Q5,60 10,57 Q20,36 30,39 Q40,18 60,24 Q75,27 85,39 Q100,51 95,60 L0,60 Z" />
</svg>`,
        // Pega el contenido de cloud_nube3.svg aquí
        `<svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:rgb(255,255,255);stop-opacity:0.5" />
      <stop offset="100%" style="stop-color:rgb(173,216,230);stop-opacity:0.5" />
    </linearGradient>
  </defs>
  <path fill="url(#cloudGradient)" d="M10,60 Q5,60 10,54 Q20,30 30,36 Q40,24 50,30 Q60,18 70,24 Q80,30 90,36 Q100,48 95,60 L0,60 Z" />
</svg>`,
        // Pega el contenido de cloud_nube4.svg aquí
        `<svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:rgb(255,255,255);stop-opacity:0.5" />
      <stop offset="100%" style="stop-color:rgb(173,216,230);stop-opacity:0.5" />
    </linearGradient>
  </defs>
  <path fill="url(#cloudGradient)" d="M10,60 Q5,60 15,54 Q20,24 35,30 Q50,12 65,27 Q80,36 85,42 Q100,51 95,60 L0,60 Z" />
</svg>`
    ];

    // --- PASO 2: El bloque `fetch` y `Promise.all` se elimina por completo. ---

    // Variables para el parallax
    let stars = [];
    let clouds = [];

    // --- PASO 3: Reestructurar el inicio ---
    // Ya no usamos window.onload, todo se ejecuta secuencialmente después de que el DOM esté listo.
    createDynamicSky();
    setupParallax();
    window.addEventListener('resize', createDynamicSky);


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

        // --- GENERADOR DE ESTRELLAS (sin cambios) ---
        for (let i = 0; i < NUM_STARS; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            star.style.left = `${x}%`;
            star.style.top = `${y}%`;
            const size = Math.random() * 3 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.animationDuration = `${Math.random() * 3 + 2}s`;
            star.style.animationDelay = `${Math.random() * 5}s`;
            starContainer.appendChild(star);
            stars.push({
                element: star,
                originalY: y,
                speed: 0.2
            });
        }

        // --- GENERADOR DE NUBES (ahora usa los SVG incrustados) ---
        for (let i = 0; i < NUM_CLOUDS; i++) {
            const cloud = document.createElement('div');
            cloud.classList.add('parallax-cloud');
            const x = Math.random() * 120 - 10;
            const y = Math.random() * 100;
            cloud.style.left = `${x}%`;
            cloud.style.top = `${y}%`;
            const scale = Math.random() * 0.8 + 0.3;
            cloud.style.transform = `scale(${scale})`;
            cloud.style.opacity = Math.random() * 0.4 + 0.2;
            cloud.style.width = '100px';
            cloud.style.animationDelay = `${Math.random() * 60}s`;
            cloud.style.animationDuration = `${Math.random() * 40 + 60}s`;

            // SVG aleatorio del array local (siempre disponible)
            const randomCloudIndex = Math.floor(Math.random() * loadedClouds.length);
            cloud.innerHTML = loadedClouds[randomCloudIndex];

            cloudContainer.appendChild(cloud);
            clouds.push({
                element: cloud,
                originalY: y,
                speed: 0.5
            });
        }
    }

    function setupParallax() {
        // (Esta función no necesita cambios)
        const wrapper = document.querySelector('.wrapper');
        if (!wrapper) return;

        function updateParallax() {
            const scrollTop = wrapper.scrollTop;
            stars.forEach(star => {
                const moveY = scrollTop * star.speed;
                const newY = star.originalY - (moveY / window.innerHeight * 100);
                star.element.style.top = `${newY}%`;
            });
            clouds.forEach(cloud => {
                const moveY = scrollTop * cloud.speed;
                const newY = cloud.originalY - (moveY / window.innerHeight * 100);
                cloud.element.style.top = `${newY}%`;
            });
        }
        wrapper.addEventListener('scroll', updateParallax);
        updateParallax();
    }

    // --- LÓGICA PARA LA ANIMACIÓN DE NUBES CORTINA (sin cambios) ---
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: document.querySelector('.wrapper'), // Optimizacion: observar dentro del scrollable
        rootMargin: '0px',
        threshold: 0.4
    };
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            } else {
                // Opcional: si quieres que la animación se repita al salir y volver a entrar
                // entry.target.classList.remove('section-visible');
            }
        });
    }, observerOptions);
    sections.forEach(section => sectionObserver.observe(section));


    // --- LÓGICA PARA EL MODAL DE DESCARGAS (sin cambios) ---
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
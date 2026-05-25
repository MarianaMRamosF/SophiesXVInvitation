let isPlaying = false;
let envelopeOpened = false;

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Lógica del Sobre y Apertura ---
    const envelopeBtn = document.getElementById('envelope-btn');
    const envelopeScreen = document.getElementById('envelope-screen');
    const mainInvitation = document.getElementById('main-invitation');
    const audioBtn = document.getElementById('audio-btn');
    const bgMusic = document.getElementById('bg-music');

    envelopeBtn.addEventListener('click', () => {
        if(envelopeOpened) return;
        envelopeOpened = true;

        // Iniciar música usando la etiqueta audio local
        if (bgMusic) {
            bgMusic.play().then(() => {
                isPlaying = true;
                audioBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
                audioBtn.classList.add('playing');
            }).catch(e => {
                console.log("El navegador bloqueó el autoplay", e);
            });
        }

        // 1. Animar el sobre abriéndose
        envelopeBtn.classList.add('open');

        // 2. Después de 1.5s, desvanecer la pantalla del sobre y mostrar la invitación
        setTimeout(() => {
            envelopeScreen.classList.add('fade-out');
            mainInvitation.classList.remove('hidden');
            document.body.classList.remove('locked');

            // Iniciar pétalos y revelar elementos
            startPetals();
            setTimeout(reveal, 100);

        }, 1500); // Esperar a que la animación CSS del sobre termine
    });

    // --- 2. Contador Regresivo (01/08/2026 19:00) ---
    const countDownDate = new Date("Aug 1, 2026 19:00:00").getTime();

    const timer = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerHTML = days < 10 ? "0" + days : days;
        document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours;
        document.getElementById("minutes").innerHTML = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;

        if (distance < 0) {
            clearInterval(timer);
            document.getElementById("countdown").innerHTML = "<h2 style='font-size:3rem;'>¡El momento ha llegado!</h2>";
        }
    }, 1000);

    // --- 3. Animaciones de Scroll (Reveal) ---
    function reveal() {
        const reveals = document.querySelectorAll(".reveal");
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            }
        }
    }
    window.addEventListener("scroll", reveal);

    // --- 4. Animación de Pétalos de Rosa (Desencadenado al abrir) ---
    const petalsContainer = document.getElementById('petals-container');
    const numberOfPetals = 150; 

    function createPetal() {
        const particle = document.createElement('div');
        particle.classList.add('petal-particle');
        
        const isRose = Math.random() > 0.8;
        
        if (isRose) {
            particle.classList.add('is-rose');
            particle.innerHTML = '<i class="fa-solid fa-rose"></i>';
            const scale = Math.random() * 1.5 + 1;
            particle.style.fontSize = `${scale}em`;
        } else {
            particle.classList.add('is-petal');
            const size = Math.random() * 20 + 13; 
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
        }
        
        const left = Math.random() * 100; 
        const duration = Math.random() * 8 + 6; 
        
        particle.style.left = `${left}vw`;
        particle.style.animationDuration = `${duration}s`;
        
        const drift = (Math.random() - 0.5) * 200; 
        particle.style.setProperty('--fall-x', `${drift}px`);

        petalsContainer.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
        
        return particle;
    }

    function startPetals() {
        for (let i = 0; i < numberOfPetals; i++) {
            setTimeout(() => {
                const p = createPetal();
                p.classList.add('falling');
            }, Math.random() * 5000); 
        }

        setInterval(() => {
            const p = createPetal();
            p.classList.add('falling');
        }, 200); 
    }

    // --- 5. Control de Audio ---
    audioBtn.addEventListener('click', () => {
        if (!bgMusic) return;

        if (isPlaying) {
            bgMusic.pause();
            audioBtn.innerHTML = '<i class="fa-solid fa-music"></i>';
            audioBtn.classList.remove('playing');
        } else {
            bgMusic.play();
            audioBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            audioBtn.classList.add('playing');
        }
        isPlaying = !isPlaying;
    });

    // --- 6. Modal de Código de Vestimenta ---
    const dressCodeCard = document.getElementById('dress-code-card');
    const dressModal = document.getElementById('dress-modal');
    const closeModal = document.getElementById('close-modal');

    dressCodeCard.addEventListener('click', () => {
        dressModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; 
    });

    closeModal.addEventListener('click', () => {
        dressModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    });

    dressModal.addEventListener('click', (e) => {
        if (e.target === dressModal) {
            dressModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });
});

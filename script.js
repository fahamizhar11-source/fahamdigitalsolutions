/* =========================
   FORCE HIDE PRELOADER
========================= */
function removePreloader() {
    const preloader = document.getElementById("preloader");
    if (preloader && preloader.style.display !== "none") {
        preloader.style.opacity = "0";
        preloader.style.pointerEvents = "none";
        setTimeout(() => {
            preloader.style.display = "none";
        }, 500);
    }
}

window.addEventListener("load", () => {
    setTimeout(removePreloader, 800);
});
setTimeout(removePreloader, 1200);

/* =========================
   YEAR & SCROLL PROGRESS BAR
========================= */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const scrollProgress = document.getElementById("scrollProgress");
window.addEventListener("scroll", () => {
    if (scrollProgress) {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        scrollProgress.style.width = `${progress}%`;
    }
});

/* =========================
   CUSTOM RING & DOT CURSOR WITH MAGNETIC HOVER
========================= */
document.addEventListener("DOMContentLoaded", () => {
    let dot = document.querySelector(".custom-cursor-dot");
    let ring = document.querySelector(".custom-cursor-ring");

    if (!dot) {
        dot = document.createElement("div");
        dot.classList.add("custom-cursor-dot");
        document.body.appendChild(dot);
    }

    if (!ring) {
        ring = document.createElement("div");
        ring.classList.add("custom-cursor-ring");
        document.body.appendChild(ring);
    }

    let cursorX = 0, cursorY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener("mousemove", (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
        dot.style.left = cursorX + "px";
        dot.style.top = cursorY + "px";
    });

    function animateRing() {
        ringX += (cursorX - ringX) * 0.15;
        ringY += (cursorY - ringY) * 0.15;
        ring.style.left = ringX + "px";
        ring.style.top = ringY + "px";
        requestAnimationFrame(animateRing);
    }
    animateRing();

    const hoverables = document.querySelectorAll("a, button, .btn, .project-card, .skill-card, .profile-card");
    hoverables.forEach((el) => {
        el.addEventListener("mouseenter", () => ring.classList.add("active"));
        el.addEventListener("mouseleave", () => ring.classList.remove("active"));
    });
});

/* =========================
   CURSOR GLOW & SPOTLIGHT
========================= */
const cursorGlow = document.getElementById("cursorGlow");
let mouseX = 0, mouseY = 0;

document.addEventListener("mousemove", function (event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
    if (cursorGlow) {
        cursorGlow.style.left = mouseX + "px";
        cursorGlow.style.top = mouseY + "px";
    }
});

/* =========================
   CLICK RIPPLE EFFECT
========================= */
document.addEventListener("click", function (e) {
    const ripple = document.createElement("div");
    ripple.classList.add("ripple-effect");
    ripple.style.left = e.clientX + "px";
    ripple.style.top = e.clientY + "px";
    document.body.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
});

/* =========================
   PERFECT MAGNETIC BUTTONS (FIXED)
========================= */
document.addEventListener("DOMContentLoaded", () => {
    const magButtons = document.querySelectorAll(".btn, .magnetic-btn");

    magButtons.forEach((btn) => {
        btn.addEventListener("mousemove", (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - (rect.left + rect.width / 2);
            const y = e.clientY - (rect.top + rect.height / 2);

            btn.style.transition = "transform 0.1s ease-out";
            btn.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px) scale(1.05)`;
        });

        btn.addEventListener("mouseleave", () => {
            btn.style.transition = "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
            btn.style.transform = "translate(0px, 0px) scale(1)";
        });
    });
});

/* =========================
   HERO TYPEWRITER EFFECT
========================= */
const typewriterElement = document.getElementById("typewriter");
if (typewriterElement) {
    const phrases = ["AI Creator", "Web Designer", "Graphic Designer", "Digital Creator"];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }

        setTimeout(typeEffect, typeSpeed);
    }
    typeEffect();
}

/* =========================
   PARALLAX 3D TILT & GLOW BORDER TRACE
========================= */
document.addEventListener("DOMContentLoaded", () => {
    const shineCards = document.querySelectorAll(".shine-effect, .skill-card, .about-card, .project-card, .contact-card");

    shineCards.forEach((card) => {
        card.classList.add("glow-border-card");

        let borderAngle = 0;
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty("--shine-x", `${x}px`);
            card.style.setProperty("--shine-y", `${y}px`);
            card.style.setProperty("--glow-x", `${x}px`);
            card.style.setProperty("--glow-y", `${y}px`);

            // Parallax Depth 3D calculation
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;

            // Animated Border Angle Calculation
            borderAngle = (Math.atan2(y - centerY, x - centerX) * 180) / Math.PI + 90;
            card.style.setProperty("--border-angle", `${borderAngle}deg`);
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
        });
    });
});

/* =========================
   IMAGE POPUP
========================= */
const imagePopup = document.getElementById("imagePopup");
const popupImage = document.getElementById("popupImage");

function openImage(imagePath) {
    if (popupImage && imagePopup) {
        popupImage.src = imagePath;
        imagePopup.classList.add("active");
        document.body.style.overflow = "hidden";
    }
}

function closeImage() {
    if (imagePopup) {
        imagePopup.classList.remove("active");
        document.body.style.overflow = "";
    }
}

if (imagePopup) {
    imagePopup.addEventListener("click", function (event) {
        if (event.target === imagePopup) {
            closeImage();
        }
    });
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeImage();
    }
});

/* =========================
   SCROLL REVEAL OBSERVER
========================= */
const revealElements = document.querySelectorAll(
    ".section-title, .about-card, .skill-card, .project-card, .contact-card"
);

const observer = new IntersectionObserver(
    function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    },
    { threshold: 0.15 }
);

revealElements.forEach(function (element) {
    observer.observe(element);
});

/* =========================
   SPIDER WEB PARTICLES CANVAS
========================= */
const canvas = document.getElementById("particles-canvas");
if (canvas) {
    const ctx = canvas.getContext("2d");
    let particlesArray = [];

    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    const mouse = { x: null, y: null, radius: 150 };

    window.addEventListener("mousemove", (event) => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    });

    window.addEventListener("mouseleave", () => {
        mouse.x = null;
        mouse.y = null;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.vx = (Math.random() - 0.5) * 1.2;
            this.vy = (Math.random() - 0.5) * 1.2;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(96, 165, 250, 0.8)";
            ctx.fill();
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

            if (mouse.x != null && mouse.y != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    let force = (mouse.radius - distance) / mouse.radius;
                    this.x += (dx / distance) * force * 3;
                    this.y += (dy / distance) * force * 3;
                }
            }
        }
    }

    function init() {
        particlesArray = [];
        const numberOfParticles = Math.floor((canvas.width * canvas.height) / 9000);
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }
    init();

    function connect() {
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let dx = particlesArray[a].x - particlesArray[b].x;
                let dy = particlesArray[a].y - particlesArray[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 110) {
                    let opacity = 1 - distance / 110;
                    ctx.strokeStyle = `rgba(139, 92, 246, ${opacity * 0.4})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }

            if (mouse.x != null && mouse.y != null) {
                let dx = particlesArray[a].x - mouse.x;
                let dy = particlesArray[a].y - mouse.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    let opacity = 1 - distance / mouse.radius;
                    ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.6})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        connect();
        requestAnimationFrame(animate);
    }
    animate();
}

/* =========================
   CUSTOM MP3 CLICK SOUND
========================= */
const clickAudio = new Audio('audio.WAV');

function playClickSound() {
    clickAudio.currentTime = 0;
    clickAudio.volume = 0.2;
    clickAudio.play().catch(e => console.log("Audio play blocked"));
}

document.addEventListener("DOMContentLoaded", () => {
    const clickableElements = document.querySelectorAll("a, button, .btn, .project-card, .profile-card");
    clickableElements.forEach((element) => {
        element.addEventListener("click", playClickSound);
    });
});

/* =========================
   TEXT SCRAMBLE EFFECT
========================= */
document.addEventListener("DOMContentLoaded", () => {
    const scrambleElements = document.querySelectorAll(".section-title, .skill-card h3, .project-info h3");
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$@%";

    scrambleElements.forEach(element => {
        element.classList.add("scramble-text");
        const originalText = element.innerText;

        element.addEventListener("mouseenter", () => {
            let iteration = 0;
            clearInterval(element.interval);

            element.interval = setInterval(() => {
                element.innerText = originalText
                    .split("")
                    .map((char, index) => {
                        if (index < iteration) {
                            return originalText[index];
                        }
                        return letters[Math.floor(Math.random() * letters.length)];
                    })
                    .join("");

                if (iteration >= originalText.length) {
                    clearInterval(element.interval);
                }

                iteration += 1 / 2;
            }, 30);
        });

        element.addEventListener("mouseleave", () => {
            clearInterval(element.interval);
            element.innerText = originalText;
        });
    });
});








/* =========================
   PORTAL WIPE SMOOTH SCROLL (NO BACKGROUND SCROLL VISIBILITY)
========================= */
document.addEventListener("DOMContentLoaded", () => {
    let portalWipe = document.getElementById("portal-wipe");
    
    if (!portalWipe) {
        portalWipe = document.createElement("div");
        portalWipe.id = "portal-wipe";
        portalWipe.classList.add("portal-wipe");
        document.body.appendChild(portalWipe);
    }

    const navLinks = document.querySelectorAll('nav a[href^="#"], .hero-buttons a[href^="#"]');

    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href");
            
            if (targetId && targetId !== "#" && targetId.startsWith("#")) {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();

                    // Background Scroll Lock (Ye peeche ka scroll movement chhupa dega)
                    document.body.style.overflow = "hidden";
                    document.documentElement.style.scrollBehavior = "auto"; 

                    // Trigger Portal Wipe
                    portalWipe.classList.remove("active");
                    void portalWipe.offsetWidth; // Force Reflow
                    portalWipe.classList.add("active");

                    // Transition ke peak point par position instantly change hogi
                    setTimeout(() => {
                        targetElement.scrollIntoView({
                            behavior: "auto" // Auto se instanly jump hoga bina wipe ke peeche scroll dikhe
                        });
                    }, 400);

                    // Wipe khatam hone par normal scroll unlock kar do
                    setTimeout(() => {
                        portalWipe.classList.remove("active");
                        document.body.style.overflow = "";
                        document.documentElement.style.scrollBehavior = "smooth";
                    }, 800);
                }
            }
        });
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const openBtns = document.querySelectorAll(".open-contact-btn");
    const closeBtn = document.getElementById("closeContactModal");
    const modal = document.getElementById("contactModal");

    openBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            if (modal) modal.classList.add("active");
        });

        btn.addEventListener("mousemove", (e) => {
            const position = btn.getBoundingClientRect();
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener("mouseleave", () => {
            btn.style.transform = "translate(0px, 0px)";
        });
    });

    if (closeBtn && modal) {
        closeBtn.addEventListener("click", () => modal.classList.remove("active"));
    }

    window.addEventListener("click", (e) => {
        if (e.target === modal) modal.classList.remove("active");
    });
});



// Contact Popup Modal Toggle
document.addEventListener("DOMContentLoaded", () => {
    const openBtns = document.querySelectorAll(".open-contact-btn");
    const closeBtn = document.getElementById("closeContactModal");
    const modal = document.getElementById("contactModal");

    openBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            if (modal) modal.classList.add("active");
        });
    });

    if (closeBtn && modal) {
        closeBtn.addEventListener("click", () => modal.classList.remove("active"));
    }

    window.addEventListener("click", (e) => {
        if (e.target === modal) modal.classList.remove("active");
    });
});


/* =========================================
   EMAIL BUTTON MAGNETIC HOVER EFFECT
========================================= */
document.addEventListener("DOMContentLoaded", () => {
    const emailBtns = document.querySelectorAll(".open-contact-btn, .open-modal-btn");

    emailBtns.forEach((btn) => {
        btn.addEventListener("mousemove", (e) => {
            const position = btn.getBoundingClientRect();
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;

            // Move the button slightly towards cursor
            btn.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
        });

        btn.addEventListener("mouseleave", () => {
            // Reset position smoothly on mouse leave
            btn.style.transform = "translate(0px, 0px)";
        });
    });
});


// Email Popup Click Handler
document.addEventListener("DOMContentLoaded", () => {
    // Page par maujood saare Email Open Buttons ko select karein
    const openBtns = document.querySelectorAll(".open-contact-btn, .open-modal-btn, #emOpenModalBtn");
    const closeBtn = document.getElementById("closeContactModal") || document.getElementById("emCloseModalBtn");
    const modal = document.getElementById("contactModal") || document.getElementById("emContactModal");

    // Open Modal Event
    openBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault(); // Default link/form reload rokein
            if (modal) {
                modal.classList.add("active");
            }
        });
    });

    // Close Modal Event (X Button)
    if (closeBtn && modal) {
        closeBtn.addEventListener("click", () => {
            modal.classList.remove("active");
        });
    }

    // Overlay par bahar click karne se close ho
    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("active");
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("bg-audio");
    const equalizer = document.getElementById("equalizer");

    // Audio play karne ka function
    function playAudio() {
        audio.play().then(() => {
            equalizer.classList.add("playing");
        }).catch((error) => {
            console.log("Autoplay blocked by browser. Waiting for user interaction.");
            equalizer.classList.remove("playing");
        });
    }

    // Audio pause karne ka function
    function pauseAudio() {
        audio.pause();
        equalizer.classList.remove("playing");
    }

    // 1. Website khulte hi audio play karne ki koshish
    playAudio();

    // 2. Agar browser autoplay block kare, toh screen par kahin bhi pehle click/tap par play ho jaye
    const handleFirstInteraction = () => {
        if (audio.paused) {
            playAudio();
        }
        // Ek baar interaction ho jaye toh listeners remove kar do
        document.removeEventListener("click", handleFirstInteraction);
        document.removeEventListener("keydown", handleFirstInteraction);
    };

    document.addEventListener("click", handleFirstInteraction);
    document.addEventListener("keydown", handleFirstInteraction);

    // 3. Equalizer button click handling (Play / Pause Toggle)
    equalizer.addEventListener("click", (e) => {
        // First interaction listener ko stop karo taake conflict na ho
        e.stopPropagation();

        if (audio.paused) {
            playAudio();
        } else {
            pauseAudio();
        }
    });
});


// Mouse Click Shockwave Ripple Effect
document.addEventListener('click', (e) => {
    const shock = document.createElement('div');
    shock.className = 'shockwave';
    shock.style.left = `${e.clientX}px`;
    shock.style.top = `${e.clientY}px`;
    document.body.appendChild(shock);

    setTimeout(() => { shock.remove(); }, 600);
});



// Live FPS Counter
let times = [];
let fpsEl = document.getElementById('fpsCounter');

function refreshFPS() {
    window.requestAnimationFrame(() => {
        const now = performance.now();
        while (times.length > 0 && times[0] <= now - 1000) {
            times.shift();
        }
        times.push(now);
        if (fpsEl) fpsEl.innerText = times.length;
        refreshFPS();
    });
}
refreshFPS();





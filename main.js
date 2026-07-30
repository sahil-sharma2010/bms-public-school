document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Page Loader
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }, 1000);

    // 2. Initialize AOS (Scroll Animations)
    AOS.init({ duration: 1000, once: true, offset: 50, easing: 'ease-out-cubic' });

    // 3. GSAP Advanced Entrance
    gsap.from(".g-title", { duration: 1.2, y: 30, opacity: 0, ease: "power4.out", delay: 0.2 });

    // 4. Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.custom-cursor-follower');
    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
        setTimeout(() => {
            follower.style.transform = `translate3d(${e.clientX - 20}px, ${e.clientY - 20}px, 0)`;
        }, 50);
    });

    document.querySelectorAll('a, button, .btn').forEach(el => {
        el.addEventListener('mouseenter', () => follower.style.transform += ' scale(1.5)');
        el.addEventListener('mouseleave', () => follower.style.transform = follower.style.transform.replace(' scale(1.5)', ''));
    });

    // 5. Button Ripple Effect
    document.querySelectorAll('.btn-ripple').forEach(button => {
        button.addEventListener('click', function(e) {
            let x = e.clientX - e.target.getBoundingClientRect().left;
            let y = e.clientY - e.target.getBoundingClientRect().top;
            let ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // 6. Transparent to Glass Navbar
    const navbar = document.getElementById('navbar');
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
            backToTop.classList.add('show');
        } else {
            navbar.classList.remove('scrolled');
            backToTop.classList.remove('show');
        }
    });

    // 7. Dark/Light Mode with Wave Color Sync
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const waveShape = document.querySelector('.shape-fill');
    
    themeToggle.addEventListener('click', () => {
        if (html.getAttribute('data-theme') === 'light') {
            html.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
        } else {
            html.setAttribute('data-theme', 'light');
            themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }
    });

    // 8. Animated Counters
    const counters = document.querySelectorAll('.counter');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const updateCount = () => {
                    const count = +counter.innerText;
                    const inc = target / 100;
                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(counter);
            }
        });
    });
    counters.forEach(counter => observer.observe(counter));

    // 9. Particles.js (Gold Theme Network)
    if(document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 50 },
                "color": { "value": "#D4AF37" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.3 },
                "size": { "value": 3 },
                "line_linked": { "enable": true, "distance": 150, "color": "#D4AF37", "opacity": 0.2, "width": 1 },
                "move": { "enable": true, "speed": 1.5 }
            },
            "interactivity": { "events": { "onhover": { "enable": true, "mode": "grab" } } }
        });
    }

    // 10. Mouse Parallax for Hero Elements
    document.addEventListener("mousemove", parallax);
    function parallax(e) {
        document.querySelectorAll(".float-card").forEach(function(move) {
            var moving_value = move.getAttribute("data-speed");
            var x = (e.clientX * moving_value) / 100;
            var y = (e.clientY * moving_value) / 100;
            move.style.transform = "translateX(" + x + "px) translateY(" + y + "px)";
        });
    }
});

// 11. Premium SweetAlert2 Popup Example
function showPremiumAlert() {
    Swal.fire({
        title: 'Admissions Open 2026-27',
        text: "Are you ready to join the leaders of tomorrow?",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#D4AF37',
        cancelButtonColor: '#0B1B3D',
        confirmButtonText: 'Yes, Apply Now!',
        background: document.documentElement.getAttribute('data-theme') === 'dark' ? '#0B1B3D' : '#fff',
        color: document.documentElement.getAttribute('data-theme') === 'dark' ? '#fff' : '#000'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Success!',
                text: 'Redirecting to Admission Portal...',
                icon: 'success',
                confirmButtonColor: '#D4AF37'
            });
        }
    });
}
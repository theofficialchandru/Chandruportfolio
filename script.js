
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav-links');
        const navLinks = document.querySelectorAll('.nav-links li');

        function toggleMenu() {
            nav.classList.toggle('active');
            burger.classList.toggle('toggle');

            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
                link.classList.toggle('fade-in');
            });
        }

        burger.addEventListener('click', toggleMenu);

        // Close mobile menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });

        function handleScroll() {
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const isVisible = (rect.top <= window.innerHeight * 0.75) && (rect.bottom >= 0);
                if (isVisible) {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }
            });
        }

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('load', handleScroll);

        const darkModeToggle = document.querySelector('.dark-mode-toggle');
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
        });

        // Add this new function for smooth scrolling
        function smoothScroll(target, duration) {
            const targetElement = document.querySelector(target);
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            let startTime = null;

            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }

            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }

            requestAnimationFrame(animation);
        }

        // Add smooth scrolling to nav links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                smoothScroll(this.getAttribute('href'), 1000);
            });
        });


        // <script>
        const roles = [
            "Software Developer",
            "Data Analyst",
            "Freelancer",
            "Web Developer"
        ];

        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingText = document.getElementById("typing-text");

        function typeEffect() {
            const currentRole = roles[roleIndex];
            
            if (!isDeleting) {
                typingText.textContent = currentRole.slice(0, charIndex++);
                if (charIndex > currentRole.length) {
                    setTimeout(() => isDeleting = true, 1200);
                }
            } else {
                typingText.textContent = currentRole.slice(0, charIndex--);
                if (charIndex === 0) {
                    isDeleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                }
            }
            setTimeout(typeEffect, isDeleting ? 60 : 100);
        }

        typeEffect();
        // </script>


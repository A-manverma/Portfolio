 /* ========================== TYPED TEXT ANIMATION ========================== */
        const texts = [
            "Welcome to my portfolio!",
            "Passionate about building web & software products.",
            "Final Year BTech Student - Aspiring Software Engineer.",
            "Interested in startups & tech for impact."
        ];
        let count = 0;
        let i = 0;
        let txt = '';
        let deleting = false;

        function typeEffect() {
            const display = document.getElementById('typed');
            if (!deleting && i < texts[count].length) {
                txt += texts[count][i++];
                display.innerHTML = txt + '<span style="opacity:0.6;animation:blink 0.7s infinite;">|</span>';
                setTimeout(typeEffect, 80); // Slower typing for better readability
            } else if (!deleting && i === texts[count].length) {
                setTimeout(() => { deleting = true; typeEffect(); }, 2000); // Longer pause
            } else if (deleting && i > 0) {
                txt = txt.slice(0, --i);
                display.innerHTML = txt + '<span style="opacity:0.6;animation:blink 0.7s infinite;">|</span>';
                setTimeout(typeEffect, 40); // Faster delete
            } else {
                deleting = false;
                count = (count + 1) % texts.length;
                setTimeout(typeEffect, 500); // Shorter switch delay
            }
        }
        typeEffect();

        /* ========================== HAMBURGER DRAWER LOGIC ========================== */
        const drawer = document.getElementById('sideDrawer');
        const drawerBG = document.getElementById('drawerBG');
        const hamburger = document.getElementById('hamburger-btn');
        const closeDrawerBtn = document.getElementById('closeDrawerBtn');

        hamburger.addEventListener('click', () => {
            drawer.classList.add('open');
            drawerBG.classList.add('open');
            document.body.classList.add('drawer-open');
        });

        function closeDrawer() {
            drawer.classList.remove('open');
            drawerBG.classList.remove('open');
            document.body.classList.remove('drawer-open');
        }

        closeDrawerBtn.addEventListener('click', closeDrawer);
        drawerBG.addEventListener('click', closeDrawer);

        /* ========================== THEME TOGGLE ========================== */
        const toggleButtons = document.querySelectorAll('.theme-toggle');
        const body = document.body;

        function setTheme(theme) {
            body.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            toggleButtons.forEach(btn => btn.innerHTML = theme === 'dark' ? '&#x1F31E;' : '&#x1F319;');
        }

        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

        toggleButtons.forEach(btn => btn.addEventListener('click', () => {
            setTheme(body.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
        }));

        // Listen for system theme changes if no user preference saved
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (!localStorage.getItem('theme')) {
                setTheme(e.matches ? 'dark' : 'light');
            }
        });

        /* ========================== SCROLL TO TOP BUTTON ========================== */
        const scrollTopBtn = document.getElementById('scrollTopBtn');

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
        });

        /* ========================== STAGGERED SMOOTH SCROLL ANIMATIONS ========================== */
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const section = entry.target;
                    const h2 = section.querySelector('h2');
                    const cards = Array.from(section.querySelectorAll('.animate-on-scroll'));
                    
                    // Animate h2 first
                    if (h2) {
                        setTimeout(() => h2.classList.add('animated'), 100);
                    }
                    
                    // Stagger cards
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animated');
                        }, 200 + (index * 150)); // Start after h2, 150ms stagger
                    });
                    
                    observer.unobserve(section);
                }
            });
        }, observerOptions);

        const sections = document.querySelectorAll('section');
        sections.forEach(section => observer.observe(section));
    


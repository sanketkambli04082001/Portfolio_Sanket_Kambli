// Typed.js animation
var typed = new Typed('#element', {
    strings: ['Python Developer', 'Web Developer', 'Full Stack Developer'],
    typeSpeed: 50,
    loop: true,
    backSpeed: 25,
});

// All other JS logic should be inside DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {

    // --- On-scroll animations with Intersection Observer ---
    const animatedElements = document.querySelectorAll('.about_card, .skills-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                if (entry.target.classList.contains('skills-card')) {
                    document.querySelectorAll('.progress-bar-fill').forEach(bar => {
                        bar.style.width = bar.getAttribute('data-width');
                    });
                }
            } else {
                entry.target.classList.remove('is-visible');
                if (entry.target.classList.contains('skills-card')) {
                    document.querySelectorAll('.progress-bar-fill').forEach(bar => {
                        bar.style.width = '0';
                    });
                }
            }
        });
    }, { threshold: 0.1 });
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // --- Settings Panel Logic (All-in-One) ---
    const settingsBtn = document.getElementById('settings-btn');
    const settingsPanel = document.getElementById('settings-panel');
    const closeSettingsBtn = document.getElementById('close-settings-btn');
    const animationToggleBtn = document.getElementById('animation-toggle-btn');
    const animationToggleIcon = document.getElementById('animation-toggle-icon');
    const themeButtons = document.querySelectorAll('.theme-btn');
    const body = document.body;

    // --- Logic to OPEN the panel ---
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            settingsPanel.classList.add('is-open');
            settingsBtn.classList.add('is-active'); // Spin the gear
        });
    }

    // --- Logic to CLOSE the panel ---
    function closeSettingsPanel() {
        settingsPanel.classList.remove('is-open');
        settingsBtn.classList.remove('is-active'); // Spin the gear back
    }

    // Close when clicking the 'X' button
    if (closeSettingsBtn) {
        closeSettingsBtn.addEventListener('click', closeSettingsPanel);
    }
    
    // Close when clicking outside the panel
    document.addEventListener('click', (event) => {
        const isClickOutside = !settingsPanel.contains(event.target) && !settingsBtn.contains(event.target);
        if (settingsPanel.classList.contains('is-open') && isClickOutside) {
            closeSettingsPanel();
        }
    });

    // --- Logic for the ANIMATION TOGGLE button ---
    if (animationToggleBtn) {
        animationToggleBtn.addEventListener('click', () => {
            body.classList.toggle('animations-off');
            animationToggleIcon.classList.toggle('fa-toggle-on');
            animationToggleIcon.classList.toggle('fa-toggle-off');
            
            if (body.classList.contains('animations-off')) {
                localStorage.setItem('animations', 'off');
            } else {
                localStorage.setItem('animations', 'on');
            }
        });
    }

    // --- Logic for the THEME SWITCHER buttons ---
    if (themeButtons.length > 0) {
        themeButtons.forEach(btn => {
            btn.addEventListener('click', (event) => {
                const themeName = event.currentTarget.dataset.theme;
                body.setAttribute('data-theme', themeName);
                localStorage.setItem('theme', themeName);

                const currentActiveButton = document.querySelector('.theme-btn.active');
                if (currentActiveButton) {
                    currentActiveButton.classList.remove('active');
                }
                event.currentTarget.classList.add('active');
            });
        });
    }
    
    // --- Function to load settings when the page first loads ---
    function loadSettings() {
        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            body.setAttribute('data-theme', savedTheme);
            const currentActiveButton = document.querySelector('.theme-btn.active');
            if (currentActiveButton) {
                currentActiveButton.classList.remove('active');
            }
            const newActiveButton = document.querySelector(`.theme-btn[data-theme="${savedTheme}"]`);
            if (newActiveButton) {
                newActiveButton.classList.add('active');
            }

        } else {
            document.querySelector('.theme-btn[data-theme="default"]').classList.add('active');
        }

        // Load saved animation preference
        const savedAnimations = localStorage.getItem('animations');
        if (savedAnimations === 'off') {
            body.classList.add('animations-off');
            animationToggleIcon.classList.add('fa-toggle-off');
            animationToggleIcon.classList.remove('fa-toggle-on');
        }
    }

    // Run the function to apply saved settings as soon as the page is ready
    loadSettings();

    // --- Interactive Image Hover Logic (RESTORED) ---
    const imgDefault = document.getElementById('img-default');
    const imgWhoAmI = document.getElementById('img-who-am-i');
    const imgWhatIDo = document.getElementById('img-what-i-do');
    const imgPhilosophy = document.getElementById('img-philosophy');
    
    const hoverWhoAmI = document.getElementById('hover-who-am-i');
    const hoverWhatIDo = document.getElementById('hover-what-i-do');
    const hoverPhilosophy = document.getElementById('hover-philosophy');
    const aboutTextContainer = document.querySelector('.about_text-container');

    function setActiveImage(activeImg) {
        if(imgDefault) imgDefault.style.opacity = '0';
        if(imgWhoAmI) imgWhoAmI.style.opacity = '0';
        if(imgWhatIDo) imgWhatIDo.style.opacity = '0';
        if(imgPhilosophy) imgPhilosophy.style.opacity = '0';
        
        if(activeImg) activeImg.style.opacity = '1';
    }

    if(hoverWhoAmI) hoverWhoAmI.addEventListener('mouseenter', () => setActiveImage(imgWhoAmI));
    if(hoverWhatIDo) hoverWhatIDo.addEventListener('mouseenter', () => setActiveImage(imgWhatIDo));
    if(hoverPhilosophy) hoverPhilosophy.addEventListener('mouseenter', () => setActiveImage(imgPhilosophy));
    
    if(aboutTextContainer) aboutTextContainer.addEventListener('mouseleave', () => setActiveImage(imgDefault));
    
});


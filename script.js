/*====================================================
    Dr. Wali Zeb Khan Portfolio
    script.js - Part 1
=====================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=========================================
        SELECT ELEMENTS
    =========================================*/

    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links a");
    const header = document.querySelector("header");
    const sections = document.querySelectorAll("section");

    /*=========================================
        MOBILE MENU
    =========================================*/

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", () => {

            navLinks.classList.toggle("active");

            const icon = menuBtn.querySelector("i");

            if (icon) {

                if (navLinks.classList.contains("active")) {

                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");

                } else {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                }

            }

        });

        navItems.forEach(item => {

            item.addEventListener("click", () => {

                navLinks.classList.remove("active");

                const icon = menuBtn.querySelector("i");

                if (icon) {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                }

            });

        });

    }

    /*=========================================
        STICKY NAVBAR
    =========================================*/

    function stickyNavbar() {

        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    stickyNavbar();

    window.addEventListener("scroll", stickyNavbar);

    /*=========================================
        SMOOTH SCROLLING
    =========================================*/

    navItems.forEach(link => {

        link.addEventListener("click", function (e) {

            const targetID = this.getAttribute("href");

            if (!targetID.startsWith("#")) return;

            e.preventDefault();

            const target = document.querySelector(targetID);

            if (!target) return;

            window.scrollTo({

                top: target.offsetTop - 90,

                behavior: "smooth"

            });

        });

    });

    /*=========================================
        ACTIVE NAVIGATION
    =========================================*/

    function updateActiveLink() {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 140;
            const height = section.offsetHeight;

            if (window.scrollY >= top &&
                window.scrollY < top + height) {

                current = section.getAttribute("id");

            }

        });

        navItems.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    }

    updateActiveLink();

    window.addEventListener("scroll", updateActiveLink);

    /*=========================================
        BACK TO TOP BUTTON
    =========================================*/

    const backTop = document.createElement("div");

    backTop.className = "back-top";

    backTop.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';

    document.body.appendChild(backTop);

    function toggleBackTop() {

        if (window.scrollY > 500) {

            backTop.classList.add("show");

        } else {

            backTop.classList.remove("show");

        }

    }

    toggleBackTop();

    window.addEventListener("scroll", toggleBackTop);

    backTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

    /*=========================================
        ESC KEY CLOSES MOBILE MENU
    =========================================*/

    document.addEventListener("keydown", e => {

        if (e.key === "Escape") {

            navLinks.classList.remove("active");

            const icon = menuBtn.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        }

    });

    /*=========================================
        CLOSE MENU WHEN CLICKING OUTSIDE
    =========================================*/

    document.addEventListener("click", e => {

        if (
            navLinks &&
            menuBtn &&
            !navLinks.contains(e.target) &&
            !menuBtn.contains(e.target)
        ) {

            navLinks.classList.remove("active");

            const icon = menuBtn.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        }

    });

});

/*====================================================
    script.js - Part 2
    Dark Mode • Scroll Reveal
    Skill Bars • Counters
=====================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=========================================
        DARK MODE
    =========================================*/

    const body = document.body;

    let darkToggle = document.querySelector(".dark-toggle");

    if (!darkToggle) {

        darkToggle = document.createElement("button");

        darkToggle.className = "dark-toggle";

        darkToggle.innerHTML =
            '<i class="fa-solid fa-moon"></i>';

        document.body.appendChild(darkToggle);

    }

    function enableDarkMode() {

        body.classList.add("dark");

        localStorage.setItem("theme", "dark");

        darkToggle.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

    }

    function disableDarkMode() {

        body.classList.remove("dark");

        localStorage.setItem("theme", "light");

        darkToggle.innerHTML =
            '<i class="fa-solid fa-moon"></i>';

    }

    if (localStorage.getItem("theme") === "dark") {

        enableDarkMode();

    }

    darkToggle.addEventListener("click", () => {

        if (body.classList.contains("dark")) {

            disableDarkMode();

        } else {

            enableDarkMode();

        }

    });

    /*=========================================
        SCROLL REVEAL
    =========================================*/

    const revealElements = document.querySelectorAll(

        "section, .card, .publication, .project-card, .timeline-item"

    );

    revealElements.forEach(el => {

        el.classList.add("fade-up");

    });

    const revealObserver = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                }

            });

        },

        {

            threshold:0.15

        }

    );

    revealElements.forEach(el => {

        revealObserver.observe(el);

    });

    /*=========================================
        SKILL BAR ANIMATION
    =========================================*/

    const bars = document.querySelectorAll(".progress-bar");

    const skillObserver = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const bar = entry.target;

                const width = bar.dataset.width || bar.style.width;

                bar.style.width = "0";

                setTimeout(() => {

                    bar.style.width = width;

                },150);

                skillObserver.unobserve(bar);

            });

        },

        {

            threshold:.4

        }

    );

    bars.forEach(bar => {

        if (!bar.dataset.width) {

            bar.dataset.width =

                getComputedStyle(bar).width;

        }

        bar.style.width="0";

        skillObserver.observe(bar);

    });

    /*=========================================
        COUNTER ANIMATION
    =========================================*/

    const counters = document.querySelectorAll(".counter");

    function animateCounter(counter){

        const target =

            parseInt(counter.dataset.target);

        const speed = 80;

        let current = 0;

        const increment =

            Math.ceil(target / speed);

        const update = () => {

            current += increment;

            if(current >= target){

                counter.textContent = target;

                return;

            }

            counter.textContent = current;

            requestAnimationFrame(update);

        };

        update();

    }

    const counterObserver = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if(entry.isIntersecting){

                    animateCounter(entry.target);

                    counterObserver.unobserve(entry.target);

                }

            });

        },

        {

            threshold:.5

        }

    );

    counters.forEach(counter=>{

        counter.textContent="0";

        counterObserver.observe(counter);

    });

});


/*====================================================
    script.js - Part 3A
    Loading Screen + Typing Animation
=====================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=========================================
        LOADING SCREEN
    =========================================*/

    const loader = document.createElement("div");
    loader.id = "loader";

    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-ring"></div>
            <h2>Loading Portfolio...</h2>
            <p>Please wait</p>
        </div>
    `;

    document.body.prepend(loader);

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("hide-loader");

            setTimeout(() => {

                loader.remove();

            }, 800);

        }, 1000);

    });

    /*=========================================
        TYPING ANIMATION
    =========================================*/

    const typingElement = document.querySelector(".typing");

    if (!typingElement) return;

    const words = [

        "Bioinformatician",
        "Computational Biologist",
        "Cancer Genomics Researcher",
        "AI in Healthcare",
        "Data Scientist",
        "Machine Learning Enthusiast"

    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {

        const currentWord = words[wordIndex];

        if (!deleting) {

            typingElement.textContent =
                currentWord.substring(0, charIndex++);

            if (charIndex > currentWord.length) {

                deleting = true;

                setTimeout(typeEffect, 1500);

                return;

            }

        } else {

            typingElement.textContent =
                currentWord.substring(0, charIndex--);

            if (charIndex < 0) {

                deleting = false;

                wordIndex++;

                if (wordIndex >= words.length) {

                    wordIndex = 0;

                }

            }

        }

        const speed = deleting ? 50 : 100;

        setTimeout(typeEffect, speed);

    }

    typeEffect();

});


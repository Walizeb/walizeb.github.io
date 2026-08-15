/*====================================================
    Dr. Wali Zeb Khan Portfolio
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

            threshold: 0.15

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

                }, 150);

                skillObserver.unobserve(bar);

            });

        },

        {

            threshold: .4

        }

    );

    bars.forEach(bar => {

        if (!bar.dataset.width) {

            bar.dataset.width =

                getComputedStyle(bar).width;

        }

        bar.style.width = "0";

        skillObserver.observe(bar);

    });

    /*=========================================
    COUNTER ANIMATION
    =========================================*/

    /*
        IMPORTANT:
        Google Scholar counters are excluded here
        because they are loaded separately from
        data/scholar.json.
    */

    const counters = document.querySelectorAll(
        ".counter:not(#scholar-publications):not(#scholar-citations):not(#scholar-hindex):not(#scholar-i10)"
    );

    function animateCounter(counter) {

        const target = Number(
            counter.dataset.target
        );

        // Prevent NaN
        if (!Number.isFinite(target)) {
            return;
        }

        const duration = 1500;

        const startTime = performance.now();

        function updateCounter(currentTime) {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );

            const easedProgress =
                1 - Math.pow(
                    1 - progress,
                    3
                );

            const currentValue =
                Math.floor(
                    easedProgress * target
                );

            counter.textContent =
                currentValue.toLocaleString();

            if (progress < 1) {

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                counter.textContent =
                    target.toLocaleString();

            }

        }

        requestAnimationFrame(
            updateCounter
        );
    }


    const counterObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        animateCounter(
                            entry.target
                        );

                        counterObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.5
            }

        );
    counters.forEach(counter => {

        counter.textContent = "0";

        counterObserver.observe(counter);

    });
});

/*====================================================
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

/*====================================================
    GOOGLE SCHOLAR RESEARCH IMPACT
=====================================================*/

async function loadScholarMetrics() {

    const publications =
        document.getElementById(
            "scholar-publications"
        );

    const citations =
        document.getElementById(
            "scholar-citations"
        );

    const hIndex =
        document.getElementById(
            "scholar-hindex"
        );

    const i10Index =
        document.getElementById(
            "scholar-i10"
        );

    const updated =
        document.getElementById(
            "scholar-updated"
        );


    try {

        const response = await fetch(
            "data/scholar.json?v=" +
            Date.now()
        );


        if (!response.ok) {

            throw new Error(
                "Scholar data could not be loaded"
            );

        }


        const data =
            await response.json();


        console.log(
            "Scholar data:",
            data
        );


        animateScholarValue(
            publications,
            data.publications
        );


        animateScholarValue(
            citations,
            data.citations
        );


        animateScholarValue(
            hIndex,
            data.h_index
        );


        animateScholarValue(
            i10Index,
            data.i10_index
        );


        if (
            updated &&
            data.updated
        ) {

            updated.textContent =
                "Last updated: " +
                formatScholarDate(
                    data.updated
                );

        }

    }

    catch (error) {

        console.error(
            "Scholar metrics error:",
            error
        );


        /*
            Don't show NaN if the data
            cannot be loaded.
        */

        if (publications)
            publications.textContent = "—";

        if (citations)
            citations.textContent = "—";

        if (hIndex)
            hIndex.textContent = "—";

        if (i10Index)
            i10Index.textContent = "—";


        if (updated) {

            updated.textContent =
                "Research metrics unavailable";

        }

    }

}


/*=========================================
    SCHOLAR COUNTER
=========================================*/

function animateScholarValue(
    element,
    value
) {

    if (!element) {
        return;
    }


    const target =
        Number(value);


    /*
        Prevent NaN
    */

    if (!Number.isFinite(target)) {

        element.textContent = "—";

        return;

    }


    let start = 0;

    const duration = 1600;

    const startTime =
        performance.now();


    function update(currentTime) {

        const elapsed =
            currentTime -
            startTime;


        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        /*
            Smooth ease-out animation
        */

        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        const current =
            Math.floor(
                start +
                (target - start) *
                eased
            );


        element.textContent =
            current.toLocaleString();


        if (progress < 1) {

            requestAnimationFrame(
                update
            );

        }

        else {

            element.textContent =
                target.toLocaleString();

        }

    }


    requestAnimationFrame(
        update
    );

}


/*=========================================
    DATE FORMAT
=========================================*/

function formatScholarDate(
    dateString
) {

    const date =
        new Date(dateString);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return dateString;

    }


    return date.toLocaleDateString(
        "en-US",
        {
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );

}


/*=========================================
    LOAD SCHOLAR DATA
=========================================*/

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadScholarMetrics();

    }
);


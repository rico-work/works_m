document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Scroll for Navigation
    const links = document.querySelectorAll('a[href^="#"]');
    for (let link of links) {
        link.addEventListener('click', e => {
            e.preventDefault();
            const href = link.getAttribute('href');
            const target = document.getElementById(href === '#' || href === '' ? 'fv' : href.substring(1));
            const position = target.offsetTop - 80; // Subtract header height
            window.scrollTo({
                top: position,
                behavior: 'smooth'
            });
        });
    }

    // 2. Header Scroll Effect
    const header = document.querySelector('.js-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('is-scrolled');
        } else {
            header.classList.remove('is-scrolled');
        }
    });

    // 3. Hamburger Menu (for Mobile)
    const hamburger = document.querySelector('.js-hamburger');
    const navLinks = document.querySelectorAll('.header__nav-item');

    const closeMobileNav = () => {
        header.classList.remove('is-nav-open');
        hamburger.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('is-nav-open-body');
    };

    hamburger.addEventListener('click', () => {
        const isOpen = header.classList.toggle('is-nav-open');
        hamburger.classList.toggle('is-active', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
        document.body.classList.toggle('is-nav-open-body', isOpen);
    });

    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });

    // 4. Fade-in on Scroll Animation
    const fadeItems = document.querySelectorAll('.js-fade-in');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    fadeItems.forEach(item => {
        observer.observe(item);
    });

    // 5. Works Section Tabs Filtering
    const tabs = document.querySelectorAll('.works__tab-item');
    const worksList = document.querySelector('.js-works-list');
    const worksItems = worksList.querySelectorAll('.works__item');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from other tabs
            tabs.forEach(t => t.classList.remove('is-active'));
            tab.classList.add('is-active');

            const filter = tab.dataset.filter;

            // Fade out the list
            worksList.style.opacity = '0';
            
            setTimeout(() => {
                worksItems.forEach(item => {
                    if (filter === 'all' || item.classList.contains(filter)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
                // Fade back in
                worksList.style.opacity = '1';
            }, 300);
        });
    });
});
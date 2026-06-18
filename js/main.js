(function () {
    'use strict';

    /* ── Nav: glassmorphism on scroll ── */
    var nav = document.getElementById('mainNav');
    var ticking = false;

    function updateNav() {
        nav.classList.toggle('scrolled', window.scrollY > 40);
        ticking = false;
    }
    window.addEventListener('scroll', function () {
        if (!ticking) { requestAnimationFrame(updateNav); ticking = true; }
    }, { passive: true });
    updateNav();

    /* ── Nav: mobile hamburger ── */
    var hamburger = document.getElementById('hamburger');
    var overlay   = document.getElementById('mobileOverlay');

    function setMenu(open) {
        hamburger.classList.toggle('is-open', open);
        overlay.classList.toggle('is-open', open);
        hamburger.setAttribute('aria-expanded', String(open));
        document.body.style.overflow = open ? 'hidden' : '';
    }

    hamburger.addEventListener('click', function () {
        setMenu(!overlay.classList.contains('is-open'));
    });

    overlay.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () { setMenu(false); });
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && overlay.classList.contains('is-open')) setMenu(false);
    });

    /* ── Intersection Observer: entrance animations ── */
    var fadeEls = document.querySelectorAll('.fade-in');

    if (!window.IntersectionObserver) {
        fadeEls.forEach(function (el) { el.classList.add('visible'); });
    } else {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });

        fadeEls.forEach(function (el) { io.observe(el); });
    }

    /* ── Contact form: submit feedback ── */
    var form      = document.getElementById('contactForm');
    var submitBtn = document.getElementById('formSubmit');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var original = submitBtn.textContent;
            submitBtn.textContent = 'Mensaje enviado ✓';
            submitBtn.disabled = true;
            submitBtn.style.backgroundColor = '#1A2F5E';
            setTimeout(function () {
                submitBtn.textContent = original;
                submitBtn.disabled = false;
                submitBtn.style.backgroundColor = '';
                form.reset();
            }, 3800);
        });
    }

}());

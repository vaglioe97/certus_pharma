(function () {
    'use strict';

    /* ── DEBUG ── */
    console.log('JS loaded');

    /* ── Nav: scroll state ── */
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

/* ── Smooth scroll with 80px nav offset ── */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href').slice(1);
            if (!targetId) return;
            var target = document.getElementById(targetId);
            if (!target) return;
            e.preventDefault();
            var top = target.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
        });
    });

    /* ── Contact form ── */
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

function toggleFaq(btn) {
    var answer = btn.nextElementSibling;
    var arrow = btn.querySelector('.faq-arrow');
    var isOpen = answer.style.maxHeight !== '0px'
                 && answer.style.maxHeight !== '';

    // Close all open FAQs
    document.querySelectorAll('.faq-answer').forEach(function (a) {
        a.style.maxHeight = '0px';
    });
    document.querySelectorAll('.faq-arrow').forEach(function (a) {
        a.textContent = '+';
        a.style.transform = 'rotate(0deg)';
    });

    // Open clicked if it was closed
    if (!isOpen) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        arrow.textContent = '−';
        arrow.style.transform = 'rotate(180deg)';
    }
}

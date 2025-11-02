/**
 * Landing Page Eucalyptus Beta
 * Performance-focused JavaScript
 */

// ============================================
// MOBILE MENU
// ============================================

const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');

        // Previne scroll quando menu está aberto
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Fecha o menu ao clicar em um link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ============================================
// HEADER SCROLL EFFECT
// ============================================

const header = document.getElementById('header');
let lastScroll = 0;

const handleScroll = () => {
    const currentScroll = window.pageYOffset;

    // Adiciona classe quando rolar
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
};

// Throttle para otimizar performance
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
        });
        ticking = true;
    }
});

// ============================================
// SMOOTH SCROLL
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Ignora links vazios
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// INTERSECTION OBSERVER - ANIMAÇÕES
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInElements = document.querySelectorAll('.card, .benefit-item, .stat-item');

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Adiciona delay progressivo para efeito cascata
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);

            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Configura estado inicial e observa elementos
fadeInElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(element);
});

// ============================================
// CTA TRACKING (Analytics ready)
// ============================================

const ctaButtons = document.querySelectorAll('a[href*="respondi.app"]');

ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonText = button.textContent.trim();
        const buttonLocation = button.closest('section')?.className || 'unknown';

        // Console log para debug (substitua por analytics real se necessário)
        console.log('CTA Clicked:', {
            text: buttonText,
            location: buttonLocation,
            timestamp: new Date().toISOString()
        });

        // Exemplo de integração com Google Analytics (descomente se necessário)
        // if (typeof gtag !== 'undefined') {
        //     gtag('event', 'cta_click', {
        //         'event_category': 'engagement',
        //         'event_label': buttonText,
        //         'value': buttonLocation
        //     });
        // }
    });
});

// ============================================
// PERFORMANCE MONITORING
// ============================================

// Log performance metrics quando a página carregar completamente
window.addEventListener('load', () => {
    // Performance API
    if ('performance' in window) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const connectTime = perfData.responseEnd - perfData.requestStart;
        const renderTime = perfData.domComplete - perfData.domLoading;

        console.log('Performance Metrics:', {
            pageLoadTime: `${pageLoadTime}ms`,
            connectTime: `${connectTime}ms`,
            renderTime: `${renderTime}ms`
        });
    }
});

// ============================================
// LAZY LOADING PARA IMAGENS FUTURAS
// ============================================

// Quando adicionar imagens, use este observer
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;

            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }

            imageObserver.unobserve(img);
        }
    });
});

// Observa todas as imagens com data-src
document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// ============================================
// PREVENÇÃO DE FOUC (Flash of Unstyled Content)
// ============================================

document.documentElement.classList.add('js-loaded');

// ============================================
// EXTERNAL LINKS
// ============================================

// Adiciona rel="noopener noreferrer" em links externos para segurança
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.setAttribute('rel', 'noopener noreferrer');
});

// ============================================
// FORM VALIDATION HELPER (Para futuras integrações)
// ============================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone);
}

// Export para uso em outros scripts se necessário
window.EucalyptusUtils = {
    validateEmail,
    validatePhone
};

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log(
    '%c🌿 Eucalyptus Beta Landing Page',
    'color: #00B894; font-size: 20px; font-weight: bold;'
);
console.log(
    '%cOptimized for performance and user experience',
    'color: #0984E3; font-size: 12px;'
);

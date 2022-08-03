import './accordeon.js';
import './tabs.js';
import './lng-menu.js';

const swiper = new Swiper('.swiper', {
    // Optional parameters
    loop: true,
    autoHeight: true,
    loop: false,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: 'true',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

const burgerIcon = document.querySelector('.burger-icon');
if (burgerIcon) {
    burgerIcon.addEventListener('click', () => {
        burgerIcon.classList.toggle('active');
        document.body.classList.toggle('scroll-lock');
        const menu = document.querySelector('.menu');
        if (menu) {
            menu.classList.toggle('hidden');
        }
    });
}

// const bouncedLog = debounce(console.log, 1000);
// bouncedLog(1);
// bouncedLog(2);
// bouncedLog(3);

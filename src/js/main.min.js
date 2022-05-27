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

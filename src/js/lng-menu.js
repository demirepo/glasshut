const wrapper = document.querySelector('.lng-menu__wrapper');
const lngSwitch = document.querySelector('.menu__language-img');
const lngOptions = document.querySelectorAll('.lng-menu__item img');

if (lngSwitch && wrapper && lngOptions) {
  lngSwitch.addEventListener('click', function () {
    wrapper.classList.toggle('visually-hidden');
  });

  lngOptions.forEach((el) => {
    el.addEventListener('click', function (e) {
      if (e.target.closest('.lng-menu__item')) {
        const temp = lngSwitch.getAttribute('src');
        lngSwitch.setAttribute('src', e.target.getAttribute('src'));
        e.target.setAttribute('src', temp);
        wrapper.classList.toggle('visually-hidden');
      }
    });
  });
}

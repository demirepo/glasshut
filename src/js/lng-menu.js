const wrapper = document.querySelector('.lng-menu__wrapper');
const lngSwitch = document.querySelector('.lng-menu__img');
const lngOptions = document.querySelectorAll('.lng-menu__item img');

if (lngSwitch && wrapper && lngOptions) {
    document.addEventListener('click', (e) => {
        if (e.target.closest('.lng-menu')) {
            const temp = lngSwitch.getAttribute('src');
            const choiceSrc = e.target.getAttribute('src');
            if (temp && choiceSrc) {
                lngSwitch.setAttribute('src', choiceSrc);
                e.target.setAttribute('src', temp);
                wrapper.classList.toggle('visually-hidden');
            }
        } else {
            wrapper.classList.add('visually-hidden');
        }
    });
}

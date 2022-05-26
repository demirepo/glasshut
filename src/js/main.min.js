// #region  --- HELPERS ---
/**
 *
 * @param {*} today - date object, e.g. Date.now()
 * @returns amount of days in month for given date
 */
const daysInMonth = (today) => {
  return 33 - new Date(today.getFullYear(), today.getMonth(), 33).getDate();
};
//---------------------------------------------------------------------------
/**
 *
 * @param {*} currentDate - date object, e.g. Date.now()
 * @returns date object for 1st of previous month
 */
const getPrevMonth = (currentDate) => {
  return new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
};
//---------------------------------------------------------------------------
/**
 *
 * @param {*} currentDate - date object, e.g. Date.now()
 * @returns date object for 1st of next month
 */
const getNextMonth = (currentDate) => {
  return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
};
// #endregion  --- HELPERS ---

//---------------------------------------------------------------------------

// #region  --- TABS ---

document.addEventListener('click', (e) => {
  const wrapper = e.target.closest('.tab-wrapper');
  if (!wrapper || ![...e.target.classList].includes('tab')) return;

  const tabs = wrapper.querySelectorAll('.tab');
  const tabContent = wrapper.querySelectorAll('.tab-content');

  tabs && [...tabs].forEach((el) => el.classList.remove('tab-active'));
  tabContent &&
    [...tabContent].forEach((el) => el.classList.remove('tab-content-active'));

  const activeTab = e.target.closest('.tab');
  activeTab && activeTab.classList.add('tab-active');

  const activeContent = document.getElementById(`${e.target.dataset.tabId}`);
  activeContent && activeContent.classList.add('tab-content-active');
});

// #endregion  --- TABS ---

//---------------------------------------------------------------------------

// #region  --- ACCORDEON ---

let isAnimating = false;

function isExpanded(spoiler) {
  return spoiler.classList.contains('expanded');
}

function onSchedule(fn) {
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      fn();
    });
  });
}

function open(spoiler) {
  isAnimating = true;
  spoiler.style.height = `${spoiler.scrollHeight}px`;
  onSchedule(function () {
    spoiler.classList.add('expanded');
    spoiler.parentElement.classList.add('expanded');
    spoiler.addEventListener('transitionend', function onTransitionEnd() {
      isAnimating = false;
      spoiler.removeEventListener('transitionend', onTransitionEnd);
    });
  });
}

function close(spoiler) {
  isAnimating = true;
  onSchedule(function () {
    spoiler.classList.remove('expanded');
    spoiler.parentElement.classList.remove('expanded');
    spoiler.style.height = '';
    spoiler.addEventListener('transitionend', function onTransitionEnd() {
      isAnimating = false;
      spoiler.removeEventListener('transitionend', onTransitionEnd);
    });
  });
}

document.addEventListener('click', (e) => {
  const container = e.target.closest('[data-spoiler]');
  if (!container || !e.target.hasAttribute('data-trigger')) return;
  const spoiler = container.firstElementChild.nextElementSibling;
  if (isAnimating) return;
  isExpanded(spoiler) ? close(spoiler) : open(spoiler);
});
// #endregion  --- ACCORDEON ---

//---------------------------------------------------------------------------

//---------------------------------------------------------------------------
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

// #region  --- LANGUAGE-MENU ---

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
// #endregion  --- LANGUAGE-MENU ---

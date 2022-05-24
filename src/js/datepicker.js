// #region  --- CALENDAR ---
let selectionStart = null;
let selectionEnd = null;
let currentDate = new Date();
const template = document.querySelector(`.month__table`)?.cloneNode('true');

const currentDateNode = document.querySelector('.current-month');
const nextDateNode = document.querySelector('.next-month');

function prevMonthHandler() {
  currentDate = getPrevMonth(currentDate);
  render(currentDate);
}
function nextMonthHandler() {
  currentDate = getNextMonth(currentDate);
  render(currentDate);
}

const closeBtn = document.querySelector('.calendar__close');
if (closeBtn) {
  closeBtn.addEventListener('click', (e) => {
    prevMonthBtn.removeEventListener('click', prevMonthHandler);
  });
}

const clear = document.querySelector('.calendar__clear');
if (clear) clear.addEventListener('click', (e) => {});

// обработка выделения диапазона
const table = document.querySelector('.calendar__bottom');
if (table) {
  table.addEventListener('click', (e) => {
    const target = e.target;
    // первый случай: уже есть выделение - убираем выделение, отмечаем старт
    if (
      target.nodeName === 'TD' &&
      selectionStart !== null &&
      selectionEnd !== null
    ) {
      target.classList.add('select-start');
      selectionStart.classList.remove('select-start');
      selectionEnd.classList.remove('select-end');
      selectionStart = null;
      selectionEnd = null;
    }
    // второй случай: отмечаем точку старта
    if (
      target.nodeName === 'TD' &&
      selectionStart === null &&
      selectionEnd === null
    ) {
      target.classList.add('select-start');
      selectionStart = target;
    }

    // третий случай: отмечаем конец выделения при существующем начале

    if (
      target.nodeName === 'TD' &&
      selectionStart !== null &&
      selectionEnd !== null
    ) {
      target.classList.remove('select-start');
      selectionStart = null;
    }

    if (
      target.nodeName === 'TD' &&
      selectionStart !== null &&
      selectionEnd === null &&
      target !== selectionStart
    ) {
      target.classList.add('select-end');
      selectionEnd = target;
    } else {
      target.classList.remove('select-end');
      selectionEnd = null;
    }
  });
}

// ----- FILL DAYS() -----

const fillTable = (selector, date) => {
  const clone = template.cloneNode('true');

  const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
    'January',
  ];

  clone.querySelector(`.month__year`).innerHTML = date.getFullYear();
  clone.querySelector(`.month__name`).innerHTML = MONTHS[date.getMonth()];

  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth());
  let start = firstDayOfMonth.getDay();
  if (start === 0) start = 7; // для компенсации того, что воскресенье - нулевой день
  const end = daysInMonth(date);

  const days = clone.querySelectorAll('td');
  let dayOfMonth = 1;

  for (let i = start - 1; i <= end + start - 2; i++) {
    days[i].innerHTML = dayOfMonth++;
  }

  const lastWeek = clone.querySelector(`.month__week:last-of-type`);
  if (lastWeek.firstElementChild.innerHTML === '') lastWeek.remove();

  if (selector === '.current-month') {
    const table = document.querySelector('.current-month .month__table');
    table.parentElement.append(clone);
    table.remove();
    // находим левую кнопку и вешаем действие "листать месяц назад"
    const prevMonthBtn = document.querySelector(
      '.current-month .month__prev-next-btn'
    );
    prevMonthBtn.addEventListener('click', prevMonthHandler);
  } else if (selector === '.next-month') {
    const table = document.querySelector('.next-month .month__table');
    table.parentElement.append(clone);
    table.remove();
    // находим правую кнопку и вешаем действие "листать месяц вперед"
    const nextMonthBtn = document.querySelector(
      '.next-month .month__prev-next-btn'
    );
    nextMonthBtn.addEventListener('click', nextMonthHandler);
  }
};

// ----- INIT() -----

const render = (currentDate) => {
  fillTable('.current-month', currentDate);
  fillTable('.next-month', getNextMonth(currentDate));
};

render(currentDate);

// #endregion  --- CALENDAR ---

/* html snippet
/
/

<div class="accordeon">
  <div data-spoiler-item class="spoiler-item">
    <div class="spoiler__visible">
      <span class="spoile__title">PRICES</span>
      <div data-spoiler-trigger class="faq__trigger">
        <img
          class="spoiler__item-arrow"
          src="./../img/accordeon-arrow-down.svg"
          alt=""
        />
      </div>
    </div>
    <div data-spoiler class="spoiler__expandable">
    </div>
  </div>
</div>

*/

let isAnimating = false;
let openOnlyOne = false;
const openOnlyOneSpoilerList = new Set();

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

const spoilers = document.querySelectorAll('[data-spoiler-item]');

if (spoilers) {
    spoilers.forEach((el) => {
        if (el.parentElement.hasAttribute('data-single-spoiler')) {
            openOnlyOne = true;
            openOnlyOneSpoilerList.add(el.parentElement);
        }
    });

    document.addEventListener('click', (e) => {
        const shouldOpenSpoilerItem = e.target.closest('[data-spoiler-item]');
        if (
            shouldOpenSpoilerItem &&
            e.target.closest('[data-spoiler-trigger]')
        ) {
            const expandable =
                shouldOpenSpoilerItem.querySelector('[data-spoiler]');
            if (isAnimating) return;

            if (
                openOnlyOneSpoilerList.has(shouldOpenSpoilerItem.parentElement)
            ) {
                // открываем тот, на котором щелкнули
                isExpanded(expandable) ? close(expandable) : open(expandable);
                const spoilerItems =
                    shouldOpenSpoilerItem.parentElement.querySelectorAll(
                        '[data-spoiler-item]'
                    );
                console.log(spoilerItems);
                // закрываем все открытые, кроме того, на котором клик
                for (let spoilerItem of spoilerItems) {
                    const shouldCloseExpandable =
                        spoilerItem.querySelector('[data-spoiler]');
                    if (shouldCloseExpandable === expandable) continue;
                    close(shouldCloseExpandable);
                }
            } else {
                isExpanded(expandable) ? close(expandable) : open(expandable);
            }
        }
    });
}

let isAnimating = false;

function isExpanded(spoiler) {
  return spoiler.classList.contains("expanded");
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
    spoiler.classList.add("expanded");
    spoiler.parentElement.classList.add("expanded");
    spoiler.addEventListener("transitionend", function onTransitionEnd() {
      isAnimating = false;
      spoiler.removeEventListener("transitionend", onTransitionEnd);
    });
  });
}

function close(spoiler) {
  isAnimating = true;
  onSchedule(function () {
    spoiler.classList.remove("expanded");
    spoiler.parentElement.classList.remove("expanded");
    spoiler.style.height = "";
    spoiler.addEventListener("transitionend", function onTransitionEnd() {
      isAnimating = false;
      spoiler.removeEventListener("transitionend", onTransitionEnd);
    });
  });
}

document.addEventListener("click", (e) => {
  const container = e.target.closest("[data-spoiler]");
  if (container) {
    const spoiler = container.firstElementChild.nextElementSibling;
    if (isAnimating) return;
    isExpanded(spoiler) ? close(spoiler) : open(spoiler);
  }
});

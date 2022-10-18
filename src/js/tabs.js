// import { throttle } from './throttle.js';

document.addEventListener('click', (e) => {
    const wrapper = e.target.closest('.tab-wrapper');
    if (!wrapper || ![...e.target.classList].includes('tab')) return;

    const tabs = wrapper.querySelectorAll('.tab');
    const tabContent = wrapper.querySelectorAll('.tab-content');

    tabs && [...tabs].forEach((el) => el.classList.remove('tab-active'));
    tabContent &&
        [...tabContent].forEach((el) =>
            el.classList.remove('tab-content-active')
        );

    const activeTab = e.target.closest('.tab');
    activeTab && activeTab.classList.add('tab-active');

    const activeContent = document.getElementById(`${e.target.dataset.tabId}`);
    activeContent && activeContent.classList.add('tab-content-active');
});

//needed to get rid of vertical overflowing due to impossibility to set container height for absolutely positioned content
function updateTabHeights() {
    const wrappers = document.querySelectorAll('.tab-wrapper');
    if (wrappers) {
        wrappers.forEach((wrapper) => {
            // finding max tab in each tab wrapper
            const textBlocks = wrapper.querySelectorAll('.tab-content');
            let maxTextBlocklengh = 0;
            let maxBlock;
            for (let textBlock of textBlocks) {
                const currentBlockLength = textBlock.innerText.length;
                if (currentBlockLength > maxTextBlocklengh) {
                    maxTextBlocklengh = currentBlockLength;
                    maxBlock = textBlock;
                }
            }
            //setting tab container height of max tab's height
            maxBlock.parentElement.style.height =
                maxBlock.offsetHeight + 30 + 'px';
        });
    }
}

updateTabHeights();
const throttledHeightUpdate = throttleFunc(updateTabHeights, 500);
window.addEventListener('resize', throttledHeightUpdate);

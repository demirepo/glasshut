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

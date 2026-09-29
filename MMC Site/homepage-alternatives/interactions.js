// Keep booking behavior consistent with the rest of the website.
document.addEventListener('click', function (event) {
  const trigger = event.target.closest('[data-book]');
  if (trigger && typeof window.mmcBookCall === 'function') {
    window.mmcBookCall(trigger.dataset.book, event);
  }
});

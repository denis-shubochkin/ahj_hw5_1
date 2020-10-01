const butns = document.querySelectorAll('.button');
const pop = document.querySelector('.popover');
let activeEl = {};

function popoverPos(el) {
  if (pop.style.display === 'block') {
    pop.style.width = `${el.offsetWidth + 10}px`;
    const { top, left } = el.getBoundingClientRect();
    pop.style.top = `${window.scrollY + top - pop.offsetHeight - 1}px`;
    pop.style.left = `${window.scrollX + left - (pop.offsetWidth - el.offsetWidth) / 2}px`;
  }
}
butns.forEach((element) => {
  element.addEventListener('click', () => {
    if (pop.style.display === 'none' || !pop.style.display) {
      pop.style.display = 'block';
      activeEl = element;
    } else if (activeEl !== element) {
      activeEl = element;
    } else {
      pop.style.display = 'none';
      activeEl = {};
    }
    popoverPos(element);
  });
});


window.addEventListener('resize', popoverPos);

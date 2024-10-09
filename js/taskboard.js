import { makeTaskEditable } from './task.js';

const taskboardContainer = document.querySelector('.taskboard');

taskboardContainer.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('task__edit')) {
    makeTaskEditable(evt.target);
  }
});

export { taskboardContainer };

import { isEnterKey } from './util.js';
const taskboardContainer = document.querySelector('.taskboard');

const turnOnFocus = (element) => {
  if (element.classList.contains('task__edit')) {
    const taskboardItem = element.closest('.taskboard__item');
    taskboardItem.classList.add('task--active');
  }
};

const onDocumentKeydown = (evt) => {
  if (isEnterKey(evt)) {
    evt.preventDefault();
    const activeElement = document.querySelector('.task--active');
    const taskInput = activeElement.querySelector('.task__input');
    const taskText = activeElement.querySelector('.task__view');
    taskText.textContent = taskInput.value;
    activeElement.classList.remove('task--active');
  }
};

taskboardContainer.addEventListener('click', (evt) => {
  turnOnFocus(evt.target);
});

document.addEventListener('keydown', (evt) => {
  onDocumentKeydown(evt);
});

import { isEnterKey } from './util.js';

const makeTaskEditable = (element) => {
  const taskboardItem = element.closest('.taskboard__item');
  taskboardItem.classList.add('task--active');

  const input = taskboardItem.querySelector('.task__input');
  input.focus();

  document.addEventListener('keydown', onDocumentKeydown);
  input.addEventListener('blur', onDifferentItemClick);
};

const makeTaskUneditable = () => {
  const activeElement = document.querySelector('.task--active');
  const input = activeElement.querySelector('.task__input');

  activeElement.classList.remove('task--active');

  document.removeEventListener('keydown', onDocumentKeydown);
  input.removeEventListener('blur', onDifferentItemClick);
};

const editTaskText = () => {
  const activeElement = document.querySelector('.task--active');
  const taskInput = activeElement.querySelector('.task__input');
  const taskText = activeElement.querySelector('.task__view');
  taskText.textContent = taskInput.value;
};

function onDocumentKeydown(evt) {
  if (isEnterKey(evt)) {
    evt.preventDefault();
    editTaskText();
    makeTaskUneditable();
  }
}

function onDifferentItemClick(evt) {
  evt.preventDefault();
  editTaskText();
  makeTaskUneditable();
}

export { makeTaskEditable };

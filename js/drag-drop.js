import { taskboardContainer } from './taskboard.js';
import { toggleEmptyItemState, emptyDoneItemElement } from './hide-empty.js';

const taskElements = document.querySelectorAll('.task');

const makeElementsDraggable = () => {
  for (const task of taskElements) {
    if (task.classList.contains('task--empty')) {
      task.draggable = false;
    } else {
      task.draggable = true;
    }
  }
};

const getNextElement = (cursorPosition, currentElement) => {
  const currentElementCoord = currentElement.getBoundingClientRect();
  const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;

  const nextElement = (cursorPosition < currentElementCenter) ?
    currentElement :
    currentElement.nextElementSibling;

  return nextElement;
};

const moveElement = (evt) => {
  const activeElement = taskboardContainer.querySelector('.selected');
  const currentElement = evt.target;
  const isMoveable = activeElement !== currentElement &&
    currentElement.classList.contains('task');

  if (!isMoveable) {
    return;
  }

  const nextElement = getNextElement(evt.clientY, currentElement);

  if (
    nextElement &&
    activeElement === nextElement.previousElementSibling ||
    activeElement === nextElement
  ) {
    return;
  }

  if (nextElement === null) {
    currentElement.after(activeElement);
  } else {
    nextElement.before(activeElement);
  }
};

const removeClass = (element) => {
  const classes = [...element.classList];
  const result = classes.find((item) => item.includes('task--'));

  if (result) {
    element.classList.remove(result);
  }
};

const addClass = (element) => {
  const grandParent = element.parentElement.parentElement;

  if (grandParent.classList.contains('taskboard__group--processing')) {
    element.classList.add('task--processing');
  } else if (grandParent.classList.contains('taskboard__group--done')) {
    element.classList.add('task--done');
  } else if (grandParent.classList.contains('taskboard__group--basket')) {
    element.classList.add('task--basket');
  }
};

makeElementsDraggable();

taskboardContainer.addEventListener('dragstart', (evt) => {
  evt.target.classList.add('selected');
  removeClass(evt.target);
});

taskboardContainer.addEventListener('dragend', (evt) => {
  evt.target.classList.remove('selected');
  addClass(evt.target);

  const doneContainer = document.querySelector('.taskboard__list--done');
  const children = doneContainer.querySelectorAll('.taskboard__item ');

  if (children.length === 1) {
    toggleEmptyItemState(emptyDoneItemElement, 'block');
  } else {
    toggleEmptyItemState(emptyDoneItemElement, 'none');
  }
});

taskboardContainer.addEventListener('dragover', (evt) => {
  evt.preventDefault();
  moveElement(evt);
});

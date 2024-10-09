import { taskboardContainer } from './taskboard.js';

const taskElements = document.querySelectorAll('.task');

const makeElementsDraggable = () => {
  for (const task of taskElements) {
    task.draggable = true;
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

makeElementsDraggable();

taskboardContainer.addEventListener('dragstart', (evt) => {
  evt.target.classList.add('selected');
});

taskboardContainer.addEventListener('dragend', (evt) => {
  evt.target.classList.remove('selected');
});

taskboardContainer.addEventListener('dragover', (evt) => {
  evt.preventDefault();

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
});



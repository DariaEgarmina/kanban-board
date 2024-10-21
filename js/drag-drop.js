import { taskboardContainer } from './taskboard.js';
import { toggleEmptyItemState, emptyBacklogItemElement, emptyProcessingItemElement, emptyDoneItemElement, emptyTrashItemElement } from './empty-banner.js';
import { trashContainer, toggleButtonState } from './basket.js';

let activeElement = null;

const taskElements = document.querySelectorAll('.task');
const backlogContainer = document.querySelector('.taskboard__list--backlog');
const processingContainer = document.querySelector('.taskboard__list--processing');
const doneContainer = document.querySelector('.taskboard__list--done');

const makeElementsDraggable = () => {
  for (const task of taskElements) {
    task.draggable = !task.classList.contains('task--empty');
  }
};

const getNextElement = (cursorPosition, currentElement) => {
  const currentElementCoord = currentElement.getBoundingClientRect();
  const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;

  return (cursorPosition < currentElementCenter) ?
    currentElement :
    currentElement.nextElementSibling;
};

const toggleSelectedState = (state, element) => {
  if (state) {
    element.classList.add('selected');
    element.classList.add('task--dragged');
  } else {
    element.classList.remove('selected');
    element.classList.remove('task--dragged');
  }
};

const moveElement = (evt) => {
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
  const semiResult = classes.filter((item) => !item.includes('task--dragged'));
  const result = semiResult.find((item) => item.includes('task--'));

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

const checkAndToggleEmptyState = (container, emptyElement) => {
  const items = container.querySelectorAll('.taskboard__item');
  toggleEmptyItemState(emptyElement, items.length === 1 ? 'block' : 'none');
};

const clearColumnsState = () => {
  checkAndToggleEmptyState(backlogContainer, emptyBacklogItemElement);
  checkAndToggleEmptyState(processingContainer, emptyProcessingItemElement);
  checkAndToggleEmptyState(doneContainer, emptyDoneItemElement);
  checkAndToggleEmptyState(trashContainer, emptyTrashItemElement);

  const isTrashEmpty = trashContainer.querySelectorAll('.taskboard__item').length === 1;
  toggleButtonState(isTrashEmpty);
};

const checkIfEmptyShown = (container, emptyElement) => {
  const items = container.querySelectorAll('.taskboard__item');
  toggleEmptyItemState(emptyElement, items.length === 2 ? 'none' : 'block');
};

const changeEmptyBunner = () => {
  checkIfEmptyShown(backlogContainer, emptyBacklogItemElement); // С этим элементом всё ломается
  checkIfEmptyShown(processingContainer, emptyProcessingItemElement); // С этим элементом всё ломается
  checkIfEmptyShown(doneContainer, emptyDoneItemElement);
  checkIfEmptyShown(trashContainer, emptyTrashItemElement);
};

makeElementsDraggable();

taskboardContainer.addEventListener('dragstart', (evt) => {
  activeElement = evt.target;
  toggleSelectedState(true, evt.target);
  removeClass(evt.target);
});

taskboardContainer.addEventListener('dragend', (evt) => {
  activeElement = null;
  toggleSelectedState(false, evt.target);
  addClass(evt.target);
  clearColumnsState();
});

taskboardContainer.addEventListener('dragover', (evt) => {
  evt.preventDefault();
  moveElement(evt);
  changeEmptyBunner();
});

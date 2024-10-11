import { toggleEmptyItemState, emptyTrashItemElement } from './hide-empty.js';

const trashItemsContainer = document.querySelector('.taskboard__list--trash');

const clearButtonElement = document.querySelector('.button--clear');

const deleteTask = (container, className) => {
  const elements = container.querySelectorAll(className);
  [...elements].forEach((element) => {
    element.remove();
  });
};

const toggleButtonState = (disabled) => {
  clearButtonElement.disabled = disabled;
};

clearButtonElement.addEventListener('click', (evt) => {
  evt.preventDefault();

  const trashItems = trashItemsContainer.querySelectorAll('.task--basket');

  if (trashItems.length > 0) {
    deleteTask(trashItemsContainer, '.task--basket');

    toggleButtonState(true);
    toggleEmptyItemState(emptyTrashItemElement, 'block');
  }
});

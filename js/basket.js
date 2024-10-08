import { toggleEmptyItemState, emptyTrashItemElement } from './hide-empty.js';

const trashItemsContainer = document.querySelector('.taskboard__list--trash');
const trashItems = trashItemsContainer.querySelectorAll('.task--basket');

const clearButtonElement = document.querySelector('.button--clear');

const deleteTask = (elements) => {
  [...elements].forEach((element) => {
    element.remove();
  });
};

const toggleButtonState = (disabled) => {
  clearButtonElement.disabled = disabled;
};

clearButtonElement.addEventListener('click', (evt) => {
  evt.preventDefault();

  if (trashItems.length > 0) {
    deleteTask(trashItems);
  }

  toggleButtonState(true);
  toggleEmptyItemState(emptyTrashItemElement, 'block');
});

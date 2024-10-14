import { toggleEmptyItemState, emptyTrashItemElement } from './empty-banner.js';

const trashContainer = document.querySelector('.taskboard__list--trash');
const clearButtonElement = document.querySelector('.button--clear');

const toggleButtonState = (disabled) => {
  clearButtonElement.disabled = disabled;
};

const deleteTask = (container, className) => {
  const elements = container.querySelectorAll(className);
  [...elements].forEach((element) => {
    element.remove();
  });

  toggleButtonState(true);
  toggleEmptyItemState(emptyTrashItemElement, 'block');
};

clearButtonElement.addEventListener('click', (evt) => {
  evt.preventDefault();

  const trashItems = trashContainer.querySelectorAll('.task--basket');

  if (trashItems.length > 0) {
    deleteTask(trashContainer, '.task--basket');
  }
});

export { trashContainer, toggleButtonState };

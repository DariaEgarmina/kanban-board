const trashItemsContainer = document.querySelector('.taskboard__list--trash');
const trashItems = trashItemsContainer.querySelectorAll('.task--basket');

const clearButtonElement = document.querySelector('.button--clear');

const emptyItemElement = document.querySelector('.task--empty-trash');

const deleteTask = (elements) => {
  for (let i = 0; i < elements.length; i++) {
    elements[i].remove();
  }
};

const toggleButtonState = (disabled) => {
  clearButtonElement.disabled = disabled;
};

const toggleEmptyItemState = (state) => {
  emptyItemElement.style.display = state;
};

toggleEmptyItemState('none');

clearButtonElement.addEventListener('click', (evt) => {
  evt.preventDefault();

  if (trashItems.length > 0) {
    deleteTask(trashItems);
  }

  toggleButtonState(true);
  toggleEmptyItemState('block');
});
const emptyTrashItemElement = document.querySelector('.task--empty-trash');
const emptyProcessingItemElement = document.querySelector('.task--empty-processing');
const emptyDoneItemElement = document.querySelector('.task--empty-done');

const toggleEmptyItemState = (element, state) => {
  element.style.display = state;
};

toggleEmptyItemState(emptyProcessingItemElement, 'none');
toggleEmptyItemState(emptyDoneItemElement, 'none');

toggleEmptyItemState(emptyTrashItemElement, 'none');

export { toggleEmptyItemState, emptyTrashItemElement };

const emptyBacklogItemElement = document.querySelector('.task--empty-backlog');
const emptyProcessingItemElement = document.querySelector('.task--empty-processing');
const emptyDoneItemElement = document.querySelector('.task--empty-done');
const emptyTrashItemElement = document.querySelector('.task--empty-trash');

const toggleEmptyItemState = (element, state) => {
  element.style.display = state;
};

toggleEmptyItemState(emptyBacklogItemElement, 'none');
toggleEmptyItemState(emptyProcessingItemElement, 'none');
toggleEmptyItemState(emptyDoneItemElement, 'none');
toggleEmptyItemState(emptyTrashItemElement, 'none');

export { toggleEmptyItemState, emptyBacklogItemElement, emptyProcessingItemElement, emptyDoneItemElement, emptyTrashItemElement };

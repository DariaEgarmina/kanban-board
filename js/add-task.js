const addTaskInputElement = document.querySelector('#add-task');
const backlogItemsContainer = document.querySelector('.taskboard__list');
const taskboardItemTemplate = document.querySelector('#task').content.querySelector('.taskboard__item');

const addNewTask = () => {
  const taskboardItemElement = taskboardItemTemplate.cloneNode(true);
  taskboardItemElement.draggable = true;

  const taskboardItemText = taskboardItemElement.querySelector('.task__view');
  const taskboardInput = taskboardItemElement.querySelector('.task__input');

  taskboardItemText.textContent = addTaskInputElement.value;
  taskboardInput.value = addTaskInputElement.value;
  backlogItemsContainer.append(taskboardItemElement);
};

export { addNewTask, addTaskInputElement };



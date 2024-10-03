const addTaskForm = document.querySelector('.add-task__form');
const addTaskInputElement = document.querySelector('#add-task');
const addTaskButtonElement = document.querySelector('.add-task__button');

const backlogItemsContainer = document.querySelector('.taskboard__list');

const taskboardItemTemplate = document.querySelector('#task').content.querySelector('.taskboard__item');

const addNewTask = () => {
  const taskboardItemElement = taskboardItemTemplate.cloneNode(true);
  const taskboardItemText = taskboardItemElement.querySelector('.task__view');

  const text = addTaskInputElement.value;

  taskboardItemText.textContent = text;
  backlogItemsContainer.append(taskboardItemElement);
};

addTaskButtonElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  if (addTaskInputElement.value.length > 0) {
    addNewTask();
    addTaskForm.reset();
  }
});

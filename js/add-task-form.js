import { addNewTask, addTaskInputElement } from './add-task.js';

const addTaskForm = document.querySelector('.add-task__form');

addTaskForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (addTaskInputElement.value.length > 0) {
    addNewTask();
    addTaskForm.reset();
  }
});

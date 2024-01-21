import { addTask, deleteTask, getAllTasks } from "../services/idb.js";

const setTask = async (title, date) => {
  const data = await getAllTasks();
  const id = data.length + 1;
  await addTask({ id: id, title, date, done: false, notified: false });
};

const deleteByTitle = async (targetTitle) => {
  const data = await getAllTasks();
  const targetId = data.find((obj) => obj.title == targetTitle).id;
  await deleteTask(targetId);
};

const updateTask = async (taskObj) => {
  await deleteByTitle(taskObj.title);
  await addTask(taskObj);
};

export { setTask, updateTask, deleteByTitle };

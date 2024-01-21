import {
  deleteByTitle,
  setTask,
  updateTask,
} from "./controller/idb.controller.js";
import { getAllTasks, getTask } from "./services/idb.js";
import { enableNotification, isFound, reRender } from "./utils/functions.js";

const form = document.querySelector("form");
const ul = document.querySelector("ul");

const onSubmitHandler = async (e) => {
  e.preventDefault();
  const title = document.querySelector("input[name=title]").value;
  const date = document.querySelector("input[name=date]").value;
  const error = document.querySelector(".error");

  if (await isFound(title)) return error.classList.remove("hidden");
  await setTask(title, date);
  await reRender(ul);
  error.classList.add("hidden");
};

const onClickHandler = async (e) => {
  if (e.target.tagName === "I") {
    await deleteByTitle(e.target.parentNode.textContent);
    await reRender(ul);
  }

  if (e.target.tagName === "LI" && e.target.tagName != "I") {
    const targetObj = await getTask(e.target.textContent);
    if (targetObj.done) {
      await updateTask({ ...targetObj, done: false });
      return await reRender(ul);
    }
    await updateTask({ ...targetObj, done: true });
    await reRender(ul);
  }
};

form.addEventListener("submit", onSubmitHandler);
ul.addEventListener("click", onClickHandler);

await reRender(ul);
enableNotification();

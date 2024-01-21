import { updateTask } from "../controller/idb.controller.js";
import { deadlineNotify } from "../utils/functions.js";

class Task {
  constructor({ id, title, date, done = false, notified = false }) {
    this.id = id;
    this.title = title;
    this.date = date;
    this.done = done;
    this.notified = notified;
  }

  // exists(title) {
  //   if (getTask(title)) return true;
  // }

  update(obj) {
    for (let prop in obj) this[prop] = obj[prop];
    updateTask(this);
  }

  timer() {
    const deadline = Date.parse(this.date);
    const intervalId = setInterval(() => {
      if (Date.parse(new Date()) >= deadline) {
        this.notified = true;
        this.update(this);
        clearInterval(intervalId);
      }
    }, 100);
  }

  render(parentObj) {
    const taskLi = document.createElement("li");
    const btnI = document.createElement("i");
    const intervalId = setInterval(async () => {
      if (this.done) taskLi.classList.add("timePassed");
      if (this.notified) {
        taskLi.classList.add("timePassed");
        if (!this.done) {
          await deadlineNotify(this);
        }
        clearInterval(intervalId);
      }
    }, 110);
    taskLi.textContent = this.title;
    btnI.classList.add("fa-regular", "fa-rectangle-xmark", "icon");
    taskLi.appendChild(btnI);
    parentObj.appendChild(taskLi);
  }
}

export { Task };

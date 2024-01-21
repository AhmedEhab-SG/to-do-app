import { Task } from "../classes/Task.js";
import { getAllTasks } from "../services/idb.js";

const reRender = async (parentObj) => {
  const data = await getAllTasks();
  parentObj.innerHTML = null;
  data.map((dbTask) => {
    const task = new Task(dbTask);
    task.timer();
    task.render(parentObj);
  });
};

const enableNotification = () => {
  Notification.requestPermission((status) => {
    //console.log("Notification permission, ", status);
  });
};

const deadlineNotify = async (task) => {
  if (Notification.permission == "granted") {
    const reg = await navigator.serviceWorker.ready;
    reg.showNotification(task.title + " passed the deadline", {
      body: "Tell me that you got it already",
      //icon: "../assets/timer.png",
      actions: [
        { action: "explore", title: "show me" },
        { action: "close", title: "close" }, //, icon: ''}
      ],
    });
    task.notified = true;
    task.update();
  }
};

const isFound = async (title) => {
  const alltasksObj = await getAllTasks();
  const found = alltasksObj.find(
    (obj) => obj.title.toLowerCase() == title.toLowerCase()
  );
  return found;
};

export { reRender, enableNotification, deadlineNotify, isFound };

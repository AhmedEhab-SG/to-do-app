const dbPromise = idb.openDB("toDoApp", 1, {
  upgrade(db, oldVersion, newVersion, transaction, event) {
    db.createObjectStore("toDoList", { keyPath: "id", autoIncrement: true });
    const store = transaction.objectStore("toDoList");
    store.createIndex("title", "title", { unique: true });
  },
});

const getAllTasks = async () => {
  const db = await dbPromise;
  const transaction = db.transaction("toDoList", "readwrite");
  const store = transaction.objectStore("toDoList");
  return await store.getAll();
};

const getTask = async (title) => {
  const db = await dbPromise;
  return db.getFromIndex("toDoList", "title", title);
};

const deleteTask = async (id) => {
  const db = await dbPromise;
  db.delete("toDoList", id);
};

const addTask = async (taskObj) => {
  const db = await dbPromise;
  taskObj.id = await db.put("toDoList", taskObj);
};

export { getAllTasks, getTask, deleteTask, addTask };

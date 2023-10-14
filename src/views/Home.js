import React, { useEffect, useState } from "react";
import styles from "../styles/home.module.css";
import {
  addTodoTask,
  getTodoItems,
  deleteTodoTask,
  saveTodoTask,
} from "../api";
import { useToasts } from "react-toast-notifications";

function Home() {
  const [item, setItem] = useState([]);
  const [id, setId] = useState(201);
  const [task, setTask] = useState("");
  const [updateId, setUpdateId] = useState();
  const [editTask, setEditTask] = useState(false);
  const { addToast } = useToasts();

  // Fetch the data from the given API and adding it into array to display it.
  useEffect(() => {
    async function fetchItems() {
      const response = await getTodoItems();
      if (response.success) {
        setItem(response.data);
      }
    }
    fetchItems();
  }, []);

  // This is to add a task into the todo list at the first position.
  const handleAddButton = async () => {
    const userId = 1;
    if (task !== "") {
      const response = await addTodoTask(task, userId);
      const data = response.data;
      if (response.success) {
        response.data.id = id;
        item.unshift(data);
        setId(id + 1);
        setTask("");
        return addToast(response.message, {
          appearance: "success",
          autoDismiss: true,
        });
      } else {
        return addToast(response.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    }
  };

  // This function is executed when we click the update button present for every task. We will get the index from the task list inorder to get the title of the todo task.
  const handleUpdate = async (ind) => {
    setEditTask(true);
    setUpdateId(ind);
    setTask(item[ind].title);
    console.log(task);
  };

  // This function is executed when we click the save button after making the changes in the inputbar for a existing task.
  const handleSavingTask = async () => {
    const response = await saveTodoTask(item[updateId]);
    if (response.success) {
      item[updateId].title = task;
      setEditTask(false);
      setTask("");
      return addToast(response.message, {
        appearance: "success",
        autoDismiss: true,
      });
    } else {
      return addToast(response.message, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  // Toggle the status of the task in the todolist
  const handleToggleTask = (ind) => {
    const flag = item[ind].completed;
    item[ind].completed = !flag;
    console.log(item[ind].completed, "0000000");
    return addToast("Task Completed...", {
      appearance: "success",
      autoDismiss: true,
    });
  };

  // Deleting a task from the todolist
  const handleDelete = async (ind) => {
    if (task !== null) {
      setTask("");
    }
    const response = await deleteTodoTask(item[ind]);
    if (response.success) {
      const currentTaskID = item[ind].id;
      console.log(response);
      const newList = item.filter((element) => element.id !== currentTaskID);
      setItem(newList);
      return addToast(response.message, {
        appearance: "success",
        autoDismiss: true,
      });
    } else {
      return addToast(response.message, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <div className={styles.todoMainContainer}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={task}
          placeholder="Enter a task..."
          onChange={(e) => setTask(e.target.value)}
          required
        />
        {editTask ? (
          <>
            {/* button for saving and updaing the required task */}
            <button className={styles.buttons} onClick={handleSavingTask}>
              Save
            </button>
          </>
        ) : (
          <>
            {/* button for adding the task to the todo list */}
            <button className={styles.buttons} onClick={handleAddButton}>
              Add Task
            </button>
          </>
        )}
      </div>
      <div className={styles.todoTaskContainer}>
        {item.map((task, index) => (
          <div className={styles.taskContainer} key={`${task.id}`}>
            <div className={styles.leftDiv}>
              {task.completed ? (
                <>
                  <input
                    type="checkbox"
                    checked
                    onClick={() => {
                      handleToggleTask(index);
                    }}
                  />
                </>
              ) : (
                <>
                  <input
                    type="checkbox"
                    onClick={() => {
                      handleToggleTask(index);
                    }}
                  />
                </>
              )}
              <span>{task.title}</span>
            </div>
            <div className={styles.rightDiv}>
              {/* button for Deleting a particular task, we are passing the index of the task item into the handleDelete Function */}
              <img
                src="https://cdn-icons-png.flaticon.com/128/4120/4120474.png"
                alt="D"
                onClick={() => {
                  handleDelete(index);
                }}
              />
              {/* button for updating a task, we are passing the index of the task item into the handleupdate function */}
              <img
                src="https://cdn-icons-png.flaticon.com/128/1057/1057097.png"
                alt="U"
                onClick={() => {
                  handleUpdate(index);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

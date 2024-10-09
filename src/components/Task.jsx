import React, { useState, useEffect } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "./Redux-toolkit/Slice/TaskSlice";

const Task = () => {
  const taskList = useSelector((state) => state.task.task);
  const dispatch = useDispatch();

  const [disabledTasks, setDisabledTasks] = useState(
    JSON.parse(localStorage.getItem("disabledTasks")) || {}
  );

  useEffect(() => {
    localStorage.setItem("disabledTasks", JSON.stringify(disabledTasks));
  }, [disabledTasks]);

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
    setDisabledTasks((prevDisabledTasks) => {
      const updatedDisabledTasks = { ...prevDisabledTasks };
      delete updatedDisabledTasks[id];
      return updatedDisabledTasks;
    });
  };

  const handleCheckActive = (id) => {
    setDisabledTasks((prevDisabledTasks) => ({
      ...prevDisabledTasks,
      [id]: !prevDisabledTasks[id],
    }));
  };

  return (
    <div className="task-box">
      <ul className="task-list">
        {taskList &&
          taskList.map((item) => (
            <li className="task" key={item.id}>
              <div className="left-list" key={item.id}>
                <label className="checkBox">
                  <input
                    id={`ch1-${item.id}`}
                    type="checkbox"
                    checked={disabledTasks[item.id] || false}
                    onChange={() => handleCheckActive(item.id)}
                  />
                  <div
                    className={`transition ${
                      disabledTasks[item.id] ? "background-color" : ""
                    }`}
                  ></div>
                </label>
                <p
                  className={`task-text ${
                    disabledTasks[item.id] ? "text-decoration" : ""
                  }`}
                >
                  {item.task}
                </p>
              </div>
              <div className="btn-group" style={{ display: "flex" }}>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteTask(item.id)}
                >
                  <MdDelete className="delete-icon" />
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default React.memo(Task);

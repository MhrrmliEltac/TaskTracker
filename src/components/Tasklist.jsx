import React, { useState } from "react";
import Task from "./Task";
import { useDispatch } from "react-redux";
import { addTask } from "./Redux-toolkit/Slice/TaskSlice";

const Tasklist = () => {
  const [task, setTask] = useState("");
  const [idCounter, setIdCounter] = useState(0);
  const dispatch = useDispatch();
  const id = crypto.randomUUID();

  const handleChangeInput = (e) => {
    setTask(e.target.value);
  };

  const handleAddTask = () => {
    if (task === "") {
      alert("Task daxil edin");
    } else {
      dispatch(addTask({ id: id, task: task }));
      setTask("");
    }
  };

  return (
    <section className="tast-tracker">
      <div className="container">
        <h4 className="title">Task Tracker</h4>
        <div className="input-box">
          <input
            onChange={handleChangeInput}
            value={task}
            type="text"
            className="task-input"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddTask();
            }}
            placeholder="Start writing and press enter to create task"
          />
          <button className="enter-btn" onClick={handleAddTask}></button>
        </div>
        <div className="tasks">
          <Task />
        </div>
      </div>
    </section>
  );
};

export default Tasklist;

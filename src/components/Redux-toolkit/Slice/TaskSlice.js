import { createSlice } from "@reduxjs/toolkit";

const items =
  localStorage.getItem("taskList") !== null
    ? JSON.parse(localStorage.getItem("taskList"))
    : [];

const initialState = {
  task: items,
};

export const taskSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.task = [...state.task, action.payload];
      localStorage.setItem(
        "taskList",
        JSON.stringify(state.task.map((item) => item))
      );
    },
    deleteTask: (state, action) => {
      state.task = state.task.filter((task) => task.id !== action.payload);
      localStorage.removeItem(
        "taskList",
        JSON.stringify(state.task.map((item) => item))
      );
    },
  },
});

export const { addTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;

import TMAPI from "./TMAPI";

export const getAllTask = () => {
  return TMAPI.get("/tasks/");
};

export const getTaskByID = (_id) => {
  return TMAPI.get(`/tasks/${_id}`);
};

export const editTaskByID = (_id, taskData) => {
  return TMAPI.put(`/tasks/${_id}`, taskData);
};

export const addTask = (taskData) => {
  return TMAPI.post("/tasks/", taskData);
};

export const deleteTaskByID = (_id) => {
  return TMAPI.delete(`/tasks/${_id}`);
};

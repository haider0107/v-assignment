import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Task } from "../models/task.model.js";
import { createTaskSchema, taskSchema } from "../schemas/taskSchema.js";
import { zodErrorHandler } from "../utils/zodError.js";

// Get all the task

const getAllTask = asyncHandler(async (req, res) => {
  const _id = req.user._id;

  const tasks = await Task.find({ owner: _id });

  if (!tasks) {
    return res.status(400).json(new ApiResponse(400, {}, "No task found !!!"));
  } else {
    return res
      .status(200)
      .json(new ApiResponse(200, tasks, "Tasks fetched successfully."));
  }
});

const getTaskByID = asyncHandler(async (req, res) => {
  const _id = req.params._id;

  const task = await Task.findById(_id);

  if (!task) {
    return res.status(400).json(new ApiResponse(400, {}, "No task found !!!"));
  } else {
    return res
      .status(200)
      .json(new ApiResponse(200, task, "Task fetched successfully."));
  }
});

const editTaskByID = asyncHandler(async (req, res) => {
  const { _id } = req.params;

  const validationResult = taskSchema.safeParse(req.body);

  if (!validationResult.success) {
    let fieldErrorsCombined = zodErrorHandler(validationResult);

    throw new ApiError(400, fieldErrorsCombined);
  }

  const updatedTask = await Task.findByIdAndUpdate(_id, validationResult.data, {
    new: true,
  });

  if (!updatedTask) {
    return res.status(400).json(new ApiResponse(400, {}, "Task not found !!!"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedTask, "Tasks updated successfully."));
});

const deleteTaskByID = asyncHandler(async (req, res) => {
  const { _id } = req.params;

  const deletedTask = await Task.findByIdAndDelete(_id);

  if (!deletedTask) {
    return res.status(404).json(new ApiResponse(400, {}, "Task not found !!!"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Task deleted successfully."));
});

const createTask = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const validationResult = createTaskSchema.safeParse(req.body);

  if (!validationResult.success) {
    let fieldErrorsCombined = zodErrorHandler(validationResult);

    throw new ApiError(400, fieldErrorsCombined);
  }

  const task = await Task.create({
    taskName: req.body.taskName,
    description: req.body.description,
    owner: _id,
  });

  const createdTask = await Task.findById(task._id);

  if (!createdTask) {
    throw new ApiError(500, "Something went wrong while creating a task");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdTask, "Task created successfully"));
});

export { getAllTask, getTaskByID, editTaskByID, deleteTaskByID, createTask };

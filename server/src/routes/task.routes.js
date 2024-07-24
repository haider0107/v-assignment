import { Router } from "express";
import requireJwtAuth from "../middleware/requireJwtAuth.js";
import {
  createTask,
  deleteTaskByID,
  editTaskByID,
  getAllTask,
  getTaskByID,
} from "../controllers/task.controllers.js";

const router = Router();

router.use(requireJwtAuth);

router.route("/:_id").get(getTaskByID).delete(deleteTaskByID).put(editTaskByID);

router.route("/").get(getAllTask).post(createTask);

export default router;

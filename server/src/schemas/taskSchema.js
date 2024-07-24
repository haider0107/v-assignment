import { z } from "zod";
import { DONE, INPROGRESS, NEW } from "../constants.js";

export const taskSchema = z.object({
  taskName: z.string().optional(),
  description: z.string().optional(),
  status: z.enum([NEW, INPROGRESS, DONE]).optional(),
});

export const createTaskSchema = z.object({
  taskName: z.string().min(2, "TaskName is required !!!"),
  description: z.string().min(2, "Description is required !!!"),
});

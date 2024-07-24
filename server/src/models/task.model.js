import mongoose, { Schema } from "mongoose";
import { NEW, INPROGRESS, DONE } from "../constants.js";

const taskSchema = new Schema(
  {
    taskName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: [NEW, INPROGRESS, DONE],
      default: NEW,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Task = mongoose.model("Task", taskSchema);

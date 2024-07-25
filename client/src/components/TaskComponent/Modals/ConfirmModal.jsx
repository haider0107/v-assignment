import React from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";
import { deleteTaskByID } from "../../../service/taskService";
const { confirm } = Modal;

const deleteTask = async (_id) => {
  try {
    const { data } = await deleteTaskByID(_id);
    if (data.success) {
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
  }
};

export const showDeleteConfirm = (_id) => {
  confirm({
    title: "Are you sure delete this task?",
    icon: <ExclamationCircleFilled />,
    content: "Some descriptions",
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      deleteTask(_id);
      console.log("OK");
    },
    onCancel() {
      console.log("Cancel");
    },
  });
};

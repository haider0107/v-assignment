import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import dayjs from "dayjs";

const TaskDetailModal = ({ isModalOpen, setIsModalOpen, task }) => {
  const [createdAt, setCreatedAt] = useState("");
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const currentDate = dayjs(task.createdAt).format("DD/MM/YYYY, HH:mm:ss");
    setCreatedAt(currentDate);
  }, []);

  return (
    <>
      <Modal
        title="Task Details"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h2 className="text-lg font-semibold mb-2">{`Title: ${task?.taskName}`}</h2>
        <p className="text-base text-gray-800 mb-1">
          {task?.description || "This is test description"}
        </p>
        <p className="text-sm text-gray-600">{`Created at: ${createdAt}`}</p>
      </Modal>
    </>
  );
};
export default TaskDetailModal;

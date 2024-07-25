import React, { useState } from "react";
import { Modal } from "antd";
import { addTask } from "../../../service/taskService";

const TaskAddModal = ({ isModalOpen, setIsModalOpen }) => {
  const [loading, setLoading] = useState(false);
  const [taskName, setTaskname] = useState("");
  const [description, setDescription] = useState("");

  const handleOk = async () => {
    setLoading(true);
    try {
      const { data } = await addTask({ taskName, description });
      if (data.success) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsModalOpen(false);

      setLoading(false);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        title="Add Task"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <div className="p-4">
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              TaskName
            </label>
            <input
              id="title"
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={taskName}
              onChange={(e) => setTaskname(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};
export default TaskAddModal;

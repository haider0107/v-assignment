import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import { editTaskByID, getAllTask } from "../../service/taskService";
import { Button } from "antd";
import TaskAddModal from "./Modals/TaskAddModal";

function Board() {
  const [completed, setCompleted] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const [inProgress, setInProgress] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    getAllTask().then(({ data }) => {
      if (data.success) {
        // console.log(data.data);
        const taskArray = data.data;
        setCompleted(taskArray.filter((task) => task.status === "DONE"));
        setIncomplete(taskArray.filter((task) => task.status === "NEW"));
        setInProgress(taskArray.filter((task) => task.status === "INPROGRESS"));
      }
    });
  }, []);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination || source.droppableId === destination.droppableId) return;

    deletePreviousState(source.droppableId, draggableId);

    const task = findItemById(draggableId, [
      ...incomplete,
      ...completed,
      ...inProgress,
    ]);

    setNewState(destination.droppableId, task);
    updateDatabase(destination.droppableId, draggableId);
  };

  async function updateDatabase(destinationDroppableId, taskId) {
    try {
      switch (destinationDroppableId) {
        case "1":
          await editTaskByID(taskId, { status: "NEW" });
          break;
        case "2":
          await editTaskByID(taskId, { status: "INPROGRESS" });
          break;
        case "3":
          await editTaskByID(taskId, { status: "DONE" });
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }

  function deletePreviousState(sourceDroppableId, taskId) {
    switch (sourceDroppableId) {
      case "1":
        setIncomplete(removeItemById(taskId, incomplete));
        break;
      case "2":
        setInProgress(removeItemById(taskId, inProgress));
        break;
      case "3":
        setCompleted(removeItemById(taskId, completed));
        break;
    }
  }

  function setNewState(destinationDroppableId, task) {
    let updatedTask;
    switch (destinationDroppableId) {
      case "1": // TO DO
        updatedTask = { ...task, status: "NEW" };
        setIncomplete([updatedTask, ...incomplete]);
        break;
      case "2": // IN PROGRESS
        updatedTask = { ...task, status: "INPROGRESS" };
        setInProgress([updatedTask, ...inProgress]);
        break;
      case "3": // DONE
        updatedTask = { ...task, status: "DONE" };
        setCompleted([updatedTask, ...completed]);
        break;
      // case "4": // BACKLOG
      //   updatedTask = { ...task, completed: false };
      //   setBacklog([updatedTask, ...backlog]);
      //   break;
    }
  }
  function findItemById(id, array) {
    return array.find((item) => item._id == id);
  }

  function removeItemById(id, array) {
    return array.filter((item) => item._id != id);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="text-center p-5">
        <Button type="primary" onClick={showModal}>
          Add Task
        </Button>
        <TaskAddModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </div>

      <div className="flex md:flex-row md:justify-between md:items-center md:w-[1300px] w-[400px] mx-auto flex-col gap-4">
        <Column title={"TO DO"} tasks={incomplete} id={"1"} />
        <Column title={"IN PROGRESS"} tasks={inProgress} id={"2"} />
        <Column title={"DONE"} tasks={completed} id={"3"} />
      </div>
    </DragDropContext>
  );
}

export default Board;

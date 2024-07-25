import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Button, Card, Col, Row } from "antd";
import TaskEditModal from "./Modals/TaskEditModal";
import TaskDetailModal from "./Modals/TaskDetailModal";
import { showDeleteConfirm } from "./Modals/ConfirmModal";

const Container = styled.div`
  border-radius: 10px;
  box-shadow: 5px 5px 5px 2px grey;
  padding: 8px;
  color: #000;
  margin-bottom: 8px;
  min-height: 120px;
  margin-left: 10px;
  margin-right: 10px;
  background-color: ${(props) => bgcolorChange(props)};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const TextContent = styled.div``;

const ButtonStyle = styled.div`
  display: flex;
  justify-content: end;
  padding: 2px;
  gap: 5px;
`;

function bgcolorChange(props) {
  return props.isDragging
    ? "lightgreen"
    : props.isDraggable
    ? props.isBacklog
      ? "#F2D7D5"
      : "#DCDCDC"
    : props.isBacklog
    ? "#F2D7D5"
    : "#EAF4FC";
}

function Task({ task, index }) {
  const [isEditModalOpen, setEditIsModalOpen] = useState(false);
  const [isDetailModalOpen, setDetailIsModalOpen] = useState(false);
  const showEditModal = () => {
    setEditIsModalOpen(true);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <Draggable draggableId={`${task._id}`} key={task._id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <div style={{ display: "flex", padding: 2 }}>
            <TextContent>{task.taskName}</TextContent>
          </div>
          <div style={{ display: "flex", justifyContent: "start", padding: 2 }}>
            <span>
              <small>
                {/* #{task.id} */}
                {task.description}
              </small>
            </span>
          </div>
          <ButtonStyle>
            <Button
              type="default"
              danger
              onClick={() => {
                showDeleteConfirm(task?._id);
              }}
            >
              Delete
            </Button>
            <Button onClick={showEditModal}>Edit</Button>
            <Button type="primary" onClick={showModal}>
              View Details
            </Button>
          </ButtonStyle>

          {provided.placeholder}
          <TaskEditModal
            isEditModalOpen={isEditModalOpen}
            setEditIsModalOpen={setEditIsModalOpen}
            task={task}
          />
          <TaskDetailModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            task={task}
          />
        </Container>
      )}
    </Draggable>
  );
}

export default Task;

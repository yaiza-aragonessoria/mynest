import { TaskContainer, Buttons, IconStatus, IconEdit, IconDelete, StatusColor } from "./Task.styled";
import React, { useState } from "react";
import api from "../../api/myNest";
import { useNavigate } from "react-router-dom"
import EditTask from "../EditTask";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePen, faTrash, faCheck, faPlay } from '@fortawesome/free-solid-svg-icons'


const Task = ({ task, onTaskDelete, onTaskEdit }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(task.status);
  const access = localStorage.getItem("access");
  const config = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${access}`,
    },
  };

  const handleClick = async () => {
    if (currentStatus === "TD") {
      setCurrentStatus("IP");
      await api.patch(`/tasks/${task.id}/`, { status: "IP" }, config);
    } else if (currentStatus === "IP") {
      setCurrentStatus("DO");
      await api.patch(`/tasks/${task.id}/`, { status: "DO" }, config);
    }
  };

  const handleDelete = async () => {
    await api.delete(`/tasks/${task.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    onTaskDelete(task.id);
  };

  const toggleEdit = () => {
    setShowEdit(!showEdit);
  };

  const statusLabel = {
    "TD": "TO DO",
    "IP": "IN PROGRESS",
    "DO": "DONE",
  }

  return (
    <TaskContainer>
      <p>{task.name}</p>
      <StatusColor taskstatus={currentStatus}>
      <p>{statusLabel[currentStatus]}</p>
      </StatusColor>
      <p>{task.assignee.first_name} <img src={task.assignee.avatar} /></p>
      <Buttons>
        <IconStatus>
          {currentStatus !== "DO" && (
            <i type="submit" onClick={handleClick}>
              {currentStatus === "TD" ? <FontAwesomeIcon icon={faPlay} /> : <FontAwesomeIcon icon={faCheck} />}
            </i>
          )}
        </IconStatus>
        <IconEdit>
          <i onClick={toggleEdit}>{<FontAwesomeIcon icon={faFilePen} />}</i>
        </IconEdit>
        <IconDelete>
          <i onClick={handleDelete}>{<FontAwesomeIcon icon={faTrash} />}</i>
        </IconDelete>
      </Buttons>
      {showEdit && <EditTask task={task} toggleEdit={toggleEdit} onTaskEdit={onTaskEdit} />}
    </TaskContainer>
  );
};
export default Task;


import { TaskContainer, Button } from "./Task.styled";
import React, { useState } from "react";
import api from "../../api/myNest";
import { useNavigate } from "react-router-dom"
import EditTask from "../EditTask";


const Task = ({ name, status, assignee, id, onTaskDelete, planned, nam }) => {
  const navigate = useNavigate();
  const[showEdit, setShowEdit] = useState(false);
  const goToEditTask = () => {
        navigate("/edit-task");
      };
  const [currentStatus, setCurrentStatus] = useState(status);
  const access = localStorage.getItem("access");
  const config = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${access}`,
    },
  };
  const data =  {
      status: currentStatus === 'TO DO' ? 'IP' : currentStatus === 'IN PROGRESS' ? 'DO' : 'DO',
  };
 
  const handleClick = async () => {
    if (currentStatus === "TO DO") {
      setCurrentStatus("IN PROGRESS");
      await api.patch(`/tasks/${id}/`, data, config);
    } else if (currentStatus === "IN PROGRESS") {
      setCurrentStatus("DONE");
      await api.patch(`/tasks/${id}/`, data, config);
    }
  };

  const configDelete = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  };

  const handleDelete = async () => {
    await api.delete(`/tasks/${id}`, configDelete);
    onTaskDelete(id);
  };

  const toggleEdit = (event) => {
    setShowEdit(!showEdit);
  };

  


  return (
    <TaskContainer>
      <p>{name}</p>
      <p>{assignee.first_name} <img src={assignee.avatar}/></p>
      <p>{currentStatus}</p>
      <Button>
        {currentStatus !== "DONE" && (
          <button type="submit" onClick={handleClick}>
            {currentStatus === "TO DO" ? "START" : "DONE"}
          </button>
        )}  
        <button onClick={toggleEdit} type="submit">EDIT</button>
        <button type="submit" onClick={handleDelete}>delete</button>
      </Button>
        {showEdit && <EditTask name={name} assignee={assignee} planned={planned} id={id} toggleEdit={toggleEdit}  /> }
    </TaskContainer>
  );
};
export default Task;


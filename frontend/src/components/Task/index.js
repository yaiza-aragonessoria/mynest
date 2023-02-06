import { TaskContainer, Button } from "./Task.styled";
import { useState } from "react";
import api from "../../api/myNest";


const Task = ({ name, status, assignee, id }) => {
  const [currentStatus, setCurrentStatus] = useState(status);
  const access = localStorage.getItem("access");
  const config = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${access}`,
    },
    data: {
      status: currentStatus === 'TO DO' ? 'TD' : currentStatus === 'IN PROGRESS' ? 'IP' : 'DO',
    },
  };

  const handleClick = async () => {
    if (currentStatus === "TO DO") {
      setCurrentStatus("IN PROGRESS");
      await api.patch(`/tasks/${id}`, config);
    } else if (currentStatus === "IN PROGRESS") {
      setCurrentStatus("DONE");
      await api.patch(`/tasks/${id}`, config);
    }
  };



  return (
    <TaskContainer>
      <p>{name}</p>
      <p>{currentStatus}</p>
      <p>{assignee}</p>
      <Button>
        {currentStatus !== "DONE" && (
          <button type="submit" onClick={handleClick}>
            {currentStatus === "TO DO" ? "START" : "DONE"}
          </button>
        )}
        <button type="submit">EDIT</button>
      </Button>
    </TaskContainer>
  );
};
export default Task;

// ? 'TD' : currentStatus === 'IN PROGRESS' ? 'IP' : 'DO',
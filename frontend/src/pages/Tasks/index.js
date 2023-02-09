import api from "../../api/myNest";
import React, { useState, useEffect } from "react"
import Task from "../../components/Task"
import { MainContainer, TasksContainer, TopPage, Description } from "./Tasks.styled";
import { useNavigate } from "react-router-dom"
import CreateTask from "../../components/CreateTask";

const Tasks = () => {
  const[showCreate, setShowCreate] = useState(false);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const access = localStorage.getItem("access");
  const config = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access}`,
    },
    params: { q: searchTerm }
  }
  

  const fetchTasks = async () => {
    try {
      const response = await api.get(`/tasks/home/search/`, config);
      setTasks(response.data);
      console.log(tasks);
    } catch (error) {
      console.log(error.response);
    }
  };

  const fetchTasksByAllMonths = async () => {
    try {
      const response = await api.get(`/tasks/home/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      setTasks(response.data);
      console.log(tasks);
    } catch (error) {
      console.log(error.response);
    }
  };




  useEffect(() => {
    fetchTasks();
    // fetchTasksByAllMonths();
  }, [searchTerm]);


  const sortTasks = (tasks) => {
    return tasks.sort((a, b) => {
      if (a.status === "TD") return -1;
      if (b.status === "TD") return 1;
      if (a.status === "DO") return 1;
      if (b.status === "DO") return -1;
      return 0;
    });
  };

  const toggleEdit = (event) => {
    setShowCreate(!showCreate);
  };


  const handleTaskDelete = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const date = new Date();
  const months = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER"
  ];
  const currentMonth = months[date.getMonth()];
  


  return (
    <>
     <MainContainer>
      <TopPage>
        <h1>TASK BOARD OF {currentMonth}</h1>
        <form>
          <input
            type="text"
            placeholder="Search task..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <button className="btn_purple" onClick={toggleEdit}>+ Add Task</button>
      </TopPage>
      <Description>
        <h3>Task name</h3>
        <h3>Assignee</h3>
        <h3>Status</h3>
      </Description>
      <TasksContainer>
        {sortTasks(tasks).map(task => (
          <Task
            key={task.id}
            name={task.name}
            status={task.status === 'TD' ? 'TO DO' : task.status === 'IP' ? 'IN PROGRESS' : 'DONE'}
            assignee={task.assignee}
            id={task.id}
            onTaskDelete={handleTaskDelete}
            planned={task.planned_for}
            // nam={task.first_name}
          />
        ))}
        {showCreate && <CreateTask toggleEdit={toggleEdit} /> }
      </TasksContainer>
    </MainContainer>
    </>
  );

};

export default Tasks;
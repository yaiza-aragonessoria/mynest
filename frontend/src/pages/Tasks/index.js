import api from "../../api/myNest";
import React, { useState, useEffect } from "react"
import Task from "../../components/Task"
import { TasksContainer, TopPage } from "./Tasks.styled";
import { useNavigate } from "react-router-dom"

const Tasks = () => {
  const navigate = useNavigate();
  const goToCreateTask = () => {
    navigate("/add-task");
  };
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
    } catch (error) {
      console.log(error.response);
    }
  };


  useEffect(() => {
    fetchTasks();
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

  const handleTaskDelete = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

//   const [chore, setChore] = useState({
//     name: name,
//     assignee: assignee,
//     planned_for: date,
// });



  return (
    <>
      <TopPage>
        <h1>TASK BOARD OF THE MONTH</h1>
        <form>
          <input
            type="text"
            placeholder="Search task..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <button onClick={goToCreateTask}>+ Add Task</button>
      </TopPage>
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
          />
        ))}
      </TasksContainer>
    </>
  );

};

export default Tasks;
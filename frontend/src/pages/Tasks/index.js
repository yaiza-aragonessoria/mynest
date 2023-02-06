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
    const access = localStorage.getItem("access");
    const config = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${access}`,
        },
    }
    const fetchTasks = async () => {
        try {
            const response = await api.get("/tasks/home/month", config);
            setTasks(response.data);
        } catch (error) {
            console.log(error.response);
        }
    };

    console.log(tasks);

    useEffect(() => {
        fetchTasks();
    }, []);

    const sortTasks = (tasks) => {
      return tasks.sort((a, b) => {
          if (a.status === "TD") return -1;
          if (b.status === "TD") return 1;
          if (a.status === "DO") return 1;
          if (b.status === "DO") return -1;
          return 0;
      });
  };


  


    return (
        <>
        <TopPage>
          <h1>TASK BOARD OF THE MONTH</h1>
        <form>
        <input
          type="text"
          placeholder="Search task..."/>
        </form>
        <button onClick={goToCreateTask}>+ Add Task</button>
        </TopPage>
        <TasksContainer>
        {sortTasks(tasks).map(task => (
            <Task
              key={task.id}
              name={task.name}
              status={task.status === 'TD' ? 'TO DO' : task.status === 'DO' ? 'DONE' : 'IN PROGRESS'}
              assignee={task.assignee}
              id={task.id}
            />
          ))}
        </TasksContainer>
        </>
    );

};

export default Tasks;
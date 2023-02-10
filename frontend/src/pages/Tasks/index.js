import api from "../../api/myNest";
import React, { useState, useEffect } from "react"
import Task from "../../components/Task"
import { MainContainer, TasksContainer, TopPage, Description, Header, StatusHeader, SearchBar } from "./Tasks.styled";
import { useNavigate } from "react-router-dom"
import CreateTask from "../../components/CreateTask";
import {useDispatch, useSelector} from "react-redux";
import MustHaveHome from "../../components/MustHaveHome/MustHaveHome";
import MustLogIn from "../../components/MustLogIn/MustLogIn";
import {fetchUser} from "../../features/slices/userSlice";

const Tasks = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchMode, setSearchMode] = useState("month");
  const [newCreatedTask, setNewCreatedTask] = useState(0);

  const access = localStorage.getItem("access");
  const config = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access}`,
    },
    params: { q: searchTerm }
  };

  const fetchMonthTasks = async () => {
    try {
      const response = await api.get(`/tasks/home/search-month/`, config);
      setTasks(response.data);
      // console.log(tasks);
    } catch (error) {
      // console.log(error.response);
    }
  };

  const fetchAllTasks = async () => {
    try {
      const response = await api.get(`/tasks/home/search-all/`, config);
      setTasks(response.data);
      console.log(tasks);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    if (searchMode == "month") {
      fetchMonthTasks();
    } else {
      fetchAllTasks();
    }
  }, [searchTerm, searchMode, newCreatedTask]);



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

  const handleTaskEdit = (editedTask) => {
    setTasks(tasks.map((t) => t.id == editedTask.id ? editedTask : t))
  };

  const onCreateTask = () => {
    setNewCreatedTask(newCreatedTask + 1);
  };

  const date = new Date();
  const months = [
    "JANUARY",
    "February",
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
            <Header>
            <h1>Task Board of {currentMonth}</h1>
            <button className="btn_purple" onClick={toggleEdit}>+ Add Task</button>
            </Header>
            <SearchBar>
            <form>
              <input
                  type="text"
                  placeholder="Search task..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
            <button className="btn_grey" onClick={() => { searchMode == "month" ? setSearchMode("all") : setSearchMode("month")}}>
              {searchMode == "month" ? "show all tasks " : "just this month" }
            </button>
            </SearchBar>
          </TopPage>
          <Description>
            <h3>Task name</h3>
          <StatusHeader>
            <h3>Status</h3>
          </StatusHeader>
          <h3>Assignee</h3>
      </Description>
          <TasksContainer>
            {sortTasks(tasks).map(task => (
                <Task
                    key={task.id}
                    task={task}
                    onTaskDelete={handleTaskDelete}
                    onTaskEdit={handleTaskEdit}
                />
            ))}
            {showCreate && <CreateTask toggleEdit={toggleEdit} onCreateTask={onCreateTask} /> }
          </TasksContainer>
        </MainContainer>
      </>
  );

};

export default Tasks;
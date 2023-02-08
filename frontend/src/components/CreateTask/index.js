import axios from 'axios';
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { CreateTaskPage, FormField } from './CreateTask.styled';


const CreateTask = () => {
  const navigate = useNavigate();
  const goToHomePage = () => {
    navigate("/to-do");
  };
  const access = localStorage.getItem("access");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (access) setIsLoggedIn(true);
    else setIsLoggedIn(false)

  }, [access])
  const config = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access}`,
    },
  }


  const [task, setTask] = useState({
    name: '',
    frequency: '',
    planned_for: '',
  });

  const handleChange = (event) => {
    setTask({ ...task, [event.target.name]: event.target.value });
  };


  const handleSubmit = event => {
    event.preventDefault();

    axios.post('https://mynest.propulsion-learn.ch/backend/api/tasks/home/', task, config)
      .then(response => {
        console.log(response);
        if (response.status === 201) navigate("/");

      })
      .catch(error => {
        console.log(error);

      });
  }
  return (
  
    <CreateTaskPage>
      <form onSubmit={handleSubmit}>
        <FormField>
          <label for=''>Task name</label>
          <input
            type="text"
            name="name"
            value={task.name}
            onChange={handleChange}
          />
        </FormField>
        <FormField>
          <label for=''>Frequency</label>
          <input
            type="text"
            name="frequency"
            value={task.frequency}
            onChange={handleChange}
          />
        </FormField>
        <FormField>
          <label for=''>Planned for</label>
          <input
            type="date"
            name="planned_for"
            value={task.planned}
            onChange={handleChange}
          />
        </FormField>
        <button type="submit">Create Task</button>
      </form>
      <button onClick={goToHomePage} >Cancel</button>
    </CreateTaskPage>
    
  );
};

export default CreateTask
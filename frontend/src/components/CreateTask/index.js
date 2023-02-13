import axios from 'axios';
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { CreateTaskPage, FormField, PopPage, Buttons } from './CreateTask.styled';


const CreateTask = ({ toggleEdit, onCreateTask }) => {
  const access = localStorage.getItem("access");
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
        onCreateTask();
        toggleEdit();
      })
      .catch(error => {
        console.log(error);
      });
  }
  return (
    <PopPage>
      <CreateTaskPage>
        <h3 className="header">Add Task</h3>
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
              value={task.planned_for}
              onChange={handleChange}
            />
          </FormField>
          <Buttons>
            <button className="btn_purple" type="submit">Create</button>
            <button className="btn_purple" onClick={toggleEdit} >Cancel</button>
          </Buttons>
        </form>
      </CreateTaskPage>
    </PopPage>

  );
};

export default CreateTask
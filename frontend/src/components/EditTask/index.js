import axios from 'axios';
import React, { useState, useEffect } from "react"
import { EditTaskPage, FormField, PopUp } from './EditTask.styled';

const EditTask = ({task, toggleEdit, onTaskEdit}) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [homeMembers, setHomeMembers] = useState([]);
    const access = localStorage.getItem("access");
    console.log(task);
    const [chore, setChore] = useState(task);

    useEffect(() => {
        getHomeMembers();
    }, [access])

    const config = {
        headers: {
            Authorization: `Bearer ${access}`,
        },
    }
    const getHomeMembers = async () => {
        try {
            setHomeMembers([])
            const res = await axios.get("https://mynest.propulsion-learn.ch/backend/api/users/home/", config);
            setHomeMembers(res.data);
        } catch (e) {
            setErrorMessage(e.message);
        }
    }

    console.log(chore);
   
    const handleSubmit = event => {
        event.preventDefault();
        let data = {
            name: chore.name,
            assignee: chore.assignee ? chore.assignee.id : null,
            planned_for: chore.planned_for,
        }
        axios.patch(`https://mynest.propulsion-learn.ch/backend/api/tasks/${task.id}/`, data, config)
            .then(response => {
                console.log(response);
                onTaskEdit(chore);
                toggleEdit();
            })
            .catch(error => {
                console.log(error);
            });
    }
    const handleChange = (event) => {
        let value = event.target.value;
        if (event.target.name == "assignee") {
            value = homeMembers.find(m => m.id == value);
        }
        setChore({ ...chore, [event.target.name]: value });
    };
    return (
        <>
            <PopUp>
            <EditTaskPage>
                <form onSubmit={handleSubmit}>
                    <FormField>
                        <label htmlFor=''>Task name</label>
                        <input
                            type="text"
                            name="name"
                            value={chore.name}
                            onChange={handleChange}
                        />
                    </FormField>
                    <FormField>
                    <label htmlFor=''>Assignee </label>
                    <select onChange={handleChange}
                            name={'assignee'}>
                        <option value="" className={'select-option'}>Select a value...</option>
                        {homeMembers.map((member) => (
                            <option key={member.id} value={member.id}>{member.first_name}</option>
                        ))}
                    </select>

                    </FormField>
                    <FormField>
                        <label htmlFor=''>Planned for</label>
                        <input
                            type="date"
                            name="planned_for"
                            value={chore.planned_for}
                            onChange={handleChange}
                        />
                    </FormField>
                    <div>{errorMessage}</div>
                    <button type="submit">Save Task</button>
                </form>
                <button onClick={toggleEdit} >Cancel</button>
            </EditTaskPage>
            </PopUp>
        </>
    );
};

export default EditTask;
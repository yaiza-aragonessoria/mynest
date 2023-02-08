import axios from 'axios';
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { EditTaskPage, FormField, PopUp } from './EditTask.styled';

const EditTask = (id, name, assignee, planned) => {
    // console.log(id);
    const navigate = useNavigate();
    const goToChorePage = () => {
        navigate("/to-do");
    };
    const access = localStorage.getItem("access");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        if (access) setIsLoggedIn(true);
        else setIsLoggedIn(false)

    }, [access])
    const config = {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${access}`,
        },
    }
    const [chore, setChore] = useState({
        name: '',
        assignee: '',
        planned_for: '',
    });
    console.log(chore);
   
    const handleSubmit = event => {
        event.preventDefault();
        axios.patch(`https://mynest.propulsion-learn.ch/backend/api/tasks/${id}/`, chore, config)
            .then(response => {
                console.log(response);
                if (response.status === 201) navigate("/to-do");

            })
            .catch(error => {
                console.log(error);

            });
    }
    const handleChange = (event) => {
        setChore({ ...chore, [event.target.name]: event.target.value });
    };
    return (
        <>
            <PopUp>
            <EditTaskPage>
                <form onSubmit={handleSubmit}>
                    <FormField>
                        <label for=''>Task name</label>
                        <input
                            type="text"
                            name="name"
                            value={chore.name}
                            onChange={handleChange}
                        />
                    </FormField>
                    <FormField>
                        <label for=''>Assignee</label>
                        <input
                            type="text"
                            name="assignee"
                            value={chore.assignee}
                            onChange={handleChange}
                        />
                    </FormField>
                    <FormField>
                        <label for=''>Planned for</label>
                        <input
                            type="text"
                            name="planned"
                            value={chore.planned_for}
                            onChange={handleChange}
                        />
                    </FormField>
                    <button type="submit">Save Task</button>
                </form>
                <button onClick={goToChorePage} >Cancel</button>
            </EditTaskPage>
            </PopUp>
        </>
    );
};

export default EditTask;
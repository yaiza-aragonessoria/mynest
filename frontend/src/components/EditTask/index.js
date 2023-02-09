import axios from 'axios';
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { EditTaskPage, FormField, PopUp } from './EditTask.styled';

const EditTask = (props) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [homeMembers, setHomeMembers] = useState([]);
    const navigate = useNavigate();
    // const goToChorePage = () => {
    //     navigate("/to-do");
    // };
    const access = localStorage.getItem("access");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    

    useEffect(() => {
        if (access) setIsLoggedIn(true);
        else setIsLoggedIn(false)
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
    const [chore, setChore] = useState({
        name: props.name,
        assignee: props.assignee,
        planned_for: props.planned,
    });
    console.log(chore);
   
    const handleSubmit = event => {
        event.preventDefault();
        axios.patch(`https://mynest.propulsion-learn.ch/backend/api/tasks/${props.id}/`, chore, config)
            .then(response => {
                console.log(response);
                // if (response.status === 200) navigate("/to-do");

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
                    <label htmlFor=''>Assignee </label>
                    <select onChange={handleChange}
                            name={'assignee'}>
                        <option value="" className={'select-option'}>Select a value...</option>
                        {homeMembers.map((member) => (
                            <option value={member.id}>{member.first_name}</option>
                        ))}
                    </select>

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
                <button onClick={props.toggleEdit} >Cancel</button>
            </EditTaskPage>
            </PopUp>
        </>
    );
};

export default EditTask;
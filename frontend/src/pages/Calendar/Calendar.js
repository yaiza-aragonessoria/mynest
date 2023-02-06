import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import React, { useState, useEffect } from "react"
import axios from "axios";
import './Calendar.css'

// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment) // or globalizeLocalizer

const HomeCalendar = (props) => {
    const access = localStorage.getItem("access");
    const headers = {
                headers: {
                    Authorization: `Bearer ${access}`,
                },}
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [homeMembers, setHomeMembers] = useState([]);
    const [checked, setChecked] = useState([]);

    const getHomeMembers = async() => {
        try {
            setHomeMembers([])
            const res = await axios.get("https://mynest.propulsion-learn.ch/backend/api/users/home/", headers);
            setHomeMembers(res.data);
            console.log("homeMembers =", homeMembers);
        }
        catch(e) {
            setErrorMessage(e.message);
            }
    }

    useEffect(() => {
        if(access) setIsLoggedIn(true);
        else setIsLoggedIn(false)
    },[access])

    const [errorMessage, setErrorMessage] = useState('');
    const [myEventsList, setMyEventsList] = useState([]);
    const [newEvent, setNewEvent] = useState({})

    const getEvents = async() => {
        try {
            setMyEventsList([]);
            const res = await axios.get("https://mynest.propulsion-learn.ch/backend/api/events/home/", headers);
            setMyEventsList(res.data);
            console.log("myEventsList =", myEventsList);
        }
        catch(e) {
            setErrorMessage(e.message);
            }
    }

    useEffect(()=>{
        getEvents()
        getHomeMembers()
        },[])

    const handleChange = (e) => {
        setNewEvent({...newEvent, [e.target.name]: e.target.value})
        console.log(newEvent)
    }

    // Add/Remove checked item from list
    const handleCheck = (event) => {
      let updatedList = [...checked];
      if (event.target.checked) {
        updatedList = [...checked, event.target.value];
      } else {
        updatedList.splice(checked.indexOf(event.target.value), 1);
      }
      setChecked(updatedList);
      setNewEvent({...newEvent, participants: updatedList})
      console.log("checked =", checked)
    };

    const handleAddEvent = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("https://mynest.propulsion-learn.ch/backend/api/events/", newEvent, headers);
            getEvents();
            console.log("myEventsList =", myEventsList);
        } catch (e) {
            setErrorMessage(e.message);
        }

    }

    return (
        <>
            {isLoggedIn ?
                <>
                <form>
                <input type={"text"}
                       placeholder={"Add title"}
                       name={'title'}
                       value={newEvent.title}
                       onChange={handleChange}
                />
                <input type={"date"}
                       name={'start'}
                       value={newEvent.start}
                       onChange={handleChange}
                />
                <input type={"date"}
                       name={'end'}
                       value={newEvent.end}
                       onChange={handleChange}
                />
                {homeMembers.length !== 0 && homeMembers.map( (member, index) => {
                    let memberName = member.first_name ? member.first_name : member.email;
                    return(
                        <>
                            <label id={index} htmlFor={memberName}>
                            <input type={"checkbox"}
                                    name={'participants'}
                                    value={member.id}
                                    onChange={handleCheck}
                                                />
                                {memberName}
                            </label>
                        </>
                    )
                    })
                }
                <input type={"text"}
                       name={'notes'}
                       value={newEvent.notes}
                       onChange={handleChange}
                />
                <button type={'submit'}
                        onClick={handleAddEvent}>
                Add Event
                </button>
            </form>
                <div className="myCustomHeight">
                <Calendar
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                style={{height: 500, margin: '50px'}}
                />
                </div>
                </>:
                <div>
                    You must be log in first
                </div>
            }
        </>
    )
}

export default HomeCalendar;
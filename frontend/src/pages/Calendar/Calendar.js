import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import React, { useState, useEffect } from "react"
import axios from "axios";
import './Calendar.css'

// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment) // or globalizeLocalizer

const HomeCalendar = (props) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [myEventsList, setMyEventsList] = useState([]);
    const [newEvent, setNewEvent] = useState({title: '',
                                                        start: '',
                                                        end: '',
                                                        guests: [],
                                                        all_day: false,
                                                        notes: ''})

    const handleGetEvents = async() => {
        setNewEvent({...newEvent})

        try {
            setMyEventsList([]);
            const res = await axios.get("http://127.0.0.1:8000/backend/api/events/");
            setMyEventsList(res.data);
            console.log("myEventsList =", myEventsList);
        }
        catch(e) {
            setErrorMessage(e.message);
            }
    }

    useEffect(()=>{
        handleGetEvents()
        },[])

    const handleChange = (e) => {
        setNewEvent({...newEvent, [e.target.name]: e.target.value})
        console.log(newEvent)
    }

    const handleAddEvent = async (e) => {
        e.preventDefault();

        try {
            setMyEventsList([]);
            const res = await axios.post("http://127.0.0.1:8000/backend/api/events/", newEvent);
            setMyEventsList(res.data);
            console.log("myEventsList =", myEventsList);
        } catch (e) {
            setErrorMessage(e.message);
        }

    }

    return (
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
                <button type={'submit'}
                        onClick={handleAddEvent}>

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
        </>
    )
}

export default HomeCalendar;
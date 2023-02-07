import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import React, { useState, useEffect } from "react"
import axios from "axios";
import './Calendar.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import CustomToolbar from './toolbar';
import Popup from 'react-popup';
import './popup.css';

// import Input from './input';
// import moment from 'moment';



/* sources:
https://www.youtube.com/watch?v=lyRP_D0qCfk
https://codesandbox.io/s/sksajureact-redux-event-calendar-n5her?file=/src/components/calender.js:665-980
 */

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

    // DELETE EVENT
    const handleDeleteEvent = () => {
        return false;
    }

    // DELETE EVENT
    const handleUpdateEvent = () => {
        return false;
    }

    //RENDER SINGLE EVENT POPUP CONTENT
    const renderEventContent = (slotInfo) => {
        const date = moment(slotInfo.start).format('MMMM D, YYYY');
        return (
            <div>
                <p>Date: <strong>{date}</strong></p>
                {/*<p>Location: {slotInfo.participants}</p>*/}
            </div>
        );
    }

    //POPUP-FORM FUNCTION FOR CREATE AND EDIT EVENT
    const openPopupForm = (slotInfo) => {
        console.log('openPopupForm')
        let newEvent = false;
        let popupTitle = "Update Event";
        if(!slotInfo.hasOwnProperty('id')) {
            slotInfo.id = moment().format('x');  //Generate id with Unix Millisecond Timestamp
            slotInfo.title = null;
            slotInfo.location = null;
            popupTitle = "Create Event";
            newEvent = true;
        }
        // Maybe make a global change function?
        let titleChange = function (value) {
            slotInfo.title = value;
        };
        // let locationChange = function (value) {
        //     slotInfo.location = value;
        // };

        Popup.create({
            title: popupTitle,
            content: <div> holi
                        {/*<input onChange={titleChange} placeholder="Event Title" value={slotInfo.title} />*/}
                        {/*<Input onChange={locationChange} placeholder="Event Location" defaultValue={slotInfo.location} />*/}
                    </div>,
            buttons: {
                left: ['cancel'],
                right: [{
                    text: 'Save',
                    className: 'success',
                    action: function () { console.log('action button')
                        //CHECK THE ID PROPERTY FOR CREATE/UPDATE
                        // if(newEvent) {
                        //     handleAddEvent(slotInfo); //EVENT CREATE ACTION
                        // } else {
                        //     handleUpdateEvent(slotInfo); //EVENT UPDATE ACTION
                        // }
                        Popup.close();
                    }
                }]
            }
        });
    }

    //ON SELECT EVENT HANDLER FUNCTION
    const onSelectEventHandler = (slotInfo) => {
        console.log('onSelectEventHandler')
        Popup.create({
            title: slotInfo.title,
            content: renderEventContent(slotInfo),
            buttons: {
                right: [{
                    text: 'Edit',
                    className: 'info',
                    action: function () {
                        Popup.close(); //CLOSE PREVIOUS POPUP
                        openPopupForm(slotInfo); //OPEN NEW EDIT POPUP
                    }.bind(this)
                }, {
                    text: 'Delete',
                    className: 'danger',
                    action: function () {
                        //CALL EVENT DELETE ACTION
                        handleDeleteEvent();
                        Popup.close();
                    }.bind(this)
                }]
            }
        });
    }

    //EVENT STYLE GETTER FOR SLYLING AN EVENT ITEM
    const eventStyleGetter = (event, start, end, isSelected) => {
        let current_time = moment().format('YYYY MM DD');
        let event_time = moment(event.start).format('YYYY MM DD');
        let background = (current_time>event_time) ? '#DE6987' : '#8CBD4C';
        return {
            style: {
                backgroundColor: background
            }
        };
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
                        popup
                        selectable
                        localizer={localizer}
                        events={myEventsList}
                        startAccessor="start"
                        endAccessor="end"
                        eventPropGetter={(eventStyleGetter)}
                        onSelectEvent={(slotInfo) => onSelectEventHandler(slotInfo)}
                        style={{height: 500, margin: '50px'}}
                    />
                </div>
                <Popup />
                </>:
                <div>
                    You must be log in first
                </div>
            }
        </>
    )
}

export default HomeCalendar;
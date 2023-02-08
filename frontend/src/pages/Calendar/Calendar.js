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
    const [updatedChecked, setUpdatedChecked] = useState([]);
    const [eventDetails, setEventDetails] = useState({});

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
      console.log("typeof updatedList[0] ", typeof updatedList[0])
      setNewEvent({...newEvent, participants: updatedList})
      console.log("checked =", checked)
    };

    const handleAddEvent = async (e) => {
        e.preventDefault();
        console.log(newEvent)

        try {
            const res = await axios.post("https://mynest.propulsion-learn.ch/backend/api/events/", newEvent, headers);
            getEvents();
            console.log("myEventsList =", myEventsList);
        } catch (e) {
            setErrorMessage(e.message);
        }

    }

    const handleAddEventFromCalendar = async (slotInfo) => {
        console.log(slotInfo)

        try {
            const res = await axios.post("https://mynest.propulsion-learn.ch/backend/api/events/", slotInfo, headers);
            getEvents();
            console.log("myEventsList =", myEventsList);
        } catch (e) {
            setErrorMessage(e.message);
        }

    }

    // DELETE EVENT
    const handleDeleteEvent = async (slotInfo) => {
        console.log(slotInfo)

        try {
            const res = await axios.delete(`https://mynest.propulsion-learn.ch/backend/api/events/${slotInfo.id}`, headers);
            getEvents();
            console.log("myEventsList =", myEventsList);
        } catch (e) {
            setErrorMessage(e.message);
        }
    }

    // DELETE EVENT
    const handleUpdateEvent = async (slotInfo) => {
        // e.preventDefault();
        console.log(newEvent)
        console.log(typeof slotInfo.participants[0])
        for (let i = 0; i < slotInfo.participants.length; i++) {
            if (typeof slotInfo.participants[i] === "number") slotInfo.participants[i] = slotInfo.participants[i].toString();
        }
        console.log(typeof slotInfo.participants[0])


        try {
            const res = await axios.patch(`https://mynest.propulsion-learn.ch/backend/api/events/${slotInfo.id}`, slotInfo, headers);
            getEvents();
            console.log("myEventsList =", myEventsList);
        } catch (e) {
            setErrorMessage(e.message);
        }
    }

    const makeParticipantsString = (participantsIds) => {
            const participantNames = [];

            console.log("participantsIds = ", participantsIds)


            participantsIds.map((participantId, index) => {
                for ( const memberObj of homeMembers) {
                    if (participantId === memberObj.id) {
                        let name = memberObj.first_name ? memberObj.first_name : memberObj.email;
                        participantNames.push(name);
                    }
                }
            });
            console.log("participantNames = ", participantNames)
            return participantNames.join(', ')
        }

    //RENDER SINGLE EVENT POPUP CONTENT
    const renderEventContent = (slotInfo) => {
        setEventDetails(slotInfo)
        console.log("eventDetails =", eventDetails)
        console.log("slotInfo =", slotInfo)

        const start = moment(slotInfo.start).format('MMMM D, YYYY');
        const end = moment(slotInfo.end).format('MMMM D, YYYY');
        const participants = makeParticipantsString(slotInfo.participants);
        const notes = slotInfo.notes;

        // console.log(slotInfo)

        return (
            <div>
                {start === end ? <p>Date: {start} </p> :
                    <p>Date: {start} - {end}</p>}
                Participants: {participants}
                {notes && notes.length !== 0 ? <p>Description: {notes}</p> : null}
            </div>
        );
        }

    //POPUP-FORM FUNCTION FOR CREATE AND EDIT EVENT
    const openPopupForm = (slotInfo) => {
        console.log('openPopupForm')
        console.log("slotInfo =", slotInfo)
        // console.log("type slotInfo.participants[0] =", typeof slotInfo.participants[0])
        setEventDetails(slotInfo);

        let isNewEvent = false;
        let popupTitle = "Update Event";
        console.log(slotInfo.hasOwnProperty('id'))
        if(!slotInfo.hasOwnProperty('id')) {
            console.log("slotInfo has no id --> new event")
            // slotInfo.id = moment().format('x');  //Generate id with Unix Millisecond Timestamp
            slotInfo.title = '';
            slotInfo.start = null;
            slotInfo.end = null;
            slotInfo.participants = [];
            slotInfo.notes = '';
            popupTitle = "Create Event";
            isNewEvent = true;
        }

        const handleUpdate = (e) => {
            slotInfo = {...slotInfo, [e.target.name]: e.target.value}
            // setEventDetails({...eventDetails, [e.target.name]: e.target.value})

            console.log(eventDetails)
        }


        const handleUpdateCheck = (event) => {
            console.log("value", event.target.value)
            console.log("checked", event.target.checked)
            // console.log("eventDetails.participants ", eventDetails.participants)
            // console.log("type eventDetails.participants[0] =", typeof eventDetails.participants[0])
            console.log("updatedChecked =", updatedChecked)


            for (let i = 0; i < slotInfo.participants.length; i++) {
                if (typeof slotInfo.participants[i] === "number") slotInfo.participants[i] = slotInfo.participants[i].toString();
                }
            setEventDetails(slotInfo)
            let updatedList = [...slotInfo.participants];

            // console.log("type slotInfo.participants[0] =", typeof slotInfo.participants[0])
            // console.log("type eventDetails.participants[0] =", typeof eventDetails.participants[0])
            // console.log("type event.target.value =", typeof event.target.value)
            // console.log("type updatedList[0] =", typeof updatedList[0])

            // let updatedList = [...eventDetails.participants];
            // console.log("exists? ", updatedList.indexOf(event.target.value))
            if (updatedList.indexOf(event.target.value) === -1) {
                updatedList = [...slotInfo.participants, event.target.value];
            } else {
                // console.log("to delete id =", event.target.value)
                // console.log("event.target.value =", typeof event.target.value)
                // console.log("type updatedList[0] =", typeof updatedList[0])
                // console.log("type eventDetails.participants[0] =", typeof eventDetails.participants[0])
                let index = updatedList.indexOf(event.target.value);
                console.log("index ", index)
                updatedList.splice(index, 1);
                // slotInfo.participants.splice(updatedList.indexOf(event.target.value), 1);
            }
            setUpdatedChecked(updatedList);
            slotInfo.participants = updatedList
            // setEventDetails({...eventDetails, participants: updatedList})
            setEventDetails(slotInfo)
            // console.log("updatedList =", updatedList)
            // console.log("updatedChecked =", updatedChecked)
            console.log("slotInfo.participants ", slotInfo.participants)
            // console.log("eventDetails.participants ", eventDetails.participants)
        };

        const isChecked = (memberId) => {
            console.log("isChecked is called")
            let isChecked = false;

            for (const participant of slotInfo.participants) {
                console.log("participant =", participant)
                if (participant === memberId) {
                    isChecked = true;
                    break;
                };
            }
            return isChecked;
        }

        Popup.create({
            title: popupTitle,
            content: <div>
                        <input type={"text"}
                               placeholder={"Add title"}
                               name={'title'}
                               defaultValue={slotInfo.title}
                               onChange={handleUpdate}
                        />
                        <input type={"date"}
                               name={'start'}
                               defaultValue={slotInfo.start}
                               onChange={handleUpdate}
                        />
                        <input type={"date"}
                               name={'end'}
                               defaultValue={slotInfo.end}
                               onChange={handleUpdate}
                        />
                        {homeMembers.length !== 0 && homeMembers.map( (member, index) => {
                            let memberName = member.first_name ? member.first_name : member.email;
                            return(
                                <>
                                    <label id={index} htmlFor={memberName}>
                                    <input type={"checkbox"}
                                            name={'participants'}
                                            defaultChecked={isChecked(member.id)}
                                            defaultValue={member.id}
                                            onChange={handleUpdateCheck}
                                                        />
                                        {memberName}
                                    </label>
                                </>
                            )
                            })
                        }
                        <input type={"text"}
                               placeholder={"Add a description"}
                               name={'notes'}
                               defaultValue={slotInfo.notes}
                               onChange={handleUpdate}
                        />
                    </div>,
            buttons: {
                left: ['cancel'],
                right: [{
                    text: 'Save',
                    className: 'success',
                    action: function () { console.log('action button')
                        //CHECK THE ID PROPERTY FOR CREATE/UPDATE
                        if(isNewEvent) {
                            setNewEvent(slotInfo);
                            handleAddEventFromCalendar(slotInfo); //EVENT CREATE ACTION
                        } else {
                            handleUpdateEvent(slotInfo); //EVENT UPDATE ACTION
                        }
                        Popup.close();
                    }
                }]
            }
        });
    }

    //ON SELECT EVENT HANDLER FUNCTION
    const onSelectEventHandler = (slotInfo) => {
        console.log('onSelectEventHandler')
        console.log("type slotInfo.participants[0] =", typeof slotInfo.participants[0])
        setEventDetails(slotInfo)

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
                        handleDeleteEvent(slotInfo);
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
        let background = (current_time>event_time) ? '#DE6987' : '#8CBD4C'; // Colours for events in calendar: weekend and weekdays (I think)
        return {
            style: {
                backgroundColor: background
            }
        };
    }

    const onSelectEventSlotHandler = (slotInfo) => {
        openPopupForm(slotInfo); //OPEN POPUP FOR CREATE/EDIT EVENT
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
                       placeholder={"Add a description"}
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
                        views={['month', 'agenda']}
                        startAccessor="start"
                        endAccessor="end"
                        eventPropGetter={(eventStyleGetter)}
                        onSelectEvent={(slotInfo) => onSelectEventHandler(slotInfo)}
                        onSelectSlot={(slotInfo) => onSelectEventSlotHandler(slotInfo)}
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
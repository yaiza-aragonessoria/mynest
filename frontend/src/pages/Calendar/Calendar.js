import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Popup from "react-popup";
import "./popup.css";
import uuid from "react-uuid";

// STYLES
import "./Calendar.css";
import {
  CalendarPageWrapper,
  CalendarFormWrapper,
  CalendarWrapper,
} from "./Calendar.styled";
import {useSelector} from "react-redux";
import MustHaveHome from "../../components/MustHaveHome/MustHaveHome";
import MustLogIn from "../../components/MustLogIn/MustLogIn";

/* sources:
https://www.youtube.com/watch?v=lyRP_D0qCfk
https://codesandbox.io/s/sksajureact-redux-event-calendar-n5her?file=/src/components/calender.js:665-980
 */

// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment); // or globalizeLocalizer

const HomeCalendar = (props) => {
  const access = localStorage.getItem("access");
  const headers = {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userData = useSelector(store => store.userProfile.userProfileSlice)
  const [hasUserHome, setHasUserHome] = useState(false);
  const [homeMembers, setHomeMembers] = useState([]);
  const [checked, setChecked] = useState([]);
  const [updatedChecked, setUpdatedChecked] = useState([]);
  const [eventDetails, setEventDetails] = useState({});

  const getHomeMembers = async () => {
    try {
      setHomeMembers([]);
      const res = await axios.get(
        "https://mynest.propulsion-learn.ch/backend/api/users/home/",
        headers
      );
      setHomeMembers(res.data);
      // console.log("homeMembers =", homeMembers);
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  useEffect(() => {
    if (access) setIsLoggedIn(true);
    else setIsLoggedIn(false);
  }, [access]);

  const [errorMessage, setErrorMessage] = useState("");
  const [myEventsList, setMyEventsList] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    participants: [],
    notes: "",
  });

  const getEvents = async () => {
    try {
      setMyEventsList([]);
      const res = await axios.get(
        "https://mynest.propulsion-learn.ch/backend/api/events/home/",
        headers
      );
      setMyEventsList(res.data);
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  useEffect(() => {
    getEvents();
    getHomeMembers();
  }, []);

  const handleChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
    // console.log(newEvent)
  };

  // Add/Remove checked item from list
  const handleCheck = (event) => {
    let updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
    setNewEvent({ ...newEvent, participants: updatedList });
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();

    // console.log(newEvent)

    try {
      const res = await axios.post(
        "https://mynest.propulsion-learn.ch/backend/api/events/",
        newEvent,
        headers
      );
      getEvents();
      setNewEvent({
        title: "",
        start: "",
        end: "",
        participants: [],
        notes: "",
      });
      setChecked([]);
      setHomeMembers(homeMembers);
      // console.log(newEvent)
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  const handleAddEventFromCalendar = async (slotInfo) => {
    try {
      const res = await axios.post(
        "https://mynest.propulsion-learn.ch/backend/api/events/",
        slotInfo,
        headers
      );
      getEvents();
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  // DELETE EVENT
  const handleDeleteEvent = async (slotInfo) => {
    try {
      const res = await axios.delete(
        `https://mynest.propulsion-learn.ch/backend/api/events/${slotInfo.id}`,
        headers
      );
      getEvents();
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  // DELETE EVENT
  const handleUpdateEvent = async (slotInfo) => {
    for (let i = 0; i < slotInfo.participants.length; i++) {
      if (typeof slotInfo.participants[i] === "number")
        slotInfo.participants[i] = slotInfo.participants[i].toString();
    }

    try {
      const res = await axios.patch(
        `https://mynest.propulsion-learn.ch/backend/api/events/${slotInfo.id}`,
        slotInfo,
        headers
      );
      getEvents();
      // console.log("myEventsList =", myEventsList);
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  const makeParticipantsString = (participantsIds) => {
    const participantNames = [];

    participantsIds.map((participantId, index) => {
      for (const memberObj of homeMembers) {
        if (participantId === memberObj.id) {
          let name = memberObj.first_name
            ? memberObj.first_name
            : memberObj.email;
          participantNames.push(name);
        }
      }
    });
    // console.log("participantNames = ", participantNames)
    return participantNames.join(", ");
  };

  //RENDER SINGLE EVENT POPUP CONTENT
  const renderEventContent = (slotInfo) => {
    setEventDetails(slotInfo);

    const start = moment(slotInfo.start).format("MMMM D, YYYY");
    const end = moment(slotInfo.end).format("MMMM D, YYYY");
    const participants = makeParticipantsString(slotInfo.participants);
    const notes = slotInfo.notes;

    return (
      <div>
        {start === end ? (
          <p>Date: {start} </p>
        ) : (
          <p>
            Date: {start} - {end}
          </p>
        )}
        Participants: {participants}
        {notes && notes.length !== 0 ? <p>Description: {notes}</p> : null}
      </div>
    );
  };

  const isChecked = (memberId, participantsList) => {
    // console.log("isChecked is called")
    let isChecked = false;

    for (const participant of participantsList) {
      // console.log("participant =", participant)
      if (participant === memberId) {
        isChecked = true;
        break;
      }
    }
    return isChecked;
  };

  //POPUP-FORM FUNCTION FOR CREATE AND EDIT EVENT
  const openPopupForm = (slotInfo) => {
    setEventDetails(slotInfo);

    let isNewEvent = false;
    let popupTitle = "Update Event";
    if (!slotInfo.hasOwnProperty("id")) {
      slotInfo.title = "";
      slotInfo.start = null;
      slotInfo.end = null;
      slotInfo.participants = [];
      slotInfo.notes = "";
      popupTitle = "Create Event";
      isNewEvent = true;
    }

    const handleUpdate = (e) => {
      slotInfo = { ...slotInfo, [e.target.name]: e.target.value };
    };

    const handleUpdateCheck = (event) => {
      for (let i = 0; i < slotInfo.participants.length; i++) {
        if (typeof slotInfo.participants[i] === "number")
          slotInfo.participants[i] = slotInfo.participants[i].toString();
      }

      setEventDetails(slotInfo);

      let updatedList = [...slotInfo.participants];

      if (updatedList.indexOf(event.target.value) === -1) {
        updatedList = [...slotInfo.participants, event.target.value];
      } else {
        let index = updatedList.indexOf(event.target.value);
        updatedList.splice(index, 1);
      }
      setUpdatedChecked(updatedList);
      slotInfo.participants = updatedList;
      setEventDetails(slotInfo);
    };

    Popup.create({
      title: popupTitle,
      content: (
        <div>
          <input
            type={"text"}
            placeholder={"Add title"}
            name={"title"}
            defaultValue={slotInfo.title}
            onChange={handleUpdate}
          />
          <input
            type={"date"}
            name={"start"}
            defaultValue={slotInfo.start}
            onChange={handleUpdate}
          />
          <input
            type={"date"}
            name={"end"}
            defaultValue={slotInfo.end}
            onChange={handleUpdate}
          />
          {homeMembers.length !== 0 &&
            homeMembers.map((member, index) => {
              let memberName = member.first_name
                ? member.first_name
                : member.email;
              return (
                <>
                  <label id={index} htmlFor={memberName}>
                    <input
                      type={"checkbox"}
                      name={"participants"}
                      defaultChecked={isChecked(
                        member.id,
                        slotInfo.participants
                      )}
                      defaultValue={member.id}
                      onChange={handleUpdateCheck}
                    />
                    {memberName}
                  </label>
                </>
              );
            })}
          <input
            type={"text"}
            placeholder={"Add a description"}
            name={"notes"}
            defaultValue={slotInfo.notes}
            onChange={handleUpdate}
          />
        </div>
      ),
      buttons: {
        left: ["cancel"],
        right: [
          {
            text: "Save",
            className: "success",
            action: function () {
              console.log("action button");
              //CHECK THE ID PROPERTY FOR CREATE/UPDATE
              if (isNewEvent) {
                setNewEvent(slotInfo);
                handleAddEventFromCalendar(slotInfo); //EVENT CREATE ACTION
              } else {
                handleUpdateEvent(slotInfo); //EVENT UPDATE ACTION
              }
              Popup.close();
            },
          },
        ],
      },
    });
  };

  //ON SELECT EVENT HANDLER FUNCTION
  const onSelectEventHandler = (slotInfo) => {
    // console.log('onSelectEventHandler')
    // console.log("type slotInfo.participants[0] =", typeof slotInfo.participants[0])
    setEventDetails(slotInfo);

    Popup.create({
      title: slotInfo.title,
      content: renderEventContent(slotInfo),
      buttons: {
        right: [
          {
            text: "Edit",
            className: "info",
            action: function () {
              Popup.close(); //CLOSE PREVIOUS POPUP
              openPopupForm(slotInfo); //OPEN NEW EDIT POPUP
            },
          },
          {
            text: "Delete",
            className: "danger",
            action: function () {
              //CALL EVENT DELETE ACTION
              handleDeleteEvent(slotInfo);
              Popup.close();
            },
          },
        ],
      },
    });
  };

  //EVENT STYLE GETTER FOR SLYLING AN EVENT ITEM
  const eventStyleGetter = (event, start, end, isSelected) => {
    let current_time = moment().format("YYYY MM DD");
    let event_time = moment(event.start).format("YYYY MM DD");
    let background = current_time > event_time ? "#DE6987" : "#8CBD4C"; // Colours for events in calendar: past events and comming events (I think)
    return {
      style: {
        backgroundColor: background,
      },
    };
  };

  const onSelectEventSlotHandler = (slotInfo) => {
    openPopupForm(slotInfo); //OPEN POPUP FOR CREATE/EDIT EVENT
  };

  return (
      <>
      {isLoggedIn ? hasUserHome ?
            <>
              {isLoggedIn ? (
                <CalendarPageWrapper className="text">
                  <CalendarFormWrapper>
                    <input
                      className="add_event_input"
                      type="text"
                      placeholder="Add title"
                      name="title"
                      value={newEvent.title}
                      onChange={handleChange}
                    />

                    <div className="date_input">
                      <div className="date_input_from">
                        <p>from</p>
                        <input
                          type="date"
                          name="start"
                          value={newEvent.start}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="date_input_until">
                        <p>until</p>
                        <input
                          type="date"
                          name="end"
                          value={newEvent.end}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="participants text">
                      {homeMembers.length !== 0 &&
                        homeMembers.map((member, index) => {
                          let memberName = member.first_name
                            ? member.first_name
                            : member.email;
                          return (
                            <div className="participant">
                              <label id={index.toString()} htmlFor={memberName}>
                                <input
                                  type="checkbox"
                                  id={uuid()}
                                  name="participants"
                                  value={member.id}
                                  onChange={handleCheck}
                                />
                                {memberName}
                              </label>
                            </div>
                          );
                        })}
                    </div>

                    <input
                      className="add_event_input"
                      type="text"
                      name="notes"
                      placeholder={"Add a description"}
                      value={newEvent.notes}
                      onChange={handleChange}
                    />
                    <button className="btn_blue" type="submit" onClick={handleAddEvent}>
                      Add Event
                    </button>
                  </CalendarFormWrapper>

                  <CalendarWrapper>
                    <Calendar
                      popup
                      selectable
                      localizer={localizer}
                      events={myEventsList}
                      views={["month", "agenda"]}
                      startAccessor="start"
                      endAccessor="end"
                      eventPropGetter={eventStyleGetter}
                      onSelectEvent={(slotInfo) => onSelectEventHandler(slotInfo)}
                      onSelectSlot={(slotInfo) => onSelectEventSlotHandler(slotInfo)}
                      style={{ height: 500, margin: "50px" }}
                    />
                  </CalendarWrapper>

                  <Popup />
                </CalendarPageWrapper>
              ) : (
                <div>
                  <p className="header">You must be logged in first</p>
                </div>
              )}
            </>
          : <MustHaveHome/> : <MustLogIn/>
      }
      </>
  );
};

export default HomeCalendar;

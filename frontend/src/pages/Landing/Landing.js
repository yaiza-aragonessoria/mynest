import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import homepage_laptop from "../../assets/homepage_laptop.png"


import {
  Wrapper,
} from "./Landing.styled";

const Landing = () => {
  const navigate = useNavigate();
  const access = localStorage.getItem("access");


    useEffect(() => {
    if (access) {
        navigate("/dashboard");
        window.location.reload();
      }
    }, []);


  return (
    <Wrapper>
      <div className='info-laptop'>
        <div className="left_container">
          <h1 className="">The easiest way to  organise your shared space</h1>
          <h2>
            Shared shopping list, to-do list, calendar, dashboard and expense manager in one single place.
          </h2>
          <button className='btn_purple' onClick={() => navigate('/sign-up')}>Sign up now</button>
        </div>
        <div className="right_container">
          <img src ={homepage_laptop}></img>
        </div>
      </div>

      <div id='why' className='why'>
        <h3>
          Why? {/*Maybe the "why" title is not actually necessary?*/}
        </h3>
        <div className='feature'>
          <div>
            logo shopping list
          </div>
          <div>
            Tired of forgetting your grocery list at home? Planning shared shopping is easier with My Nest.
            As soon as a Nest member adds a new item to the shopping list, it's in your pocket.
          </div>
        </div>
        <div className='feature'>
          <div>
            logo shared expenses
          </div>
          <div>
            Get rid of the cumbersome spreadsheet or pocket calculator. My Nest keeps track of all shared expenses and calculates your personal balance for you at any time.
          </div>
        </div>
        <div className='feature'>
          <div>
            logo board
          </div>
          <div>
            "Spoken words fly, written words remain".
            Write your message on the common board.
            And don't forget to pin it when it is important!
          </div>
        </div>
        <div className='feature'>
          <div>
            logo tasks
          </div>
          <div>
            No one remembers to water the plants?
            With My Nest you can easily coordinate with your Nest members to distribute tasks.
            Keep track of what has been done and what tasks remain to do.
          </div>
        </div>
        <div className='feature'>
          <div>
            logo calendar
          </div>
          <div>
            Never forget a birthday or get surprised by a party at your place.
            My Nest's shared calendar keeps you informed of everything going on in your Nest.
          </div>
        </div>
      </div>

      <div id='how' className='how'>
        <h3>
          How will you use My Nest?
        </h3>
        <div>
          <div>
            Shared living
          </div>
          <div>
            Living together can be messy and disorganized, but not with My Nest.
            With My Nest splitting bills is easy, sharing tasks is fair and communication is clear.
          </div>
        </div>
        <div>
          <div>
            Coworking spaces
          </div>
          <div>
            Your working environment becomes more organized and coordinated with My Nest.
            Now it is easy to keep track of who is at office, meeting-room bookings, and shared expenses.
          </div>
        </div>
        <div>
          <div>
            Group activities
          </div>
          <div>
            Do you share a rehearsal space with your music band? Do you meet with your chess club every Wednesday?
            Managing shared spaces easily is now possible with My Nest.
            Have an overview of who is attending the meeting, easily distribute expenses and keep track of to-dos.
          </div>
        </div>
      </div>

    </Wrapper>
  );
};

export default Landing;

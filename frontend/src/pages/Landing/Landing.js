import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { setAuth } from "../../features/slices/authSlice";
import logo_purple from "../../assets/logo_purple.png"
import homepage_laptop from "../../assets/homepage_laptop.png"


import {
  ErrorMessage,
  FormFields,
  LoginTitle,
  LoginWrapper,
  SignIn,
  Wrapper,
} from "./Landing.styled";
import HeaderOutside from "../../components/HeaderOutside/HeaderOutside";


const Landing = () => {
  const navigate = useNavigate();


  return (
    <Wrapper>
      <div className='info-laptop'>
        <div className="left_container">
          <h1 className="">The easy way to  organise your shared space</h1>
          {/*<h1 className="">The <br/> easy way <br/> to  organise <br/> your shared <br/> space</h1>*/}
          <h2>
            Shared shopping list, task list, calendar, board and expense manager in one single place.
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
            Tired of forgetting the shopping list at home?
            Planning shared groceries becomes simpler with My Nest.
            At the very moment that a Nest member adds a new item to the shopping list, you have it in your pocket.
          </div>
        </div>
        <div className='feature'>
          <div>
            logo shared expenses
          </div>
          <div>
            Get rid of the unhandy spreadsheet or pocket calculator.
            My Nest keeps track of all shared expenses and computes for you the personal balance at any time.
          </div>
        </div>
        <div className='feature'>
          <div>
            logo board
          </div>
          <div>
            "Spoken words fly away, written words remain".
            Write down your message in the common board.
            And don't forget to pin it when it is important!
          </div>
        </div>
        <div className='feature'>
          <div>
            logo tasks
          </div>
          <div>
            No one remembers to water the plants?
            Using My Nest you can easily coordinate with your Nest members to distribute tasks.
            Keep track of what has been done and which tasks remain to do.
          </div>
        </div>
        <div className='feature'>
          <div>
            logo calendar
          </div>
          <div>
            Never forget a birthday or get surprised by a party at your place. //
            The shared calendar of My Nest keeps you informed of everything that happens in your Nest.
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
            Living together can be messy and disorganised, but not with My Nest.
            Wiht My Nest splitting bills is easy, sharing tasks is fair and communication is clear.
          </div>
        </div>
        <div>
          <div>
            Coworking spaces
          </div>
          <div>
            Your working environment becomes more organized and coordinated with My Nest.
            Keeping track of who is at office, meeting-room bookings, and shared expenses is now easy.
          </div>
        </div>
        <div>
          <div>
            Group activities
          </div>
          <div>
            Do you share a rehearsal room with your band? Do you meet your chess club every Wednesday?
            Managing shared spaces in a simple manner is now possible with My Nest.
            Have an overview of who is attending the meeting, distribute easily expenses and keep track of tasks to be done.
          </div>
        </div>
      </div>

    </Wrapper>
  );
};

export default Landing;

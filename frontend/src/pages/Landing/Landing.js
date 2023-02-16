import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import homepage_laptop from "../../assets/homepage_laptop.png";
import demo from "../../assets/demo.gif";

import { Wrapper } from "./Landing.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faSackDollar, faComments, faListCheck, faCalendarCheck } from "@fortawesome/free-solid-svg-icons";

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

      <div id="info_laptop" className="info_laptop">
        <div className="left_container">
          <h1>The easiest way
          <br></br> 
          to organise your<br></br> shared space</h1>
          <h2>
            Share your shopping list, to-do list, calendar, dashboard and
            expense manager in one single place.
          </h2>
          <button id="landing_btn" onClick={() => navigate("/sign-up")}>
            Sign up now
          </button>
        </div>

        <div className="right_container">
          <img src={demo} alt="laptop with screenshot" id="laptop_picture" />
        </div>
      </div>



      <div id="about" className="about">
        <div className="feature accent_feature">
          <h3>Everything you might need is just in one place.</h3>
        </div>

        <div className="feature">
          <i><FontAwesomeIcon icon={faCartPlus}/></i>
          <span>
            Plan a shared shopping with My Nest. As soon as a Nest member adds a
            new item to the shopping list, it's in your pocket.
          </span>
        </div>

        <div className="feature">
          <i><FontAwesomeIcon icon={faSackDollar}/></i>
          <span>
            Get rid of the cumbersome spreadsheet or pocket calculator. My Nest
            keeps track of all shared expenses and calculates your personal
            balance for you at any time.
          </span>
        </div>

        <div className="feature">
          <i><FontAwesomeIcon icon={faComments}/></i>
          <span>
            "Spoken words fly, written words remain". Write your message on the
            common board. And don't forget to pin it when it is important!
          </span>
        </div>

        <div className="feature">
          <i><FontAwesomeIcon icon={faListCheck}/></i>
          <span>
            Coordinate with your Nest members to distribute the tasks. Keep
            track of what has been done and what tasks remain to do.
          </span>
        </div>

        <div className="feature">
          <i><FontAwesomeIcon icon={faCalendarCheck}/></i>
          <span>
            Never forget a birthday or get surprised by a party at your place.
            My Nest's shared calendar keeps you informed of everything going on
            in your Nest.
          </span>
        </div>
      </div>

      <div id="how" className="how">
        <div className="how_header">
          <h3>How will you use My Nest?</h3>
          <button className="btn_purple" onClick={() => navigate("/sign-up")}>
            Sign up now
          </button>
        </div>

        <div>
          <h4>Shared living</h4>
          <span>
            Living together can be messy and disorganized, but not with My Nest.
            With My Nest splitting bills is easy, sharing tasks is fair and
            communication is clear.
          </span>
        </div>

        <div>
          <h4>Coworking spaces</h4>
          <span>
            Your working environment becomes more organized and coordinated with
            My Nest. Now it is easy to keep track of who is at office,
            meeting-room bookings, and shared expenses.
          </span>
        </div>

        <div>
          <h4>Group activities</h4>
          <span>
            Do you share a rehearsal space with your music band? Do you meet
            with your chess club every Wednesday? Managing shared spaces easily
            is now possible with My Nest. Have an overview of who is attending
            the meeting, easily distribute expenses and keep track of to-dos.
          </span>
        </div>
      </div>
    </Wrapper>
  );
};

export default Landing;

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
  console.log("Landing page")


  return (
      <>
      <HeaderOutside />
    <Wrapper>
      <div className='info-laptop'>
        <div className="left_container">
          <h1 className="">The easy way to  organise your shared space</h1>
          {/*<h1 className="">The <br/> easy way <br/> to  organise <br/> your shared <br/> space</h1>*/}
          <h2>
            Shared shopping list, task list, calendar, board and expense manager in one single place.
          </h2>
          <button className='btn_purple'>Sign up now</button>
        </div>
        <div className="right_container">
          <img src ={homepage_laptop}></img>
        </div>
      </div>

      <div className='why'>
        <h3>
          Why?
        </h3>
        <div className='feature'>
          <div>
            logo shopping list
          </div>
          <div>Shopping List text</div>
        </div>
        <div className='feature'>
          <div>
            logo shared expenses
          </div>
          <div>
            Shared expenses text
          </div>
        </div>
        <div className='feature'>
          <div>
            logo board
          </div>
          <div>
            board text
          </div>
        </div>
        <div className='feature'>
          <div>
            logo tasks
          </div>
          <div>
            tasks text
          </div>
        </div>
        <div className='feature'>
          <div>
            logo calendar
          </div>
          <div>
            calendar text
          </div>
        </div>
      </div>

      <div className='how'>
        <h3>
          How?
        </h3>
        <div>
          text for sharing a flat/house
        </div>
        <div>
          text for sharing a space (rehersal room for music band)
        </div>
      </div>

    </Wrapper>
      </>
  );
};

export default Landing;

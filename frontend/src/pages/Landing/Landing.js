import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { setAuth } from "../../features/slices/authSlice";
import logo_purple_horizontal from "../../assets/logo_purple_horizontal.png"
import homepage_laptop from "../../assets/homepage_laptop.png"

import {
  ErrorMessage,
  FormFields,
  LoginTitle,
  LoginWrapper,
  SignIn,
  Wrapper,
} from "./Landing.styled";


const Landing = () => {
  console.log("Landing page")


  return (
    <Wrapper>
        <div className='top'>
            <img src={logo_purple_horizontal}/>
        </div>
        <div className='down'>
      <div className="left_container">
        <h1 className="">The easy way to  organise your shared space</h1>
        {/*<h1 className="">The <br/> easy way <br/> to  organise <br/> your shared <br/> space</h1>*/}
        <h2>
          Shared shopping list, task list, calendar, board and expense manager in one single place.
        </h2>
      </div>
      <div className="right_container">
        <img src ={homepage_laptop}></img>
      </div>
        </div>
    </Wrapper>
  );
};

export default Landing;

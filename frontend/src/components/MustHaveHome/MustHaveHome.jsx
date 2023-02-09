import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import {setAuth} from "../../features/slices/authSlice";
import {useSelector} from "react-redux";
import {Box, Text, Wrapper} from "./MustHaveHome.styles";


const MustHaveHome = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Box>
        <Text className='header'>
          You must join a Nest first.
        </Text>
        <button className="btn_purple" onClick={() => navigate('/profile')}>
            Continue to user profile
        </button>
        </Box>
    </Wrapper>
  );
}

export default MustHaveHome
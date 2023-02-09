/*purple background*/

import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: var(--maincontainer);
`

export const Box = styled.div`
  z-index: 3;
  height: 150px;
  width: 350px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin: 4rem auto 1rem;
  
  background-color: #f8f5ff;
  box-shadow: 0 2px 5px rgb(0 0 0 / 0.15);}
  
  //background: linear-gradient(328deg, rgba(248,245,255,1) 0%, rgba(114,57,234,0.5) 80%);
  
  button {
    margin: 20px 10px 10px;
  }
`

export const Text = styled.div`
  z-index: 3;
  width: fit-content;
  border: none;
  padding: 10px;
`
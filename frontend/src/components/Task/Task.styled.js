import styled from "styled-components";

export const TaskContainer = styled.div`
display: grid;
height: 10vh;
align-items: center;
grid-template-columns: 2fr 1fr 1fr 7rem;
width: 80%;
padding-left: 2rem;
padding-right: 1rem;
background-color: #f8f5ff;
box-shadow: 0 2px 5px rgb(0 0 0 / 0.15);
border-radius: 15px;
/* background-color: ${props => props.taskstatus === 'DO'? 'green' : 'red'}; */


p {
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 20px;
  color: #181C32;
}

`

export const Buttons = styled.div`

display: flex;
align-items: center;
justify-content: flex-end;
width: 100%;
height: 100%;
gap: 7px;
/* border: 1px solid black; */
/* position: relative;
left: 2rem; */


`

export const IconStatus = styled.div`
button {
  border: none;
  cursor: pointer;
  }
`

export const IconEdit = styled.div`
button {
  border: none;
  cursor: pointer;
  }
`

export const IconDelete = styled.div`
button {
  border: none;
  cursor: pointer;
  }
`





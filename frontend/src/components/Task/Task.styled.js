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

img {
    /* height: 2.5rem;
    width: 2.5rem; */
    border-radius: 50%;
    vertical-align: middle;
    height: 2.5rem;
    object-fit: cover;
    
    }




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
gap: 20px;

i {
  font-size: 18px;
  cursor: pointer;
  opacity: 0.4;
  color: #7E8299;
  opacity: 0.7;

}

i:hover{
  color: #7239EA;
  font-size: 20px;
}

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
export const StatusColor = styled.div`
justify-content: center;

p {
  border-radius: 8px;
  background-color: ${props => props.taskstatus === 'TD'? 'rgb(193,165,255)': props.taskstatus ==='IP'? '#B5B5C3' : '#DCFDFD'};
 
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 12px;
  border: 1px dashed grey;
  padding: 0.7rem;
  width: 114px;
  text-align: center;
  

}

`




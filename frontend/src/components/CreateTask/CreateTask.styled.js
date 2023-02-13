import styled from "styled-components"

export const CreateTaskPage = styled.div`
position: relative;
display: flex;
flex-direction: column;
border: 2px solid rgba(114, 57, 234, 0.36);
box-shadow: 0 3px 7px rgb(0 0 0 / 0.15);
justify-content: center;
border-radius: 15px;
padding: 1rem;
align-items: center;
background-color: #fff;
height: 50%;
width: 35%;
form {
    width: 55%;

    button {
      margin-right: 15px;
      width: 150px;
    }


  }

`
export const FormField = styled.div`
    display: flex;
    flex-direction: column;
    
    label {
    padding-left: 5px;
    padding-bottom: 5px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 13.975px;
    line-height: 21px;
    color: #7E8299;
  }

  select {
    margin-top: 5px;
    padding: 10px;
    border: 1px solid #b5b5c3;
    border-radius: 15px;
    margin-bottom: 15px;

    option {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 600;
      font-size: 13.975px;
      line-height: 21px;
      color: #7E8299;
      background: white;
    }
  }
  
    input {
    margin-bottom: 15px;
    padding: 10px;
    border: 1px solid #b5b5c3;
    border-radius: 15px;
    }


`;

export const PopPage = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
background: rgb(248,245,255);
background: linear-gradient(328deg, rgba(248,245,255,0.6208858543417367) 0%, rgba(114,57,234,0.36318277310924374) 59%);

`
export const Buttons = styled.div`
display: flex;
justify-content: center;
padding-top: 25px;


`



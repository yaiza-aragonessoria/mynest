import styled from "styled-components"

export const CreateTaskPage = styled.div`
position: relative;
display: flex;
flex-direction: column;
height: 98vh;
justify-content: space-around;
align-items: center;
border: 1px solid black;
background-color: white;
height: 70vh;
width: 45%;


button {
        width: 140px;
        height: 40px;
        background:black;
        font-size: 12px;
        color: white;
        border: none;
        cursor: pointer;
        margin-top: 50px;
    }
`
export const FormField = styled.div`
    
    display: flex;
    flex-direction: column;
    
    
    label, select {
            font-weight: 600;
            color: black;
            padding: 15px 0px;
    }
  
    input {
            height: 100%;
            flex-grow: 1;
            border-radius: 2px;
            border: 1px solid lightgray;
            padding: 15px;
    }


`;

export const PopPage = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100vh;
background-color: rgba(0, 0, 0, 0.2) ;
display: flex;
justify-content: center;
align-items: center;


    
`

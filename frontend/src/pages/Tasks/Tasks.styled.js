import styled from "styled-components";

export const MainContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - var(--navheight));
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

export const Description = styled.div`
display: flex;
justify-content: space-around;
gap: 8rem;
width: 60%;
margin-left: 5rem;

h3 {
  font-style: normal;
  font-weight: 600;
  font-size: 19px;
  line-height: 21px;
  color: #181C32;
}

`
export const TopPage = styled.div`
height: 30vh;

h1 {
  margin-top: 3rem;
  margin-left: 33rem;
  font-style: normal;
  font-weight: 600;
  font-size: 25px;
  line-height: 22px;
  color: #181C32;
  padding-bottom: 4px;
  
}

input {
    width: 40%;
    justify-content: center;
    padding: 10px;
    border: 1px solid #b5b5c3;
    border-radius: 15px;
    justify-content: center;
    margin-left: 25rem;
    margin-top: 2rem;
  }

  input:focus {
    background-color: #f8f5ff;
  }

  button {
    margin-top: 1rem;
    margin-left: 3rem;
  }

`
export const TasksContainer = styled.div`
display: flex;
flex-direction: column;
gap: 15px;
align-items: center;
width: 100vw;
margin-right: 50px;

`
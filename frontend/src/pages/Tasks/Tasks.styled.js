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
justify-content: space-between;
width: 65%;
margin-left: 9rem;

h3 {
  font-style: normal;
  font-weight: 600;
  font-size: 19px;
  line-height: 21px;
  color: #181C32;
  opacity: 0.8;
  padding-right: 4rem;
}

`

export const StatusHeader = styled.div`
position: relative;
left: 7rem;

`
export const TopPage = styled.div`
height: 32vh;
/* border: 1px solid black; */




/* input {
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
  } */



`
export const TasksContainer = styled.div`
display: flex;
flex-direction: column;
gap: 15px;
align-items: center;
width: 100vw;
margin-right: 50px;

`

export const Header = styled.div`
display: flex;
align-items: center;
width: 100vw;
height: 7vh;
margin-top: 1.5rem;
margin-left: 7.5rem;

h1 {
  font-size: 27px;
  line-height: 22px;
  color: #181C32;
  margin-right: 4rem;
  font-style: normal;
  font-weight: 600;
  line-height: 22px;
  color: #181C32;
  padding-bottom: 4px;
  border-bottom: 2px solid #c1a5ff;
}


  
`

export const SearchBar = styled.div`
display: flex;
/* border: 1px solid black; */
height: 20vh;
align-items: center;
margin-left: 7.5rem;
width: 100vw;

input {
    width: 40vw;
    justify-content: center;
    padding: 10px;
    border: 1px solid #b5b5c3;
    border-radius: 15px;
    justify-content: center;
    margin-right: 4rem ;
   
  }

  input:focus {
    background-color: #f8f5ff;
  }

button {
  /* width: 170px; */
}


`
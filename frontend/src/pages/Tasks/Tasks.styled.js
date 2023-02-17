import styled from "styled-components";

export const MainContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - var(--navheight));
  justify-content: center;
  display: flex;
  flex-direction: column;
  background-color: var(--color-orange-light);
  padding-bottom: 1rem;
`;

export const Description = styled.div`
display: flex;
justify-content: space-around;
width: 69%;
padding-left: 9rem;
gap: 15rem;


h3 {
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 21px;
  color: #181C32;
  opacity: 0.8;
  padding-right: 4rem;
}

`

export const StatusHeader = styled.div`
position: relative;
left: 8rem;

`
export const AssigneeHeader = styled.div`
position: relative;
right: 3rem;

`
export const TopPage = styled.div`
height: 32vh;

`

export const TasksContainer = styled.div`
display: flex;
flex-direction: column;
gap: 15px;
align-items: center;
//width: 100vw;

`

export const Header = styled.div`
display: flex;
align-items: center;
//width: 100vw;
height: 7vh;
margin-top: 1.5rem;
padding-left: 7.5rem;

h1 {
  font-size: 20px;
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
height: 20vh;
align-items: center;
padding-left: 7.5rem;
//width: 100%;

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
  background-color: #f4bf04;
  color: #fff;
  min-height: 40px;
  border-radius: 8px;  
  padding: 7px 25px;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  border: none;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.15);
  text-align: center;
  text-transform: uppercase;
  cursor: pointer;

}

button:hover {
  background-color: #7239EA;
  color: #fff;
  border: 1px solid #7239EA;
  background-image: none;
}


`
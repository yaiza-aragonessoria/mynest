import styled from "styled-components";

export const HomeWrapper = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
  
  padding: 20px 5%;
  background-color: var(--color-orange-light);
`;

export const HomeDetails = styled.div`
  display: flex;
  flex-direction: column;
  
   h1, h2 {
    text-align: center;
    margin: 0;
  }
  h1 {
    font-size: 32px;
  }
  h2 {
    font-size: 16px;
  }
  
  div.home-members {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    
    margin: 10px 0;
  }
  div.member {
    
    img {
      height: 60px;
      border-radius: 50%;
      vertical-align: middle;
    }
    
    span {
      margin-left: 10px;
    }
  }
`;

export const StickersContainer = styled.div`
  input {
    width: 70%;
    padding: 10px;
    border: 1px solid #b5b5c3;
    border-radius: 15px;
    outline:none;
  }
  
  div.sticker-board {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  
`;



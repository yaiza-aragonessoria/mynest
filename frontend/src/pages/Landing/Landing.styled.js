import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: var(--maincontainer);
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--color-orange-light);
  //gap: 10px;
  
  .info-laptop {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-bottom: 50px;
    
    h1 {
      font-size: 60px;
      width: 75%;
    }
    
    h2 {
      font-size: 30px;
      width: 70%;
    }
    
    .left_container {
      width: 50%;
      margin: 50px 50px 50px 100px;
      
    }
    
    .right_container {
      width: 50%;
      margin: 50px 100px 50px 50px;
      
    }
    
    img {
      width: 800px;
    }
  }
  
  .why, .how {
    display: flex;
    flex-wrap: wrap;
    font-size: 25px;
    margin: 50px;
    
    h3 {
      width: 100%;
    }
    
    .feature {
      width: 400px;
    }
  }
  
  
  

`;

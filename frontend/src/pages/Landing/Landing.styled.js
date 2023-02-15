import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: calc(100vh - var(--footerheight));
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--color-orange-light);
  //gap: 10px;
  
  .top {
    width: 100vw;
    margin-bottom: 100px;
    
    img {
      width: 200px;
      padding: 10px;
      margin-top: 30px;
      margin-left: 100px
    }
  }
  
  .down {
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
  

`;

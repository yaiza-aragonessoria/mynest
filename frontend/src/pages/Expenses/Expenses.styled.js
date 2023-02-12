import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: var(--maincontainer);
  width: 100%;
  justify-content: center;
  display: flex;
  
  flex-direction: column;
  text-align: center;
  
`

// export const

export const Parent = styled.div`
  //width: 90%;
  //min-height:100% ;
  //flex-wrap: wrap;
  //justify-content: center;
  //display: inline-block;
  //flex-direction: column;
  ////background: red;
  //align-items: end;
  
    width: 100%;
  display: flex;
  justify-content: center;

  //button {
  //  width: 155px;
  //  margin-bottom: 15px;
  //}
  
  @media screen and (min-width: 1900px) {
    width: 70%;
  }
  
  
   @media screen and (min-width: 1600px) {
    width: 75%;
  }
  @media screen and (min-width: 1400px)  and (max-width: 1900px){
    width: 80%;
  }
`


export const ChildDiv = styled.div`
  //width: 45%;
  background-color: #ddd;
  padding: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  button {
    width: 155px;
  }
`;

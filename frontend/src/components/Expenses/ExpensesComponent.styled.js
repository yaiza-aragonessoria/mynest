import styled from 'styled-components';


export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

`
export const MainContainer = styled.div`
  width: 90%;
  display: flex;
  border: 1px dashed #A1A5B7;
  border-radius: 15px;
  height: 100px;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;

  
  @media screen and (min-width: 1900px) {
    width: 70%;
  }
  
  
   @media screen and (min-width: 1600px) {
    width: 75%;
  }
  @media screen and (min-width: 1400px) {
    width: 80%;
  }
`


export const Column = styled.div`
  flex: 1;
  padding: 10px;
  text-align: center;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 13.975px;
  line-height: 21px;
  color: #7E8299;
`

export const Buttons = styled.div`{
  display: flex;
  flex-direction: column;
  margin-bottom: 7px;
  flex-wrap: wrap;
;
  align-items: center;

  button {
    width: 155px;
  }

  @media only screen and (min-width: 500px) and (max-width: 740px) {
    button {
      width: 95px;
    }
  }
}
`;





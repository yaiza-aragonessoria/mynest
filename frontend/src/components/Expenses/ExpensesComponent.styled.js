import styled from 'styled-components';


export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

`
export const MainContainer = styled.div`
  width: 100%;
  display: flex;
  border-radius: 15px;
  height: 100px;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  background: white;

  
  @media screen and (min-width: 500px) {
    height: 120px;
  }

  
  // @media screen and (min-width: 1600px) {
  //  //width: 75%;
  //}
  //@media screen and (min-width: 1400px) {
  //  //width: 80%;
  //}
  //  @media screen and (min-width: 1900px) and (max-width: 2540px) {
//    margin-left: 155px;
//    background: blue;}
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
  
   i {
    font-size: 14px;
    color: #7e8299;
  }

  .add_to_fav:hover,
  .delete_item:hover {
   color: #7239EA;
   font-size: 17px;
  }

  .add_to_fav:active,
  .delete_item:active {
   color: #7e8299;
   font-size: 14px;
  }

  @media only screen and (min-width: 500px) and (max-width: 740px) {
    button {
      width: 95px;
    }
  }
}
`;





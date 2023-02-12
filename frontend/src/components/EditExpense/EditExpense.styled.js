import styled from 'styled-components';

export const ExpensesComponentStyled = styled.section`
{
  min-height: 100%;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  position: fixed;
  background: rgb(248, 245, 255);
  background: linear-gradient(328deg, rgba(248, 245, 255, 0.6208858543417367) 0%, rgba(114, 57, 234, 0.36318277310924374) 59%);
  display: flex;
  justify-content: center;
  align-items: center;
}`

export const PopupWrapper = styled.div`

  z-index: 3;
  position: fixed;
  width: 35%;
  background-color: #fff;
  border: 2px solid #246fbd;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  box-shadow: 0 3px 7px rgb(0 0 0 / 0.15);

  //form {
  //  width: 55%;
  //
  //  button {
  //    margin-right: 15px;
  //    width: 150px;
  //  }

  //  button {
  //    margin-right: 15px;
  //    width: 150px;
  //  }
  //
  //
  //}

`

export const FormFields = styled.div`
  display: flex;
  flex-direction: column;

  input {
    margin-bottom: 15px;
    padding: 10px;
    border: 1px solid #b5b5c3;
    border-radius: 15px;
  }

  label {
    padding-left: 5px;
    padding-bottom: 5px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 13.975px;
    line-height: 21px;
    color: #7E8299;
  }

  select {
    margin-top: 5px;
    padding: 10px;
    border: 1px solid #b5b5c3;
    border-radius: 15px;
    margin-bottom: 15px;

    option {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 600;
      font-size: 13.975px;
      line-height: 21px;
      color: #7E8299;
      background: white;
    }
  }
`

export const PopupBg = styled.div`
width: 100%;
min-height: 100%;
top: 0;
left: 0;
z-index: 3;
position: fixed;
background: rgb(248,245,255);
background: linear-gradient(328deg, rgba(248,245,255,0.6208858543417367) 0%, rgba(114,57,234,0.36318277310924374) 59%);
display: flex;
justify-content: center;
align-items: center;


`


export const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: 25px;

`

export const SharedCheckbox = styled.div`
  display: flex;
  flex-direction: row !important;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 13.975px;
  line-height: 21px;
  color: #7E8299;
  background: white;

  label {
    padding: 15px;
  }
`


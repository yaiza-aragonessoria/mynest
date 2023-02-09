import styled from 'styled-components';

export const ExpensesComponentStyled = styled.section`
{
  width: 100%;
  height: 100%;
  z-index: 3;
  position: fixed;
  background: rgb(248, 245, 255);
  background: linear-gradient(328deg, rgba(248, 245, 255, 0.6208858543417367) 0%, rgba(114, 57, 234, 0.36318277310924374) 59%);
  display: flex;
  justify-content: center;
  align-items: center;


  span {
    margin-right: 15px;
  }
}`

export const PopupWrapper = styled.div`
  z-index: 3;
  height: 50%;
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

  form {
    width: 55%;

    input:focus {
      background-color: #f8f5ff;
      border: 1px solid #a90f1a !important;
    }
    button {
      margin-right: 15px;
      width: 150px;
    }
  }

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
    padding-bottom: 5px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 13.975px;
    line-height: 21px;
    /* identical to box height, or 150% */

    //display: flex;
    //align-items: center;

    color: #7E8299;
  }

  select {
    margin-top: 5px;
    padding: 10px;
    border: 1px solid #b5b5c3;
    border-radius: 15px;
    margin-bottom: 15px;
  }

  input:focus {
    background-color: #f0ffff;
    border: 1px solid #a90f1a !important;
  }
`


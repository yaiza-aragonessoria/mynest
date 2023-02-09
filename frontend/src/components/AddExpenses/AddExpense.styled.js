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
  height: 35% ;
  position: fixed;
  width: 50%;
  background-color: #fff;
  border: 2px solid #7239EA;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  box-shadow: 0 3px 7px rgb(0 0 0 / 0.15);

`
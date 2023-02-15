import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: var(--maincontainer);
  width: 100%;
  justify-content: flex-start;
  display: flex;
  background-color: var(--color-orange-light);
  flex-direction: column;
  align-items: center;
  //background: #7239EA;

`

export const Parent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 45px;

`

export const ComponentWrapper = styled.div`
  width: 80%;
  justify-content: center;
  display: flex;
  flex-direction: column;
  margin-top: 5rem;
  
  .loading {
    display: flex;
    justify-content: center;
    
    img {
      width: 50px;
      height: 50px;
      margin-top: 100px;
    }

  }


`

export const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

`

export const ExpensesHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;

`

export const ExpensesList = styled.div`
  width: 100%;
`

export const ExpensesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const SearchBar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 5px;

  form {
    button {
      width: 155px;
    }
  }

  h3 {
    margin-bottom: 30px;
  }

  input {
    width: 95%;
    padding: 10px;
    border: 1px solid #b5b5c3;
    border-radius: 15px;
    outline: none;
  }

`

export const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: inherit;
  flex-direction: column;
  align-items: end;

`
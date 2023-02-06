import styled from "styled-components"

export const MainWrapper = styled.div`
width: 100%;
display: flex;
justify-content: space-around;
margin-top: 3rem;


.left_main_container {
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
`

export const InputContainer = styled.div`
  width: 100%;

  form {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  input {
    width: 70%;
    padding: 10px;
    border: 1px solid #B5B5C3;
    border-radius: 15px;
  }

  input:focus {
    background-color: #F8F5FF;
  }

`;

export const ItemsContainer = styled.div`
width: 100%;
background-color: yellow;

.to_buy_header {
    display: flex;
    
}

`


import styled from "styled-components";

export const SignupWrapper = styled.div`
  min-height: var(--maincontainer);
  width: 100%;
  display: flex;
  background-color: var(--color-orange-light);

  .image_starter_page {
    max-height: var(--maincontainer);
    width: 50%;

    background-image: url("/assets/mynest_bg.jpg"),
      linear-gradient(132.96deg, #c468ff 3.32%, #ffd966 100%);
    background-blend-mode: multiply, normal;
    background-size: cover;
    opacity: 50%;
  }

  .right_container {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem 2rem;
  }

  .form_container {
    height: 70%;
  width: 50%;
  background-color: #fff;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid #7239ea;
  }

  h1 {
    margin-bottom: 3rem;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
  }

  input {
    width: 70%;
    margin: 0;
    padding: 0.5rem;
    border: 1px solid #b5b5c3;
    border-radius: 15px;
    outline: none;
    margin-bottom: 1.5rem;  
}

input:focus {
    background-color: #f8f5ff;
  }

  .have_account {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 14px;
    color: var(--color-grey);
  }

  .have_account a {
    text-decoration: none;
    color: var(--color-purple);
  }
`;

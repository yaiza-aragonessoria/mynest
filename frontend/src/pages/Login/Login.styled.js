import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: var(--maincontainer);
  width: 100%;
  display: flex;
  background-color: var(--color-orange-light);

  .image_starter_page {
    max-height: var(--maincontainer);
    width: 50%;
    
    background-image: url("/assets/mynest_bg.jpg"), linear-gradient(132.96deg, #c468ff 3.32%, #ffd966 100%);
background-blend-mode: multiply, normal;
  background-size: cover;
  opacity: 50%;

 

  }

  #mynest_bg {
    max-height: var(--maincontainer);

    background-size: contain;  
  }

  .right_container {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem 2rem;
  }

  .new_user {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
  }
  .new_user p {
    font-size: 14px;
    color: var(--color-grey);
  }

  .new_user a {
    font-size: 14px;
    color: var(--color-purple);
    text-decoration: none;
    cursor: pointer;
  }
`;

export const LoginWrapper = styled.div`
  height: 70%;
  width: 50%;
  background-color: #fff;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid #7239ea;

  .form-content {
    width: 100%;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
  }

  .login_input {
    width: 70%;
    margin: 0;
    padding: 0.5rem;
    border: 1px solid #b5b5c3;
    border-radius: 15px;
    outline: none;
    margin-bottom: 1.5rem;
  }

  .login_input:focus {
    background-color: #f8f5ff;
  }
`;

export const ErrorMessage = styled.div`
  z-index: 3;
  width: fit-content;
  height: 30px;
  display: flex;
  align-items: center;
  background-color: #fff;
  color: red;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
`;

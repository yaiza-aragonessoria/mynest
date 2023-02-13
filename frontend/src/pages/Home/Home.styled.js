import styled from "styled-components";

export const HomeWrapper = styled.div`
  justify-content: flex-start;
  min-height: var(--maincontainer);
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  background-color: var(--color-orange-light);

  .content_wrapper {
    width: 80%;
    margin-bottom: 2rem;
  }

`;

export const HomeDetails = styled.div`
  width: 100%;
  display: flex;
  gap: 5rem;
  margin-top: 2rem;
  margin-bottom: 2rem;

  background-color: #f8f5ff;
  border-radius: 15px;
  box-shadow: 0 2px 5px rgb(0 0 0 / 0.15);

  .home_header {
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 2rem;

  }

  .home_header_container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5rem;
  }

  #home_house_icon {
    font-size: 20px;
    color: var(--color-purple);
  }

  .home_address {
    font-size: 14px;
    color: var(--color-grey);
  }

  .home-members {
    width: 70%;
    display: flex;
    flex-direction: column;
    margin: 2rem;
  }

  .home-members-icons {
    display: flex;
    justify-content: flex-start;
    gap: 3rem;
  }

  .member {
    img {
      height: 60px;
      width: 60px;
      border-radius: 50%;
      vertical-align: middle;
    }

    span {
      margin-left: 1rem;
    }
  }
`;

export const StickersContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 1rem;

  .input_form {
    width: 100%;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
    background-color: #f9f9f9;
    border-radius: 15px;
    box-shadow: 0 2px 5px rgb(0 0 0 / 0.15);
  }

  textarea {
    margin-top: 1rem;
    width: 90%;
    height: 4rem;
    border: none;
    outline: none;

    background-color: #f9f9f9;

    font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #181C32;
  font-family: "Inter";
  resize: none;
  }

  .add_sticker {
    margin-bottom: 1rem;
  }

  .column_1,
  .column_2,
  .column_3 {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  } 
`;

import styled from "styled-components";

export const HomeWrapper = styled.div`
  min-height: var(--maincontainer);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  
  width: 100%;
  background-color: var(--color-orange-light);

  .content_wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;

    width: 80%;
    margin: 1rem 0;
  }
`;

export const HomeDetails = styled.div`
  width: 100%;
  display: flex;

  background-color: #f8f5ff;
  border-radius: 15px;
  box-shadow: 0 2px 5px rgb(0 0 0 / 0.15);

  .home_header {
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 1rem 2rem 1.5rem 3rem;
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
    margin: 1rem 2rem 1.5rem 2rem;
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
      object-fit: cover;
    }

    span {
      margin-left: 1rem;
    }
  }
`;
export const StickerBar = styled.div`
  width: 100%;

  .input_form {
    width: 100%;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
    background-color: #f9f9f9;
    border-radius: 15px;
    box-shadow: 0 2px 5px rgb(0 0 0 / 0.15);
  }
  
  textarea {
    margin: 0.5rem 1rem;
    flex: 1;
    height: 2.5rem;
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
    margin: 1rem;
  }
`;

export const StickersContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr); // 5
  grid-template-rows: repeat(1, 1fr);
  grid-gap: 1rem;
  grid-auto-flow: row;
  
  .small {
    grid-row: span 1;
    grid-column: span 1;
  }

  .medium {
    grid-row: span 2;
    grid-column: span 1; // 2
  }

  .large {
    grid-row: span 3;
    grid-column: span 1; // 2
  }

`;

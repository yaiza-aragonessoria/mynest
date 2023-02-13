import styled from "styled-components";

export const HomeWrapper = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  background-color: var(--color-orange-light);
`;

export const HomeDetails = styled.div`
  width: 80%;
  display: flex;
  gap: 5rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding: 2rem;

  background-color: #f8f5ff;
  border-radius: 15px;
  box-shadow: 0 2px 5px rgb(0 0 0 / 0.15);

  .home_header {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
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
    width: 50%;
    display: flex;
    flex-direction: column;
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
  form.sticker-bar {
    display: flex;
    flex-direction: row;
    justify-content: center;

    padding: 20px;

    input {
      width: 40%;
      padding: 10px;
      border: 1px solid #b5b5c3;
      border-radius: 15px;
      outline: none;
    }
  }

  div.sticker-board {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
  }
`;

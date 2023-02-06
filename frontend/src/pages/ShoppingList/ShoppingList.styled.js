import styled from "styled-components";

export const MainWrapper = styled.div`
  width: 100%;
  display: flex;
  /* justify-content: center; */
  gap: 4rem;
  margin-top: 3rem;

  .left_main_container {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 3rem;
  }

  .empty_list_btn {
    margin-top: 2rem;
  }

  .right_main_container {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left: 2rem;
    padding-right: 2rem;
    border-left: 1px dashed #E1E3EA;


  }
`;

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
    border: 1px solid #b5b5c3;
    border-radius: 15px;
  }

  input:focus {
    background-color: #f8f5ff;
  }
`;

export const ItemsContainer = styled.div`
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  .to_buy_header {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .sort {
    background-color: #b5b5c3;
    border: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    text-align: center;
    cursor: pointer;
  }

  .sort:hover {
    background-color: #a1a5b7;
  }

  i {
    font-size: 14px;
    color: #fff;
    padding: 2px;
  }
`;

export const FavoritesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .header_wrapper {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
  }

  i {
    font-size: 23px;
    color: #b5b5c3;
    cursor: pointer;
  }
`;

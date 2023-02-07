import styled from "styled-components";

export const ItemWrapper = styled.div`
  min-width: 500px;
  display: flex;
  flex-wrap: wrap;

  .to_buy_item {
    background-color: #f8f5ff;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 0 10px 0 10px;
    margin: 5px;
    box-shadow: 0 2px 5px rgb(0 0 0 / 0.15);

  }

  .check {
    font-size: 14px;
    color: green;
  }
  
  .delete_from_list {
    font-size: 14px;
    color: red;
    opacity: 0.7;
  }
`;

import styled from "styled-components";

export const InCartWrapper = styled.div`
margin-top: 2rem;
padding-top: 1rem;
border-top: 1px dashed #E1E3EA;
  min-width: 500px;
  display: flex;
  flex-wrap: wrap;

  .in_cart_item {
    opacity: 0.85;
    background-color: #E1E3EA;
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
    color: #7E8299;
  }
  
  .delete_from_list {
    font-size: 14px;
    color: #7E8299;
  }

`
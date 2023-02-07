import styled from "styled-components";

export const PopupWrapper = styled.div`
  z-index: 3;
  position: fixed;
  width: 50%;
  background-color: #fff;
  border: 2px solid #7239EA;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  box-shadow: 0 3px 7px rgb(0 0 0 / 0.15);
  margin-top: 3rem;

  .purchased_items_container {
    margin: 1rem;
    min-width: 500px;
    display: flex;
    flex-wrap: wrap;
  }

  .purchased_item {
    background-color: #f8f5ff;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 0.75rem 1rem;
    margin: 5px;
    box-shadow: 0 2px 5px rgb(0 0 0 / 0.15);
  }

  i {
    font-size: 14px;
    color: #7e8299;
  }

  .add_to_fav:hover,
  .delete_item:hover {
   color: #7239EA;
   font-size: 17px;
  }

  .add_to_fav:active,
  .delete_item:active {
   color: #7e8299;
   font-size: 14px;
  }

  button {
    margin: 1rem;
  }
`;

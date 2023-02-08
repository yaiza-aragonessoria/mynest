import styled from "styled-components";

export const ItemWrapper = styled.div`
min-width: 500px;
  display: flex;
  flex-wrap: wrap;

  .purchased_items{  
    background-color: #f8f5ff;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* gap: 1rem; */
    padding: 0 15px 0 15px;
    margin: 5px;
    box-shadow: 0 2px 5px rgb(0 0 0 / 0.15);}

    #favorited_item {
    font-size: 12px !important;
    color: #7e8299; 
    margin-right: 5px;
    }
`
import styled from "styled-components";

export const CardLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 10px;
  background-color: #F9F9F9;



  .card_info {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .card_image img {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 2px solid #fff;
    height: 200px;
    width: 200px;

    object-fit: cover;
  }
`;

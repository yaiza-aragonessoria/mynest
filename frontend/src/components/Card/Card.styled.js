import styled from "styled-components";

export const CardLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 2rem;
  background: rgb(248,245,255);
background: linear-gradient(310deg, rgba(248,245,255,0.9346113445378151) 0%, rgba(176,144,244,0.9178046218487395) 41%, rgba(114,57,234,1) 100%);


#card_text {
  color: #fff;
}

  .card_info {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  button {
    margin-top: 1rem;
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

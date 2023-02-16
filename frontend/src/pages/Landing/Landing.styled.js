import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: var(--maincontainer);
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--color-orange-light);
  gap: 2rem;

  #laptop_picture {
    width: 700px;
  }

  .info_laptop {
    width: 100%;
    height: 90%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .left_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 8rem;
  }

  h1 {
    font-family: "Inter";
    font-style: normal;
    font-weight: 800;
    font-size: 56px;
    line-height: 71px;
    color: var(--color-purple);
  }

  h2 {
    width: 80%;
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 28px;
    color: #000;
    margin-bottom: 3rem;
  }

  h3 {
    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 28px;
  }

  h4 {
    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 28px;
    color: var(--color-purple);
  }

  #landing_btn {
    background-color: var(--color-orange);
    color: #fff;
    width: 200px;
    height: 50px;
    border-radius: 8px;
    padding: 10px 30px;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    border: none;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.15);
    text-align: center;
    text-transform: uppercase;
    cursor: pointer;
  }

  #landing_btn:hover {
    background-color: var(--color-purple);
    color: #fff;
  }

  #landing_btn:active {
    background-color: #fff;
    color: var(--color-purple);
    border: 1px solid var(--color-purple);
  }

  .about {
    padding-left: 6rem;
    padding-right: 6rem;
    padding-top: 2rem;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(100px, auto);
    column-gap: 4rem;
    row-gap: 3rem;
  }

  .feature {
    display: flex;
    flex-direction: column;
    padding: 1.5rem 2.5rem 3rem 2.5rem;
    border-radius: 15px;
    background-color: #fff;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.15);
  }

  .accent_feature {
    background: rgb(255, 199, 0);
    background: linear-gradient(
      310deg,
      rgba(255, 199, 0, 1) 10%,
      rgba(210, 123, 123, 1) 37%,
      rgba(187, 112, 185, 1) 49%,
      rgba(114, 57, 234, 1) 80%,
      rgba(100, 57, 234, 1) 100%
    );
    color: #fff;
  }

  span {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 30px;
    color: #000;
  }

  i {
    font-size: 40px;
    color: var(--color-purple);
    text-align: end;
    margin-bottom: 1rem;
  }

  .img_how {
    width: 250px;
    height: 250px;
    object-fit: cover;
    border-radius: 20%;
  }

  .how {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding-top: 5rem;
    padding-bottom: 4rem;
  }

  .how_header {
    display: flex;
    flex-direction: row;
    gap: 3rem;
    align-items: center;
  }

  #how_header_title {
    color: #000;
    font-family: "Inter";
    font-style: normal;
    font-weight: 800;
    font-size: 35px;
  }

  .how_card {
    width: 50%;
    height: 100%;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding: 2rem 2.5rem 2rem 2.5rem;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.15);
    border-radius: 15px;
  }

  .how_card_content {
    width: 60%;
    display: flex;
    flex-direction: column;
  }

  /* MEDIA QUERIES */

  @media screen and (max-width: 1150px) {
    .info_laptop {
      display: flex;
      flex-direction: column;
    }

    .about {
      padding-left: 2rem;
      padding-right: 2rem;
      padding-top: 2rem;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-auto-rows: minmax(100px, auto);
      column-gap: 2rem;
      row-gap: 1rem;
    }

    .how_header {
      display: flex;
      flex-direction: column;
    }

    .how_card {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem 1rem;
    }
  }


  @media screen and (max-width: 650px) {
    #laptop_picture {
      width: 500px;
    }

    .about {
      padding-left: 2rem;
      padding-right: 2rem;
      padding-top: 2rem;
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      grid-auto-rows: minmax(100px, auto);
      column-gap: 2rem;
      row-gap: 1rem;
    }

    #how_header_title {
      font-size: 25px;
    }

    h1 {
      font-size: 40px;
    }
  }
`;

import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: var(--color-orange-light);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  width: 50%;


  form {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding-bottom: 10px;

    button {
      margin: 0 7px;
      width: 150px;
    }

    img {
      width: 120px;
      height: 120px;
      object-fit: cover;
      align-items: center;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      margin: 10px;
    }

    .save-edit-cancel {
      grid-column: 3/3;
      justify-self: end;
    }

    .icon-button {
      background-color: transparent;
      border: none;
      margin: 0;
      padding: 0 0 0 10px;
      width: fit-content;
      justify-self: end;
      grid-column: 3/3;
    }

    .header {
      width: fit-content;
    }

    .sara {
      width: 75%;
      display: flex;
      align-items: center;
      gap: 20px;

      .nila {
        width: 50%;
        display: flex;
        justify-content: flex-start;
      }

      .nina {
        width: 50%;
        display: flex;
        justify-content: flex-end;
        flex-direction: column;
      }

    }

    .form-field {
      display: flex;
      flex-direction: column;
      width: 75%;

      input, p {
        margin: 0 0 0px;
        padding: 10px;
        border: 1px solid #b5b5c3;
        border-radius: 15px;
        font-size: 14px;
        height: 21px;
        vertical-align: middle;
        background-color: white;
      }

      label {
        padding-left: 5px;
        padding-bottom: 5px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 13.975px;
        line-height: 21px;
        color: #7E8299;
      }

    }


    .spanned {
      grid-column: 2/span 2;
    }

    .translated {
      grid-column: 2/3;
    }

    .home-buttons {
      width: 75%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 25px;

    }

    .home-details {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
    }


  }


  @media screen and (min-width: 1900px) and (max-width: 2556px) {
    justify-content: center;
    display: flex;
   
    form {
      .form-field {
        width: 60%;
      }

      .sara {
        width: 60%;
      }

      .home-buttons {
        padding-top: 25px;
        padding-bottom: 25px;

      }
    }

  }
  @media only screen and (min-width: 500px) and (max-width: 800px) {
    width: 100%;
  }


`;


export const Buttons = styled.div`
  display: flex;
  margin-bottom: 5px;
  justify-content: flex-end;
  
`


export const Avatar = styled.div`
    display: flex;
    flex-direction: column;
    grid-row: span 2;
    border: none;
    border-radius: 1ex;
    cursor: pointer;
    height: 180px;
    align-items: center;
    padding: 2px;
    
    label {
    cursor: pointer;
    text-align: center;
    }
    
    input {
      display: none;
    }
    
    .no-avatar {
        font-size: 50px;
        font-weight: 400;
        width: 120px;
        height: 120px;
        background-color:rgba(244, 191, 4, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        color:rgba(114, 57, 234, 1);
        margin: 10px;
    }
  
  .buttons-avatar {
    display: flex;
    gap: 10px;
    margin: 10px;
    color: #b5b5c3
  }
  
  
  
`



export const SignupWrapper = styled.div`
  min-height: var(--maincontainer);
  width: 100%;
  display: flex;
  background-color: var(--color-orange-light);

  .image_starter_page {
    max-height: var(--maincontainer);
    width: 50%;

    background-image: url("/assets/uprofile_bg.jpg"),
    linear-gradient(132.96deg, #c468ff 3.32%, #ffd966 100%);
    background-blend-mode: multiply, normal;
    background-size: cover;
    opacity: 50%;
  }

  @media only screen and (min-width: 500px) and (max-width: 800px) {

    .image_starter_page {
      display: none;
     
    }
  }
  
`;


export const Vjosa = styled.div`
  width: 75%;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  border: 1px solid #7239ea;
  border-radius: 15px;

  @media screen and (min-width: 1900px) and (max-width: 2560px) {
    width: 50%;
    justify-content: center;
    display: flex;

    form {
      .form-field {
        width: 65%;
      }

      .sara {
        width: 65%;
      }

      .home-buttons {
        width: 65%;
        padding-top: 45px;
        padding-bottom: 45px;

      }
    }

  }
  
`

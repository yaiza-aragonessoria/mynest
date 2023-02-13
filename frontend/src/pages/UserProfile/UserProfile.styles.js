import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: var(--color-orange-light);
  //border: 2px solid #7239EA;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  box-shadow: 0 3px 7px rgb(0 0 0 / 0.15);
  min-height: var(--maincontainer);

  form {
    display: grid;
    grid-template-columns: 21% 38% 38%;
    align-items: center;
    column-gap: 10px;

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
      //width: fit-content;
      justify-self: end;
    } 
    
    .icon-button {
      background-color: transparent;
      border: none;
      margin: 0;
      padding: 0;
      width: fit-content;
      justify-self: end;
      padding-left: 10px;
      grid-column: 3/3;
    }
    
    .header {
      width: fit-content;
    }
    
    .form-field{
      display: flex;
      flex-direction: column;
      
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
      grid-column: 3/3;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      padding: 26px 0 0;
    }
    
    .home-details {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
    }
    
  }
`;


export const Buttons = styled.div`
  padding-top: 25px;
  grid-column: span 3;
  justify-self: center;

`


export const Avatar = styled.div`
    display: flex;
    flex-direction: column;
    grid-row: span 2;
    border: none;
    border-radius: 1ex;
    cursor: pointer;
    //width: 100%;
    height: 180px;
    align-items: center;
    //justify-content: center;
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
        //background-color:rgba(114, 57, 234, 0.5);
        background-color:rgba(244, 191, 4, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        //color: #f4bf04;
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
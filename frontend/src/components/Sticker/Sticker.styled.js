import styled from "styled-components";

export const StickerBox = styled.div`
  width: 100%;
  background-color: var(--color-grey-light);
  box-shadow: 0 2px 5px rgb(0 0 0 / 0.15);
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  button {
    padding: 2px;
    min-height: 20px;
  }
  
  .sticker-top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0.5rem;
    
    img {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      vertical-align: middle;
      object-fit: cover;
    }

    span {
      margin-left: 0.5rem;
    }

    #pin_btn {
      width: 2.5rem;
      height: 2.5rem;
      font-size: 22px;
      border-radius: 50%;
      line-height: 18px;
    }
  }
  
  .content {
    flex: 1;
    margin: 0 1rem;
  }

  .sticker-bottom {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
    span {
      color: var(--color-grey);
      margin-left: 1rem;
    }
  }
  
  #delete_sticker_btn {
    margin: 0.5rem;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    font-size: 16px;
    line-height: 12px;
  }
`;
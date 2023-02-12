import styled from "styled-components";

export const StickerBox = styled.div`
  height: 200px;
  width: 200px;

  padding: 10px;
  margin-bottom: 20px;
  background-color: white;
  border: 1px solid var(--color-grey-light);
  border-radius: 10px;
  
  div.content {
    height: 150px;
  }
  
  div.sticker-top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 5px;

    img {
      height: 20px;
      border-radius: 50%;
      vertical-align: middle;
    }

    div.space {
      grow: 1;
      width: 100%;
    }

    span {
      margin-left: 5px;
    }

  }
  
  div.sticker-bottom {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    
    margin-top: 5px;
  }
  
  button {
    padding: 2px;
    min-height: 20px;
    line-height: 12px;
  }
  
`;
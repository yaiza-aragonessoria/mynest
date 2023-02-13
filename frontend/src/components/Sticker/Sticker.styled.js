import styled from "styled-components";

export const StickerBox = styled.div`
  /* height: 200px; */

  width: 100%;
  /* padding: 1rem; */
  /* margin: 0.4rem; */
  background-color: var(--color-grey-light);
  box-shadow: 0 2px 5px rgb(0 0 0 / 0.15);
  border-radius: 10px;


  #pinned_sticker {
    background-color: var(--color-orange);
    color: #fff;
  }

  #unpinned_sticker {
    background-color: var(--color-purple-light);
  }
  
.content {
    /* height: 150px; */
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
 .sticker-top {
  margin: 1rem;
  
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 5px;

    img {
      width: 2.5rem;
  height: 2.5rem;
      border-radius: 50%;
      vertical-align: middle;
    }

    span {
      margin-left: 0.5rem;
    }

  }
  
#pin_btn {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
}

.content {
  margin: 1rem;
}

.sticker-bottom {
  margin: 1rem;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    
    margin-top: 5px;

    span {
      color: var(--color-grey);
    }

    
  }
  
  button {
    padding: 2px;
    min-height: 20px;
    line-height: 12px;
  }

  #delete_sticker_btn {
    width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  }
  
`;
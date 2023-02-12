import styled from "styled-components";

export const PopupLayout = styled.div`
 
 .mm-popup__box {
    z-index: 100;
  position: fixed;
  background-color: #fff;
  border: 2px solid #7239EA;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  box-shadow: 0 3px 7px rgb(0 0 0 / 0.15);
 }

 .mm-popup__box__header {
    font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 22px;
  color: #181C32;
  padding-bottom: 4px;
  border-bottom: 2px solid #c1a5ff;
  background-color: #fff;
  margin-bottom: 1rem;
 }

 .mm-popup__box__body input {
    width: 90%;
    padding: 10px;
    border: 1px solid #b5b5c3;
    border-radius: 15px;
    margin-bottom: 1rem;

    padding: 0.5rem;
    font-family: "Inter";
    cursor: pointer;
 }


 label {
    display: inline-block;
    margin-right: 0.75rem;
    margin-bottom: 1rem;
 }

 input[type="checkbox"] {
    -webkit-appearance: none;
    appearance: none;
    background-color: #fff;
    margin: 0;
    font: inherit;
    color: rgba(114, 57, 234, 0.36);
    width: 1.5em;
    height: 1.5em;
    border: 0.15em solid rgba(114, 57, 234, 0.36);
    border-radius: 0.15em;
    transform: translateY(-0.075em);
    /* display: grid;
    place-content: center; */
}

input[type="checkbox"]::before {
    content: "";
    width: 0.65em;
    height: 0.65em;
    transform: scale(0);
    transition: 120ms transform ease-in-out;

    background: rgba(114, 57, 234, 0.36);
    transform-origin: bottom left;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
}

input[type="checkbox"]:checked::before {
    transform: scale(1);
}

.mm-popup__btn--success {
  background-color: #7239EA;
  color: #fff;
  min-height: 40px;
  border-radius: 8px;  
  padding: 7px 25px;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  border: none;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.15);
  text-align: center;
  text-transform: uppercase;
  cursor: pointer;
  background: rgb(193,165,255);
  background: linear-gradient(189deg, rgba(193,165,255,1) 0%, rgba(114,57,234,1) 72%);

}

.mm-popup__btn--success:hover {
  background-color: var(--color-orange);
  color: #fff;
  border: 1px solid var(--color-orange);
  background-image: none;
}

.mm-popup__btn--success:active {
  background-color: #7239EA;
  color: #fff;
  background: rgb(193,165,255);
  background: linear-gradient(189deg, rgba(193,165,255,1) 0%, rgba(114,57,234,1) 72%);
}





.mm-popup__btn--cancel,
.mm-popup__btn--info {
  background-color: var(--color-purple-light);
  color: #7239EA;
  min-height: 40px;
  border-radius: 8px;
  padding: 7px 25px;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  border: none;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.15);
  text-align: center;
  text-transform: uppercase;
  cursor: pointer;
  border: 1px solid #7239EA;
  background: rgb(248,245,255);
background: linear-gradient(180deg, rgba(248,245,255,0.9346113445378151) 0%, rgba(255,255,255,1) 100%);
}

.mm-popup__btn--cancel:hover,
.mm-popup__btn--info:hover {
  background-color: #7239EA;
  color: #fff;
  background-image: none;
  border: none;
  background: rgb(193,165,255);
  background: linear-gradient(189deg, rgba(193,165,255,1) 0%, rgba(114,57,234,1) 72%);
}

.mm-popup__btn--cancel:active,
.mm-popup__btn--info:active {
  background-color: #F8F5FF;
  color: #7239EA;
  border: 1px solid #7239EA;

  background: rgb(248,245,255);
  background: linear-gradient(180deg, rgba(248,245,255,0.9346113445378151) 0%, rgba(255,255,255,1) 100%);
}




.mm-popup__btn--danger {
  background-color: #A1A5B7;
  color: #fff;
  min-height: 40px;
  border-radius: 8px;  
  padding: 7px 25px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  border: none;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.15);
  text-align: center;
  text-transform: uppercase;
  cursor: pointer;
  background: rgb(201,206,227);
  background: linear-gradient(189deg, rgba(201, 206, 227, 1) 0%, rgba(123, 125, 133, 1) 100%);

}

.mm-popup__btn--danger:hover {
  background-color: #F8F5FF;
  color: #7239EA;
  border: 1px solid #7239EA;
  background-image: none;
}

.mm-popup__btn--danger:active {
  background-color: #7239EA;
  color: #fff;
}




`;

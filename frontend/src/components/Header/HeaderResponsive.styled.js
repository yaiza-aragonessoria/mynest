import styled from "styled-components";


export const Wrapper = styled.nav`
  h2 {
    vertical-align: center;
    text-align: center;
  }

  * {
    box-sizing: border-box;
  }

  .top-nav {

    width: 100%;
    height: var(--navheight);
    z-index: 4;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background: rgb(255, 199, 0);
    background: linear-gradient(108deg, rgba(255, 199, 0, 1) 10%, rgba(210, 123, 123, 1) 37%, rgba(187, 112, 185, 1) 49%, rgba(114, 57, 234, 1) 80%, rgba(100, 57, 234, 1) 100%);
    color: #FFF;
    padding: 1em;

    #logo {
      height: 3rem;
      width: auto;
      margin: 0.5rem 2rem;
    }

    #logo img {
      height: 3rem;
      width: auto;
    }
  }

  .menu {
    display: flex;
    flex-direction: row;
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .menu > li {
    overflow: hidden;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 5px;

    a {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      text-decoration: none;
      padding: 22.5px;

      font-weight: 600;
    }

    a:hover {
      background-color: var(--color-orange);
      color: white;
      height: 100%;
      padding: 22.5px;
    }

    .log-buttons {
      padding-top: 16px;
      padding-right: 0px;
    }

    .avatar-profile {
      padding-top: 11px;
      padding-right: 22.5px;
      padding-left: 22.5px;
     
    }

  }

  .menu-button-container {
    display: none;
    height: 100%;
    width: 30px;
    cursor: pointer;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  #menu-toggle {
    display: none;
  }

  .menu-button,
  .menu-button::before,
  .menu-button::after {
    display: block;
    background-color: #fff;
    position: absolute;
    height: 4px;
    width: 30px;
    transition: transform 400ms cubic-bezier(0.23, 1, 0.32, 1);
    border-radius: 2px;
  }

  .menu-button::before {
    content: '';
    margin-top: -8px;
  }

  .menu-button::after {
    content: '';
    margin-top: 8px;
  }

  #menu-toggle:checked + .menu-button-container .menu-button::before {
    margin-top: 0px;
    transform: rotate(405deg);
  }

  #menu-toggle:checked + .menu-button-container .menu-button {
    background: rgba(255, 255, 255, 0);
  }

  #menu-toggle:checked + .menu-button-container .menu-button::after {
    margin-top: 0px;
    transform: rotate(-405deg);
  }


  @media (max-width: 840px) {
    .menu-button-container {
      display: flex;
    }

    .menu {
      position: absolute;
      top: 0;
      margin-top: 50px;
      left: 0;
      flex-direction: column;
      width: 100%;
      justify-content: center;
      align-items: center;
    }

    #menu-toggle ~ .menu li {
      height: 0;
      margin: 0;
      padding: 0;
      border: 0;
      z-index: 10;
      transition: height 400ms cubic-bezier(0.23, 1, 0.32, 1);
    }

    #menu-toggle:checked ~ .menu li {
      border-width: 1px;
      border-style: solid;
      border-image: linear-gradient(108deg,
      rgba(114, 57, 234, 1) 100%,
      rgba(255, 199, 0, 1) 0%) 1;
      height: 2.5em;
      padding: 0.5em;
      transition: height 400ms cubic-bezier(0.23, 1, 0.32, 1);

     

      .log-buttons {
        padding-top: 0px;
        padding-right: 5px;
        padding-left: 22.5px;
      }
    }

    .menu > li {
      display: flex;
      justify-content: center;
      margin: 0;
      padding: 0.5em 0;
      width: 100%;
      color: white;
      background: rgb(255, 199, 0);
      background: linear-gradient(108deg,
      rgba(255, 199, 0, 1) 0%,
      rgba(114, 57, 234, 1) 100%);


    }

    .menu > li:not(:last-child) {
    }

    

  }

@media (min-width: 840px) and (max-width: 904px ) {
      .menu li {
        .log-buttons {
          padding-top: 8px !important;
        }
      }
    }
  
  .no-avatar {
    font-size: 20px;
    font-weight: 400;
    height: 2.5rem;
    width: 2.5rem;
    cursor: pointer;
  position: relative;
    background-color:rgba(244, 191, 4, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color:rgba(114, 57, 234, 1);
    margin: 10px;
}
`




export const SigninSignup = styled.div`
  //margin-right: 3rem;
  display: flex;
  gap: 1px;

  #signup {
    border: none;
    border-top-left-radius: 28px;
    border-bottom-left-radius: 28px;
    padding: 0.5rem 1rem;
    text-align: center;
    cursor: pointer;
    background-color: var(--color-orange);
  }

  button.logout {
    border-top-left-radius: 28px;
    border-bottom-left-radius: 28px;
    background-color: #7e8299 !important;
    padding: 0.5rem 1rem;
    text-align: center;
    cursor: pointer;
    color: #fff;
  }

  button.logout:hover {
   background-color: #f4bf04 !important;
  }

  #logout,
  #login {
    border: none;
    border-top-right-radius: 28px;
    border-bottom-right-radius: 28px;
    padding: 0.5rem 1rem;
    text-align: center;
    cursor: pointer;
    background-color: var(--color-orange);
  }

  #signup:hover,
  #logout:hover,
  #login:hover {
    background-color: var(--color-purple);
    color: #fff;
  }

  #signup:active,
  #logout:active,
  #login:active {
    color: #000;
    background-color: #efefef;
  }
`;

export const AvatarUser = styled.img`
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  opacity: 0.80;


  &:hover {
    background-color: var(--color-orange);
    opacity: 0.99;

   }
  
`;
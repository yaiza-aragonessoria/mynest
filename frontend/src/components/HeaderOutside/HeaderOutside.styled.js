import styled from "styled-components";

export const NavBar = styled.nav`
  width: 100%;
  height: var(--navheight);
  z-index: 4;

  background: rgb(255,199,0);
background: linear-gradient(108deg, rgba(255,199,0,1) 10%, rgba(210,123,123,1) 37%, rgba(187,112,185,1) 49%, rgba(114,57,234,1) 80%, rgba(100,57,234,1) 100%);

  border-bottom: 1px solid #d4d4d4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2), 0px 10px 20px rgba(0, 0, 0, 0.05);

  #logo {
    height: 3rem;
    width: auto;
    margin: 0.5rem 2rem;
  }

  #logo img {
    height: 3rem;
    width: auto;
  }
`;

export const Links = styled.div`
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;


  a {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    text-decoration: none;
    padding-left: 2rem;
    padding-right: 2rem;
    font-weight: 600;
  }

  a:hover {
    background-color: var(--color-orange);
    color: #fff;
  }

   
`;

export const SigninSignup = styled.div`
  margin-right: 3rem;
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
  left: 14.5rem;
  opacity: 0.80;


  &:hover {
    background-color: var(--color-orange);
    opacity: 0.99;
    
   }
`;
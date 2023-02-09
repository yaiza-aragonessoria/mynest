import styled from "styled-components";

export const NavBar = styled.nav`
  width: 100%;
  height: var(--navheight);
  /* position: fixed; */
  z-index: 4;
  background-color: #e1e3ea;
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
    color: #000;
    text-decoration: none;
    padding-left: 2rem;
    padding-right: 2rem;
  }

  a:hover {
    background-color: pink;
    color: #fff;
  }

  #shopping_list:hover {
    background-color: #7239ea;
    color: #fff;
  }

  #shared_expenses:hover {
    background-color: #00D9D9;
    color: #fff;
  }
  
  #to_do:hover {
    background-color: #F1416C;
    color: #fff;
  }

  #calendar:hover {
    background-color: #03A9F4;
    color: #fff;
  }

  #profile:hover {
    background-color: #FFC700;
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
    background-color: #efefef;
  }

  #logout,
  #login {
    border: none;
    border-top-right-radius: 28px;
    border-bottom-right-radius: 28px;
    padding: 0.5rem 1rem;
    text-align: center;
    cursor: pointer;
    background-color: #efefef;
  }

  #signup:hover,
  #logout:hover,
  #login:hover {
    background-color: #7e8299;
    color: #fff;
  }

  #signup:active,
  #logout:active,
  #login:active {
    color: #000;
    background-color: #efefef;
  }
`;

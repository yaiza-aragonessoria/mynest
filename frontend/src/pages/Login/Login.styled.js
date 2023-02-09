import styled from "styled-components";

export const LoginWrapper = styled.div`
  z-index: 3;
  height: 50%;
  width: 35%;
  background-color: #fff;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 5rem;

  form {
    width: 55%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0px;

    input:focus {
      background-color: #f8f5ff;
    }
    
    button {
      margin-top: 15px;
      width: 150px;
    }
  }
`

export const FormFields = styled.div`
  display: flex;
  flex-direction: column;

  input {
    margin-bottom: 15px;
    padding: 10px;
    border: 1px solid #b5b5c3;
    border-radius: 15px;
    width: 300px;
  }

  input:focus {
    background-color: #f0ffff;
    border: 1px solid #a90f1a !important;
  }
`

export const LoginTitle = styled.div`
  z-index: 3;
  width: fit-content;
  background-color: #fff;
  padding-bottom: 4px;
  margin: 4rem auto 1rem;
`

export const ErrorMessage = styled.div`
  z-index: 3;
  width: fit-content;
  height: 30px;
  display: flex;
  align-items: center;
  background-color: #fff;
  color: red;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
`

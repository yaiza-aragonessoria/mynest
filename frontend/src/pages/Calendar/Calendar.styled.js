import styled from "styled-components";

export const CalendarPageWrapper = styled.div`
  width: 100%;
  min-height: var(--maincontainer);
  height: var(--maincontainer);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: var(--color-orange-light);
`;

export const CalendarFormWrapper = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  border-right: 1px dashed #E1E3EA;




  .form_content {

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 6rem 2rem;
    background-color: #f9f9f9;
    border-radius: 15px;
    box-shadow: 0 2px 5px rgb(0 0 0 / 0.15);
  }

  .add_event_input {
    width: 90%;
    padding: 10px;
    border: 1px solid #b5b5c3;
    border-radius: 15px;
    margin-bottom: 1rem;
  }

  .date_input {
    display: flex;
    gap: 2rem;
    margin-bottom: 1rem;
  }
  .date_input_from,
  .date_input_until {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .date_input_from input,
  .date_input_until input {
    border: 1px solid #b5b5c3;
    border-radius: 15px;
    padding: 0.5rem;
    font-family: "Inter";
    text-transform: uppercase;
    cursor: pointer;
  }

  .add_event_input:focus,
  .date_input_from input:focus,
  .date_input_until input:focus {
    background-color: #f8f5ff;
    outline: none;
  }

  .participants {
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-bottom: 1rem;
  }

  .participant {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
`;

export const CalendarWrapper = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  justify-content: center;
  padding: 0 2rem;
  align-items: center;

  .rbc-calendar {
    width: 90%;
    height: 70%;
    background-color: #f9f9f9;
    box-shadow: 0 2px 5px rgb(0 0 0 / 0.15);

    border-radius: 15px;
    border: none;
  }

  .rbc-toolbar {
    width: 100%;
    min-height: 4rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-bottom: -1px;
    color: #fff;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;
    background: rgb(193, 165, 255);
    background: linear-gradient(
      70deg,
      rgba(193, 165, 255, 1) 0%,
      rgba(114, 57, 234, 1) 72%
    );
    text-transform: uppercase;
    padding: 1rem;
    border: 1px solid #ddd;

    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }

  .rbc-btn-group button {
    padding: 0.4rem 0.5rem;
    cursor: pointer;
    text-transform: uppercase;
    background-color: #7239ea;
    border: none;
    font-size: 12px;
    color: #fff;
    border: none;
  }
  .rbc-btn-group button:hover {
    background-color: #f4bf04;
    color: #fff;
    transform: none;
    border: none;
  }

  button.rbc-active {
    padding: 0.4rem 0.5rem;
    cursor: pointer;
    text-transform: uppercase;
    background-color: #b5b5c3;
    border: none;
    font-size: 12px;
    color: #fff;
    border: none;
  }

  .button.rbc-active:hover {
    background-color: #f4bf04;
    color: #fff;
    border: none;
    transform: none;
  }

  .rbc-month-header {
    background-color: #b5b5c3;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #fff;
    text-transform: uppercase;
  }

  .rbc-month-view {
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
  }

  .rbc-off-range-bg {
    background-color: #ededed;
  }

  .rbc-today {
    background-color: #e6e2ef;
  }

  .rbc-current {
    color: #7239ea;
  }

  /* AGENDA */

  .rbc-header {
    background-color: #b5b5c3;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #fff;
    text-transform: uppercase;
  }

  tbody {
    color: #fff;
  }

  .rbc-agenda-view table.rbc-agenda-table thead > tr > th {
    padding: 5px 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    font-weight: 600;
  }
`;

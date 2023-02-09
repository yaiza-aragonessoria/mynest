import styled from "styled-components";

export const CalendarPageWrapper = styled.div`
  width: 100%;
  height: var(--maincontainer);
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export const CalendarFormWrapper = styled.div`
  height: 100%;
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  .add_event_input {
    width: 70%;
    padding: 10px;
    border: 1px solid #b5b5c3;
    border-radius: 15px;
    margin-bottom: 1rem;
  }

  .add_event_input:focus {
    background-color: #ecf8ff;
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
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

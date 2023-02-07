import React from "react";
import {ExpensesComponentStyled} from "./ExpensesComponent.styled";


const ExpensesComponent = (props) => {
    const handleEdit = (event) => {
        props.onEdit(event);
    };
    let text;
    if (props.expenses.category === 1) {
        text = "Groceries"
    } else if (props.expenses.category === 2) {
        text = 'Maintenance';
    } else if (props.expenses.category === 3) {
        text = 'Utilities';
    } else if (props.expenses.category === 4) {
        text = 'House hold supplies';
    } else {
        text = 'Other'
    }
    return (
        <>
            <ExpensesComponentStyled>
                <span>{props.expenses.created}</span>
                <span>{text}</span>
                <span>{props.expenses.name}</span>
                <span>You paid {props.expenses.amount} CHF</span>
                {/*<span>You paid {props.expenses.shared_with} CHF</span>*/}
                <button className="button" onClick={handleEdit}>Edit</button>
            </ExpensesComponentStyled>
        </>);
};
export default ExpensesComponent;
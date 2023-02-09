import React, {useState} from "react";
import {ExpensesComponentStyled} from "./ExpensesComponent.styled";
import api from "../../api/myNest";
import EditExpense from "../EditExpense/EditExpense";

const ExpensesComponent = (props) => {
    // const handleEdit = (event) => {
    //
    //     props.onEdit(event);
    // };
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

    const [showEditModal, setEditModal] = useState(false);

    const handleModalEdit = (event) => {
        setEditModal(!showEditModal);
        // setIsEdit(true)
    };


    const configDelete = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
    };
    const handleDelete = async () => {
        await api.delete(`/expenses/${props.expenses.id}/`, configDelete);
        props.onExpenseDelete(props.expenses.id);

    };
    return (
        <>
            <ExpensesComponentStyled>
                <span>{props.expenses.created}</span>
                <span>{text}</span>
                <span>{props.expenses.name}</span>
                <span> Amount {props.expenses?.amount} CHF</span>
                <span> Payer {props.expenses?.payer?.first_name ? props.expenses.payer.first_name : props.expenses.payer.email} </span>
                <button className="button" onClick={handleModalEdit}>Edit</button>
                <button className="button" onClick={handleDelete}>Delete</button>
            </ExpensesComponentStyled>
            {showEditModal &&
                <EditExpense showEditModal={showEditModal} setEditModal={setEditModal} expense={props.expenses}
                             expenseId={props.expenses.id}/>}
        </>);
};
export default ExpensesComponent;
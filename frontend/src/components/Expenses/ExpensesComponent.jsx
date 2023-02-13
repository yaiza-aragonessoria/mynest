import React, {useState} from "react";
import {Column, Wrapper, MainContainer, Buttons} from "./ExpensesComponent.styled";
import api from "../../api/myNest";
import EditExpense from "../EditExpense/EditExpense";
import {useSelector} from "react-redux";
import {faTrash, faEdit} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const ExpensesComponent = (props) => {
    const userData = useSelector(store => store.userProfile.userProfileSlice)

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

    const whoPaid = payer => {
        let payerName = '';
        if (payer.id === userData.id) payerName = 'You';
        else payerName = props.expenses?.payer?.first_name ? props.expenses.payer.first_name : props.expenses.payer.email
        return payerName + ' paid';
    }

    return (
        <>
            <Wrapper>

                <MainContainer>
                    {showEditModal &&
                        <EditExpense showEditModal={showEditModal} setEditModal={setEditModal} expense={props.expenses}
                                     expenseId={props.expenses.id}/>}
                    <Column>
                        <span>{props.expenses.created}</span>
                    </Column>
                    <Column>
                        <span>{text}</span>
                    </Column>
                    <Column>
                        <span>{props.expenses.name}</span>
                    </Column>
                    <Column>
                        <span> Amount {props.expenses?.amount} CHF</span>
                    </Column>
                    <Column>
                        <span> {whoPaid(props.expenses.payer)} </span>
                    </Column>
                    {/*<span> Payer {props.expenses?.payer?.first_name ? props.expenses.payer.first_name : props.expenses.payer.email} </span>*/}
                    <Column>
                        <Buttons>
                            {/*<button className="btn_purple" onClick={handleModalEdit}>{showEditModal ?*/}
                            {/*    <FontAwesomeIcon icon={faXmark}/> : <>Edit</>}</button>*/}
                             <i
                                className="delete_item"
                                onClick={handleModalEdit}
                            >
                                {<FontAwesomeIcon icon={faEdit}/>}
                            </i>
                        </Buttons>
                        <Buttons>
                            {/*<button className="btn_purple" onClick={handleDelete}>Delete</button>*/}
                            <i
                                className="delete_item"
                                onClick={handleDelete}
                            >
                                {<FontAwesomeIcon icon={faTrash}/>}
                            </i>
                        </Buttons>

                    </Column>
                </MainContainer>
            </Wrapper>
        </>);
};
export default ExpensesComponent;
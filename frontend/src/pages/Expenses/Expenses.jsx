import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import {fetchExpenses} from "../../features/slices/expensesSlice";
import ExpensesComponent from "../../components/Expenses/ExpensesComponent";
import AddExpenses from "../../components/AddExpenses/AddExpenses";
import {fetchUser} from '../../features/slices/userSlice'
import {ExpensesStyled} from "./Expenses.styled";
import EditExpense from '../../components/EditExpense/EditExpense'

const Expenses = () => {
        const dispatch = useDispatch();
        const expensesData = useSelector(store => store.expenses.expensesSlice)
        const userData = useSelector(store => store.userProfile.userProfileSlice)
        const [expenses, setExpenses] = useState([]);
        const [showModal, setShowModal] = useState(false)
        const [showEditModal, setEditModal] = useState(false);
        // const [isEdit, setIsEdit] = useState(false);


        const handleEdit = (event) => {
            setEditModal(!showEditModal);
            console.log(event.target.id)
            // setIsEdit(true)
        };


        const handleOpenModal = () => {
            setShowModal(true)
        }

        useEffect(() => {
            dispatch(fetchExpenses())
            dispatch(fetchUser())
        }, [showModal])

        const handleExpenseDelete = (expenseId) => {
            setExpenses(expenses.filter((expense) => expense.id !== expenseId));
            window.location.reload()
        };

        return (<>
            <ExpensesStyled>
                <button onClick={handleOpenModal}>Add Expense</button>
                {showModal && <AddExpenses/>}
                {!showModal && expensesData?.map((expense) => {
                    return (
                        <>
                            { <ExpensesComponent key={expense?.id} expenses={expense}
                                                           name_payer={userData.id === expense.payer.id ? "You" : expense.payer.first_name}
                                                           onEdit={handleEdit}
                                                           onExpenseDelete={handleExpenseDelete}/>}
                            {/*{showEditModal &&*/}
                            {/*    <EditExpense showEditModal={showEditModal} setEditModal={setEditModal} expense={expense}*/}
                            {/*                 expenseId={expense.id}/>}*/}
                        </>
                    )
                })
                }
                {/*{expensesData?.map((expense) => {*/}
                {/*    return (<EditExpense showEditModal={showEditModal} setEditModal={setEditModal} expense={expense}*/}
                {/*                         expenseId={expense.id}/>)*/}
                {/*})}*/}
            </ExpensesStyled>
        </>);
    }
;
export default Expenses;
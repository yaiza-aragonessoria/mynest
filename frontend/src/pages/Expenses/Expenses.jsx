import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import {fetchExpenses} from "../../features/slices/expensesSlice";
import ExpensesComponent from "../../components/Expenses/ExpensesComponent";
import AddExpenses from "../../components/AddExpenses/AddExpenses";
import {fetchUser} from '../../features/slices/userSlice'
import {ExpensesStyled} from "./Expenses.styled";


const Expenses = () => {
    const dispatch = useDispatch();
    const expensesData = useSelector(store => store.expenses.expensesSlice)
    const userData = useSelector(store => store.userProfile.userProfileSlice)
    const handleEdit = (event) => {
        console.log('Button clicked', event);
    };
    const [showModal, setShowModal] = useState(false)

    const handleOpenModal = () => {
        setShowModal(true)
    }

    useEffect(() => {
        dispatch(fetchExpenses())
        dispatch(fetchUser())
    }, [showModal])


    return (<>
        <ExpensesStyled>
            <button onClick={handleOpenModal}>Add Expense</button>
            {showModal && <AddExpenses/>}
            {!showModal && expensesData?.map((expense) => {
                return (
                    <ExpensesComponent key={expense?.id} expenses={expense}
                                       name_payer={userData.id === expense.payer.id ? "You" : expense.payer.first_name}
                                       onEdit={handleEdit}/>
                )
            })
            }
        </ExpensesStyled>
    </>);
};
export default Expenses;
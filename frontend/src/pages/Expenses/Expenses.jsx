import React, { useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import {fetchExpenses} from "../../features/slices/expensesSlice";
import ExpensesComponent from "../../components/Expenses/ExpensesComponent";
import AddExpenses from "../../components/AddExpenses/AddExpenses";
import { fetchUser } from '../../features/slices/userSlice'



const Expenses = () => {
    const dispatch = useDispatch();
    const expensesData = useSelector(store => store.expenses.expensesSlice)
    console.log("Expensesssss", expensesData)
    const userData = useSelector(store => store.userProfile.userProfileSlice)
    console.log('UserME', userData)
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
        console.log("EXPENSES", expensesData)

// send the logged in user,
// is the logged in user as the payer
            //function th
    }, [])


    return (<>
        <button onClick={handleOpenModal}>Add Expense</button>
        {showModal && <AddExpenses/>}
        {!showModal && expensesData?.map((expenses) => {
            return (
                <ExpensesComponent key={expenses?.id} expenses={expenses} name_payer={userData.id === expensesData.expenses ? "You" : expensesData.payer} onEdit={handleEdit}/> // make the slice, for user id, id of the payer from the backend
            )
        })
        }
    </>);
};
export default Expenses;
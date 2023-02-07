import React, { useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import {fetchExpenses} from "../../features/slices/expensesSlice";
import ExpensesComponent from "../../components/Expenses/ExpensesComponent";
import AddExpenses from "../../components/AddExpenses/AddExpenses";


const Expenses = () => {
    const dispatch = useDispatch();
    const expensesData = useSelector(store => store.expenses.expensesSlice)
    const handleEdit = (event) => {
    console.log('Button clicked', event);
  };
    const [showModal, setShowModal] = useState(false)

    const handleOpenModal = () => {
        setShowModal(true)
    }

    useEffect(() => {

        dispatch(fetchExpenses())
        console.log("EXPENSES", expensesData)


    }, [])
    return (<>
        <button onClick={handleOpenModal}>Add Expense</button>
        {showModal && <AddExpenses/>}
        {!showModal && expensesData?.map((expenses) => {
            return (
                <ExpensesComponent key={expenses?.id} expenses={expenses} onEdit={handleEdit}/>
            )
        })
        }
    </>);
};
export default Expenses;
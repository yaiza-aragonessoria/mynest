import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import {fetchExpenses} from "../../features/slices/expensesSlice";
import ExpensesComponent from "../../components/Expenses/ExpensesComponent";
import AddExpenses from "../../components/AddExpenses/AddExpenses";
import {fetchUser} from '../../features/slices/userSlice'
import {ExpensesStyled} from "./Expenses.styled";
import EditExpense from '../../components/EditExpense/EditExpense'
import api from "../../api/myNest";
import MustHaveHome from "../../components/MustHaveHome/MustHaveHome";
import MustLogIn from "../../components/MustLogIn/MustLogIn";
import {useNavigate} from "react-router-dom";
import Loading from "../../components/Loading/Loading";

const Expenses = () => {
  const navigate = useNavigate();
        const dispatch = useDispatch();
        const access = localStorage.getItem("access");
        const expensesData = useSelector(store => store.expenses.expensesSlice)
        const userData = useSelector(store => store.userProfile.userProfileSlice)
        const userLoaded = useSelector(state => state.userProfile.loaded);
        const [expenses, setExpenses] = useState([]);
        const [showModal, setShowModal] = useState(false)
        const [showEditModal, setEditModal] = useState(false);
        const [errorMessage, setErrorMessage] = useState('');
        const [hasUserHome, setHasUserHome] = useState(false);

        const headers = {
            headers: {
                Authorization: `Bearer ${access}`,
            },
        }


        const handleEdit = (event) => {
            setEditModal(!showEditModal);
            console.log(event.target.id)
        };

        const handleOpenModal = () => {
            setShowModal(true)
        }

        const handleSettleUp = async () => {
            try {
                const res = await api.post(`expenses/home/reset/${userData.home}/`, headers);
                window.location.reload();
            } catch (e) {
                setErrorMessage(e.message);
            }
        }

      useEffect(() => {
        if (!access) navigate("/login");

        dispatch(fetchUser());

      }, []);

        useEffect(() => {
            dispatch(fetchExpenses())
            dispatch(fetchUser())
        }, [showModal])

        const handleExpenseDelete = (expenseId) => {
            setExpenses(expenses.filter((expense) => expense.id !== expenseId));
            window.location.reload()
        };

        return (
            <>
                {userLoaded? userData?.home ?
                    <>
                    <ExpensesStyled>
                        <button onClick={handleOpenModal}>Add Expense</button>
                        {showModal && <AddExpenses/>}
                        <button onClick={handleSettleUp}>Settle up</button>
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
                </>
             : <MustHaveHome/> : <Loading/>
      }
      </>
  );
};
;
export default Expenses;
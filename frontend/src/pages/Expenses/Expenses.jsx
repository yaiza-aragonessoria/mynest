import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import {fetchExpenses} from "../../features/slices/expensesSlice";
import ExpensesComponent from "../../components/Expenses/ExpensesComponent";
import AddExpenses from "../../components/AddExpenses/AddExpenses";
import {fetchUser} from '../../features/slices/userSlice'
import {Parent, Wrapper, Vjosa, MainContainer, Nina, Julia, Sara, Nila, Risa} from "./Expenses.styled";
import api from "../../api/myNest";
import MustHaveHome from "../../components/MustHaveHome/MustHaveHome";
import MustLogIn from "../../components/MustLogIn/MustLogIn";
import {useNavigate} from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import {Column,} from "../../components/Expenses/ExpensesComponent.styled";

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
    const [searchTerm, setSearchTerm] = useState("");

    const headers = {
        headers: {
            Authorization: `Bearer ${access}`,

        },
    }

    const config = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${access}`,
        },
        params: {q: searchTerm}
    };

    const fetchAllTasks = async () => {
        try {
            const response = await api.get(`expenses/home/`, config);
            setExpenses(response.data);
            console.log("Vjosa", expenses);
        } catch (error) {
            console.log(error.response);
        }
    };

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
        fetchAllTasks();
    }, [searchTerm]);

    useEffect(() => {
        dispatch(fetchExpenses())
        dispatch(fetchUser())
    }, [showModal])

    const handleExpenseDelete = (expenseId) => {
        setExpenses(expenses.filter((expense) => expense.id !== expenseId));
        window.location.reload()
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }


    return (
        <>
            {userLoaded ? userData?.home ?
                <>

                    <Wrapper>
                        <Vjosa>
                            <Parent>
                                <Nila>
                                    <h3 className="header">Shared Expenses</h3>
                                    <form>
                                        <input
                                            className="text"
                                            type="text"
                                            placeholder="Search expense..."
                                            value={searchTerm}
                                            onChange={handleSearch}
                                        />
                                    </form>
                                </Nila>
                                <Risa>
                                    <button className='btn_purple' onClick={handleOpenModal}>Add Expense</button>

                                    {showModal && <AddExpenses/>}
                                    <button className='btn_purple' onClick={handleSettleUp}>Settle up</button>
                                </Risa>
                            </Parent>
                            <MainContainer>
                                <Sara>
                                <Nina>
                                    <Column>
                                        <span>Date</span>
                                    </Column>
                                    <Column>
                                        <span>Category</span>
                                    </Column>
                                    <Column>
                                        <span>Expense name</span>
                                    </Column>
                                    <Column>
                                        <span> Amount</span>
                                    </Column>
                                    <Column>
                                        <span> Payer </span>
                                    </Column>
                                    {/*<span> Payer {props.expenses?.payer?.first_name ? props.expenses.payer.first_name : props.expenses.payer.email} </span>*/}
                                    <Column></Column>
                                </Nina>

                                <Julia>
                                {expensesData?.map((expense) => {
                                    return (
                                        <>
                                            {<ExpensesComponent key={expense?.id} expenses={expense}
                                                                name_payer={userData.id === expense.payer.id ? "You" : expense.payer.first_name}
                                                                onEdit={handleEdit}
                                                                onExpenseDelete={handleExpenseDelete}/>}

                                        </>
                                    )
                                })
                                }
                                </Julia>
                                </Sara>
                            </MainContainer>
                        </Vjosa>
                    </Wrapper>
                </>
                : <MustHaveHome/> : <Loading/>
            }
        </>
    );
};
;
export default Expenses;
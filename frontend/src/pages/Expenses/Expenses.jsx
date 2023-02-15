import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import {fetchExpenses} from "../../features/slices/expensesSlice";
import ExpensesComponent from "../../components/Expenses/ExpensesComponent";
import AddExpenses from "../../components/AddExpenses/AddExpenses";
import {fetchUser} from '../../features/slices/userSlice'
import {
    Parent,
    Wrapper,
    MainContainer,
    Buttons,
    SearchBar,
    ExpensesContainer, ExpensesList, ExpensesHeader, ComponentWrapper
} from "./Expenses.styled";
import api from "../../api/myNest";
import MustHaveHome from "../../components/MustHaveHome/MustHaveHome";
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
    const [searchTerm, setSearchTerm] = useState("");
    const isLoading = useSelector( state => state.expenses.isLoading);
    const loaded = useSelector( state => state.expenses.loaded);
    console.log("isLoading ", isLoading);
    console.log("loaded ", loaded);
    console.log(expensesData);

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
        dispatch(fetchExpenses(searchTerm));
    }, [searchTerm]);

    useEffect(() => {
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
                        <ComponentWrapper>
                            <Parent>
                                <SearchBar>
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
                                </SearchBar>
                                <Buttons>
                                    <button className='btn_purple' onClick={handleOpenModal}>Add Expense</button>

                                    {showModal && <AddExpenses/>}
                                    <button className='btn_purple' onClick={handleSettleUp}>Settle up</button>
                                </Buttons>
                            </Parent>
                            <MainContainer>
                                <ExpensesContainer>
                                    <ExpensesHeader>
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
                                        <Column></Column>
                                    </ExpensesHeader>

                                    <ExpensesList>
                                        {isLoading && expensesData.length == 0 &&
                                            <div className='loading'>
                                            <img className='' src='assets/loading.gif'/>
                                            </div>}
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
                                    </ExpensesList>
                                </ExpensesContainer>
                            </MainContainer>
                        </ComponentWrapper>
                    </Wrapper>
                </>
                : <MustHaveHome/> : <Loading/>
            }
        </>
    );
};
;
export default Expenses;
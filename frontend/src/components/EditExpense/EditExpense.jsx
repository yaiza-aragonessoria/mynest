import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchExpenses} from "../../features/slices/expensesSlice";
import {fetchUser} from "../../features/slices/userSlice";
import {categories} from "../../constants/categories";
import api from "../../api/myNest";
import {useNavigate} from "react-router-dom"
import axios from "axios";


// const EditExpense = ({showEditModal, setEditModal, expense}) => {
const EditExpense = (props) => {
        const navigate = useNavigate();
        const [inputValue, setInputValue] = useState({
            name: props.expense.name,
            amount: props.expense.amount,
            category: props.expense.category,
            creator: props.expense.creator,
            bill_image: props.expense.bill_image,
            shared_with: props.expense.shared_with,
            created: props.expense.created,
            payer: props.expense.payer.id
        });
        const access = localStorage.getItem("access");
        const [checked, setChecked] = useState([]);
        const [errorMessage, setErrorMessage] = useState("");
        const [homeMembers, setHomeMembers] = useState([]);

        console.log(inputValue)

        const handleChange = (e) => {
            setInputValue({...inputValue, [e.target.name]: e.target.value})
            console.log(inputValue)
        }

        const headers = {
            headers: {
                Authorization: `Bearer ${access}`,
            },
        }

        const handleCheck = (event) => {
            let updatedList = [...checked];
            if (event.target.checked) {
                updatedList = [...checked, event.target.value];
            } else {
                updatedList.splice(checked.indexOf(event.target.value), 1);
            }
            setChecked(updatedList);
            setInputValue({...inputValue, shared_with: updatedList})

        };


        const getHomeMembers = async () => {
            try {
                setHomeMembers([])
                const res = await api.get("users/home/", headers);
                setHomeMembers(res.data);

            } catch (e) {
                setErrorMessage(e.message);
            }
        }

        useEffect(() => {
            getHomeMembers();
        }, []);



        const handleSave = event => {
            event.preventDefault();
            console.log("EXpenseeeee", inputValue)
            console.log("id", props.expenseId)
            api.patch(`expenses/${props.expenseId}/`, inputValue, headers)
                .then(response => {
                    console.log(response);
                    window.location.reload();
                })
                .catch(error => {
                    console.log(error);

                });
            props.setEditModal(false);
        }
        return (
            props.showEditModal && (
                <form onSubmit={handleSave}>
                    <div>
                        <label>Name</label>
                        <input
                            name={'name'}
                            type="text"
                            value={inputValue.name}
                            // defaultValue={inputValue.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor=''>Payer </label>
                        <select onChange={handleChange}
                                name={'payer'}>
                            <option value="">Select a payer</option>
                            {homeMembers.map((member) => {
                                return (
                                    <option value={member?.id}
                                            selected={member.id === inputValue.payer}>{member?.first_name}</option>
                                );})
                            }
                        </select>
                    </div>
                    <div>
                        <label htmlFor=''>Category </label>
                        <select onChange={handleChange}
                                name={'category'}>

                            {categories.map((category) => {
                                return (
                                    <>
                                        <option selected={Number(category.value) === inputValue.category}
                                                value={category.value}>{category.label}</option>

                                    </>
                                )
                            })}
                        </select>

                    </div>
                    <div>
                        <label htmlFor=''>Amount</label>
                        <input id='' name='amount' defaultValue={inputValue.amount} onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor=''>Date</label>
                        {console.log(inputValue)}
                        <input id='' name='created' type={'date'} value={inputValue.created} defaultValue={inputValue.created} onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Shared with:</label>
                        {homeMembers.map((member, index) => {
                            let memberName = member?.first_name ? member.first_name : member.email;
                            console.log(inputValue.shared_with)
                            return (<>
                                <label id={index} htmlFor={memberName}>
                                    <input type={"checkbox"}
                                           name={'shared_with'}
                                           value={member?.id}
                                           onChange={handleCheck}/>{memberName}
                                </label></>)
                        })}
                    </div>

                    <button type="submit">Save</button>
                    <button onClick={() => props.setEditModal(false)}>Cancel</button>

                </form>
            )
        );
    }
;

export default EditExpense;
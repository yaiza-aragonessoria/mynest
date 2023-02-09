import React, {useEffect, useState} from "react";
import api from '../../api/myNest';
import {ExpensesComponentStyled, PopupWrapper} from "./AddExpense.styled";
import axios from "axios";

const AddExpenses = () => {
    const [homeMembers, setHomeMembers] = useState([]);
    const access = localStorage.getItem("access");

    const headers = {
        headers: {
            Authorization: `Bearer ${access}`,
        },
    }
    const getHomeMembers = async () => {
        try {
            setHomeMembers([])
            const res = await axios.get("https://mynest.propulsion-learn.ch/backend/api/users/home/", headers);
            setHomeMembers(res.data);

        } catch (e) {
            setErrorMessage(e.message);
        }
    }

    useEffect(() => {
        getHomeMembers().then(result => console.log(result))
    }, [])
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        payer: '',
        shared_with: [],
        date: ''
    });
    const goToHomePage = () => {
        window.location.reload();
    };

    const handleChange = event => {
        setFormData({...formData, [event.target.name]: event.target.value});
        console.log("formData =", formData)
    }
    const [errorMessage, setErrorMessage] = useState("");
    const [checked, setChecked] = useState([]);
    const handleCheck = (event) => {
        let updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
        setFormData({...formData, shared_with: updatedList})

    };

    const categories = [
        {
            label: "GROCERIES",
            value: "1",
        },
        {
            label: "MAINTENANCE",
            value: "2",
        },
        {
            label: "UTILITIES",
            value: "3",
        },
        {
            label: "HOUSEHOLD_SUPPLIES",
            value: "4",
        },
        {
            label: "OTHER",
            value: "5",
        }
    ];


    const handleSubmit = event => {
        event.preventDefault();


        api.post("https://mynest.propulsion-learn.ch/backend/api/expenses/", formData, headers)
            .then(response => {
                if (response.status === 201) {
                    window.location.reload()
                }
            })
            .catch(error => {
                console.log(error);
            });

    }


    return (<>
        <ExpensesComponentStyled>
            <PopupWrapper>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor=''>Expense name</label>
                    <input id='' name='name' value={formData.name} onChange={handleChange} required/>
                </div>
                <div>
                    <label htmlFor=''>Category </label>
                    <select onChange={handleChange}
                            name={'category'}>
                        <option value="" className={'select-option'}>Select a value...</option>
                        {categories.map((category) => (
                            <option value={category.value}>{category.label}</option>
                        ))}
                    </select>

                </div>
                <div>
                    <label htmlFor=''>Amount</label>
                    <input id='' name='amount' value={formData.amount} onChange={handleChange} required/>
                </div>
                <div>
                    <label htmlFor=''>Payer </label>
                    <select onChange={handleChange}
                            name={'payer'}>
                        <option value="" className={'select-option'}>Select a value...</option>
                        {homeMembers.map((member) => (
                            <option value={member.id}>{member.first_name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor=''>Date</label>
                    <input id='' name='date' type={'date'} value={formData.date} onChange={handleChange} required/>
                </div>
                <div>
                    <label>Shared with:</label>
                    {homeMembers.map((member, index) => {
                        let memberName = member.first_name ? member.first_name : member.email;
                        return (<>
                            <label id={index} htmlFor={memberName}>
                                <input type={"checkbox"}
                                       name={'shared_with'}
                                       value={member.id}
                                       onChange={handleCheck}/>{memberName}
                            </label></>)
                    })}
                </div>
                <button type="submit">Save</button>
                <button onClick={goToHomePage}>Cancel</button>
            </form>
            </PopupWrapper>
        </ExpensesComponentStyled>
    </>);
};
export default AddExpenses;
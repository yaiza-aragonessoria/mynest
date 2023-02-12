import React, {useEffect, useState} from "react";
import api from '../../api/myNest';
import {Buttons, ExpensesComponentStyled, FormFields, PopupBg, PopupWrapper, SharedCheckbox} from "./AddExpense.styled";
import {categories} from "../../constants/categories";

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
            const res = await api.get("users/home/", headers);
            setHomeMembers(res.data);

        } catch (e) {
            setErrorMessage(e.message);
        }
    }

    useEffect(() => {
        getHomeMembers();
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

    const handleSubmit = event => {
        event.preventDefault();


        api.post("expenses/", formData, headers)
            .then(response => {
                console.log(formData)
                if (response.status === 201) {
                    window.location.reload()
                }
            })
            .catch(error => {
                console.log(error);
            });

    }


    return (<>
        <PopupBg>
        <ExpensesComponentStyled>
            <PopupWrapper>
                <h3 className="header">Add Expense</h3>
                <form onSubmit={handleSubmit}>

                    <FormFields>
                        <label htmlFor=''>Expense name</label>
                        <input id='' name='name' value={formData.name} onChange={handleChange} required/>
                    </FormFields>
                    <FormFields>
                        <label htmlFor=''>Category </label>
                        <select onChange={handleChange}
                                name={'category'}>
                            <option value="">Select the category</option>
                            {categories.map((category, index) => (
                                <option key ={index} value={category.value}>{category.label}</option>
                            ))}
                        </select>

                    </FormFields>
                    <FormFields>
                        <label htmlFor=''>Amount</label>
                        <input id='' name='amount' value={formData.amount} onChange={handleChange} required/>
                    </FormFields>
                    <FormFields>
                        <label htmlFor=''>Payer </label>
                        <select onChange={handleChange}
                                name={'payer'}>
                            <option value="" id='select-styling'>Select a payer</option>
                            {homeMembers.map((member, index) => (
                                <option key={index} value={member?.id}>{member?.first_name}</option>
                            ))}
                        </select>
                    </FormFields>
                    <FormFields>
                        <label htmlFor=''>Date</label>
                        <input id='' key={formData.id} name='date' className='select-styling' type={'date'} value={formData.date} onChange={handleChange} required/>
                    </FormFields>
                    <SharedCheckbox>
                        <label>Shared with:</label>
                        {homeMembers.map((member, index) => {
                            let memberName = member?.first_name ? member.first_name : member.email;
                            return (<>
                                <label id={index} htmlFor={memberName}>
                                    <input type={"checkbox"}
                                           name={'shared_with'}
                                           value={member?.id}
                                           key={index}
                                           onChange={handleCheck}/>{memberName}
                                </label></>)
                        })}
                    </SharedCheckbox>
                    <Buttons>
                        <button className="btn_purple" type="submit">Save</button>
                        <button className="btn_purple" onClick={goToHomePage}>Cancel</button>
                    </Buttons>
                </form>
            </PopupWrapper>
        </ExpensesComponentStyled>
            </PopupBg>
    </>);
};
export default AddExpenses;
import React, {useEffect, useState} from 'react';
import {categories} from "../../constants/categories";
import api from "../../api/myNest";
import {ExpensesComponentStyled, PopupWrapper, PopupBg, FormFields, Buttons, SharedCheckbox} from "./EditExpense.styled";


const EditExpense = (props) => {
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


        const handleChange = (e) => {
            setInputValue({...inputValue, [e.target.name]: e.target.value})
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
            api.patch(`expenses/${props.expenseId}/`, inputValue, headers)
                .then(response => {
                    window.location.reload();
                })
                .catch(error => {
                    console.log(error);

                });
            props.setEditModal(false);
        }
        return (
            <PopupBg>
                <ExpensesComponentStyled>
                    <PopupWrapper>
                        <h3 className="header">Edit Expense</h3>
                        {props.showEditModal && (
                            <form onSubmit={handleSave}>
                                <FormFields>
                                    <label>Expense name</label>
                                    <input
                                        name={'name'}
                                        type="text"
                                        value={inputValue.name}
                                        // defaultValue={inputValue.name}
                                        onChange={handleChange}
                                    />
                                </FormFields>
                                <FormFields>
                                    <label htmlFor=''>Payer </label>
                                    <select onChange={handleChange}
                                            name={'payer'}>
                                        <option value="">Select a payer</option>
                                        {homeMembers.map((member, index) => {
                                            return (
                                                <option value={member?.id}
                                                        key={index}
                                                        selected={member.id === inputValue.payer}>{member?.first_name}</option>
                                            );
                                        })
                                        }
                                    </select>
                                </FormFields>
                                <FormFields>
                                    <label htmlFor=''>Category </label>
                                    <select onChange={handleChange}
                                            name={'category'}>

                                        {categories.map((category, index) => {
                                            return (
                                                <>
                                                    <option
                                                        selected={Number(category.value) === inputValue.category}
                                                        key={index} value={category.value}>{category.label}</option>

                                                </>
                                            )
                                        })}
                                    </select>

                                </FormFields>
                                <FormFields>
                                    <label htmlFor=''>Amount</label>
                                    <input id='' name='amount' defaultValue={inputValue.amount} onChange={handleChange}/>
                                </FormFields>
                                <FormFields>
                                    <label htmlFor=''>Date</label>
                                    <input id='' name='created' type={'date'} value={inputValue.created}
                                           defaultValue={inputValue.created} onChange={handleChange}
                                    />
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
                                    <button className="btn_purple" onClick={() => props.setEditModal(false)}>Cancel</button>
                                </Buttons>
                            </form>
                        )}
                    </PopupWrapper>
                </ExpensesComponentStyled>
            </PopupBg>
        );
    }
;

export default EditExpense;
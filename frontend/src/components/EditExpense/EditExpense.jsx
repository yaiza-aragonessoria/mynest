import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchExpenses} from "../../features/slices/expensesSlice";
import {fetchUser} from "../../features/slices/userSlice";
import {categories} from "../../constants/categories";


// const EditExpense = ({showEditModal, setEditModal, expense}) => {
const EditExpense = (props) => {
        const [inputValue, setInputValue] = useState(props.expense);

        const handleChange = (e) => {
            setInputValue({...inputValue, [e.target.name]: e.target.value})
            console.log(inputValue)
        }

        const handleSave = () => {
            console.log('Submitting: ', inputValue);
            props.setEditModal(false);
        };

        return (
            props.showEditModal && (
                <form onSubmit={handleSave}>
                    <div>
                        <label>Name</label>
                        <input
                            type="text"
                            defaultValue={inputValue.name}
                            onChange={handleChange}
                        />
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
                        <input id='' name='date' type={'date'} defaultValue={inputValue.date} onChange={handleChange}
                        />
                    </div>

                    <button type="submit">Save</button>
                    <button onClick={() => props.setEditModal(false)}>Cancel</button>

                </form>
            )
        );
    }
;

export default EditExpense;
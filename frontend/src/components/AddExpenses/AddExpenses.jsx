import React, {useEffect, useState} from "react";
import api from '../../api/myNest';
import {useNavigate} from "react-router-dom";
import {ExpensesComponentStyled} from "./AddExpense.styled";

const AddExpenses = () => {
    const navigate = useNavigate();
    const checkList = ["Apple", "Banana", "Tea", "Coffee"];
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        payer: '',
        shared_with: [],
        date: ''
    });
    const handleChange = event => {
        setFormData({...formData, [event.target.name]: event.target.value});
        console.log("formData =", formData)
    }
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = e => {
        e.preventDefault();

        const form = new FormData();

        for (const key in formData) {
            form.append(key, formData[key]);
        }
        ;


        if (form.has("name") && form.get("name").length > 0) {
            setErrorMessage("");

            api.post("https://mynest.propulsion-learn.ch/backend/api/expenses/", form)
                .then(response => {
                    console.log(response);
                    if (response.status === 201) navigate("/expenses");
                })
                .catch(error => {
                    console.log(error);
                });


        } else {
            setErrorMessage("This field may not be blank.");
            return null
        }
        console.log("form =", Object.fromEntries(form))
    }
    return (<>
        <ExpensesComponentStyled>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor=''>Expense name</label>
                    <input id='' name='name' value={formData.name} onChange={handleChange} required/>
                </div>
                <div>
                    <label htmlFor=''>Category</label>
                    <input id='' name='category' value={formData.category} onChange={handleChange} required/>
                </div>
                <div>
                    <label htmlFor=''>Amount</label>
                    <input id='' name='amount' value={formData.amount} onChange={handleChange} required/>
                </div>
                <div>
                    <label htmlFor=''>Payer</label>
                    <input id='' name='payer' value={formData.payer} onChange={handleChange} required/>
                </div>
                <div>
                    <label htmlFor=''>Date</label>
                    <input id='' name='date' type={'date'} value={formData.date} onChange={handleChange} required/>
                </div>
                <div>
                    <label>Shared with:</label>
                    {checkList.map((item, index) => (<div key={index}>
                        <input value={item} type="checkbox"/>
                        <span>{item}</span>
                    </div>))}
                    {/*<input*/}
                    {/*    type="checkbox"*/}
                    {/*    value=''*/}
                    {/*    checked*/}
                    {/*    onChange={handleChange}*/}
                    {/*/>*/}
                    {/*// a map and going to have a list, a full object that represents the whole users of that home,*/}
                </div>
                {/*<div>*/}
                {/*    <label htmlFor=''>Shared with</label>*/}
                {/*    <select onChange={handleChange}>*/}
                {/*// name={'category'}>*/}
                {/*        /!*<option value="" selected>Select a category...</option>*!/*/}
                {/*        <option value="1" selected>Share expenses with...</option>*/}
                {/*        /!*{users.map((category) => (*!/*/}
                {/*        /!*  // <option value={category.value}>{category.label}</option>*!/*/}
                {/*        <option>Vjosa</option>*/}
                {/*        <option>Nina</option>*/}
                {/*        /!*))}*!/*/}
                {/*    </select>*/}
                {/*</div>*/}
                <button type="submit">Save</button>
                <button type="submit">Cancel</button>
            </form>
        </ExpensesComponentStyled>
    </>);
};
export default AddExpenses;
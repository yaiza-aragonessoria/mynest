import {Route, Routes} from 'react-router-dom';

import './App.css';
import Shoppinglist from './pages/ShoppingList/ShoppingList';
import Login from "./pages/Login/Login";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Calendar from "./pages/Calendar/Calendar";
import FavouriteItems_popup from './components/FavouriteItems/FavouriteItems_popup';
import CreateTask from './components/CreateTask';
import Tasks from './pages/Tasks';
import EditTask from './components/EditTask'
import Expenses from './pages/Expenses/Expenses';
import Footer from './components/Footer/Footer';
import Signup from './pages/Signup/Signup';
import UserProfile from "./pages/UserProfile/UserProfile";

function App() {
    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path="/shoppinglist" element={<Shoppinglist/>}/>
                <Route path="/editshoppinglist" element={<FavouriteItems_popup/>}/>
                <Route path="/calendar" element={<Calendar/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/sign-up" element={<Signup/>}/>
                <Route path="/to-do" element={<Tasks/>}/>
                <Route path="/add-task" element={<CreateTask/>}/>
                <Route path="/edit-task" element={<EditTask/>}/>
                <Route path="/expenses" element={<Expenses/>}/>
                <Route path="/user-profile" element={<UserProfile/>}/>
            </Routes>
            <Footer />

        </div>);
}

export default App;

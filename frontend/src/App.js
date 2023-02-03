import {Route, Routes} from 'react-router-dom';

import './App.css';
import Shoppinglist from './pages/ShoppingList/ShoppingList';
import Login from "./pages/Login/Login";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";


function App() {
    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path="/shoppinglist" element={<Shoppinglist/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>

        </div>);
}

export default App;

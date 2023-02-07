import {Route, Routes} from 'react-router-dom';

import './App.css';
import Shoppinglist from './pages/ShoppingList/ShoppingList';
import Expenses from './pages/Expenses/Expenses';

function App() {
    return (
        <div className="App">
            <Routes>
                {/*<Route path='/' element={</>}/>*/}
                <Route path="/shoppinglist" element={<Shoppinglist/>}/>
                <Route path="/expenses" element={<Expenses/>}/>
            </Routes>

        </div>);
}

export default App;

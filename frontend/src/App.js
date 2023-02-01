import {Route, Routes} from 'react-router-dom';

import './App.css';
import Shoppinglist from './pages/ShoppingList/ShoppingList';

function App() {
    return (
        <div className="App">
            <Routes>
                {/*<Route path='/' element={</>}/>*/}
                <Route path="/shoppinglist" element={<Shoppinglist/>}/>
            </Routes>

        </div>);
}

export default App;

import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import AddItem from './components/AddItem'
import EditItem from './components/EditItem'
import ItemBrowser from './components/ItemBrowser'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/addItem' element={<AddItem />}></Route>
        <Route path='/edit/:id' element={<EditItem />}></Route>
        <Route path='/' element={<ItemBrowser />}></Route>

      </Routes>
    </Router>
  );
}

export default App;

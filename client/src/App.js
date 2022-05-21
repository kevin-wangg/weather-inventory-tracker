import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import AddItem from './components/AddItem'
import EditItem from './components/EditItem'
import ItemBrowser from './components/ItemBrowser'
import ViewDeleted from './components/ViewDeleted'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/addItem' element={<AddItem />}></Route>
        <Route path='/edit/:id' element={<EditItem />}></Route>
        <Route path='/viewDeleted' element={<ViewDeleted />}></Route>
        <Route path='/' element={<ItemBrowser />}></Route>

      </Routes>
    </Router>
  );
}

export default App;

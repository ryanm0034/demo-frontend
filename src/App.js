import CustomerComponent from './components/CustomerComponent'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListCustomerComponent from './components/ListCustomerComponent'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <HeaderComponent />
      <Routes>
        <Route path='/' element={<ListCustomerComponent />} />
        <Route path='/customers' element={<ListCustomerComponent />} />
        <Route path='/add-customer' element={<CustomerComponent />} />
        <Route path='/edit-customer/:id' element={<CustomerComponent />} />
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;

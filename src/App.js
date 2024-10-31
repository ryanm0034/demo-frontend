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
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;

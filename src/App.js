import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InvoiceItems from './components/InvoiceItems/InvoiceItems';
import InvoiceForm from './components/InvoiceForm/InvoiceForm';
import ItemForm from './components/ItemForm/ItemForm';
import InvoiceList from './components/InvoiceList/InvoiceList';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='' element={<InvoiceList />} />
        <Route path='newInvoice' element={<InvoiceForm />} />
        <Route path='/:id' element={<InvoiceItems />} />
        <Route path='/:id/newItem' element={<ItemForm />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='login' element={<LoginPage />} />
      </Routes>
      </BrowserRouter>
        {/* <RegisterPage /> */}
        {/* <LoginPage /> */}
        {/* <InvoiceForm /> */}
        {/* <InvoiceList /> */}
        {/* <InvoiceItems />
        <ItemForm /> */}
    </div>  
  );
}

export default App;

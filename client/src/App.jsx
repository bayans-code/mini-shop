import {Routes, Route } from 'react-router-dom';
import ProductListAdmin from './components/admin/ProductListAdmin';
import ProductListCustomer from './components/customer/ProductListCustomer';
import ProductRegister from './components/admin/ProductRegister';
import Cart from "./components/customer/Cart"
import Header from './Header'
import CustomerRegister from "./components/customer/CustomerRegister"
import Login from './Login'
import ProtectedRoute from './ProtectedRoute';


function App() {

  return (
     <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>  
           <Header/>
       <div style={{ flex: 1, width: '90%' }}>
           <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Login />} />
                    <Route path="/custReg" element={<CustomerRegister />} />
                    
                    {/* Customer Routes */}
                    <Route path="/clist" element={
                       <ProtectedRoute allowedRoles='customer'>
                          <ProductListCustomer />
                    </ProtectedRoute>}/>

                    <Route path="/cart" element={
                      <ProtectedRoute allowedRoles='customer'>
                          <Cart />
                    </ProtectedRoute>}/>
                      
  
                    {/* Admin Routes */}
                    <Route path="/alist" element={
                      <ProtectedRoute allowedRoles='admin'>
                          <ProductListAdmin />
                    </ProtectedRoute>}/>

                    <Route path="/register" element={
                      <ProtectedRoute allowedRoles='admin'>
                          <ProductRegister />
                    </ProtectedRoute>}/>
                    
            </Routes>
       </div>
    </div>
  );
}
export default App;
//import logo from './logo.svg';
// import './App.css';
//importing components

import { useState } from 'react';

import {DataProvider} from './context/DataProvider';

import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';

import Login from './components/accounts/Login';
import Home from './components/home/Home';
import Header from './components/header/Header';
import CreatePost from './components/create/CreatePost';
import DetailView from './components/details/Detail-View';
import Update from './components/create/Update';
import Contact from './contact/Contact';
import About from './components/about/About';

const PrivateRoute = ({isAuthenticated, ...props }) => {
  
//
  return isAuthenticated ?(
     <>
        <Header />
        <Outlet />
     </>
    ) : (
      <Navigate replace to= '/login' />
    )
}
function App() {

  const [isAuthenticated, isUserAuthenticated] = useState(false);
  


  return (
      <DataProvider>
        <BrowserRouter>
           <div style={{marginTop:64}}>
             <Routes>
              <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated} />}/>

                 <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                    <Route index element={<Home />} /> 
                 </Route>

                 <Route path='/contact' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                    <Route index element={<Contact />} /> 
                 </Route>

                 <Route path='/about' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                    <Route index element={<About />} /> 
                 </Route>

                 <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                    <Route 
                        index 
                        element={
                           <CreatePost />} 
                           /> 
                 </Route>

                 <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                    <Route path='/details/:id' element={<DetailView />}/> 
                 </Route>

                 <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                    <Route path='/update/:id' element={<Update />}/> 
                 </Route>

              </Routes> 
           </div>
       </BrowserRouter>
     </DataProvider>    
   );
}


export default App;

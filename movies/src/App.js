
import { Route, Routes } from 'react-router';
import './App.css';
import Header from './components/Header';
import React, { useEffect } from 'react';
import HomePage from './components/HomePage';
import Admin from './components/Auth/Admin';
import Auth from './components/Auth/Auth';
import Movies from './components/Movies/Movies';
import { useDispatch, useSelector } from 'react-redux';
import { adminActions, userActions } from './store';
import Booking from './components/Bookings/Booking'
import UserProfile from './profile/UserProfile';
import AddMovie from './components/Movies/AddMovie';
import AdminProfile from './profile/AdminProfile';

function App() {
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  console.log("isAdminLoggedIn", isAdminLoggedIn);
  console.log("isUserLoggedIn", isUserLoggedIn);
  
  //
  //we are now using this hook to update the state if the component is reloaded.
  useEffect(()=>{
    if(localStorage.getItem("userId")){
      dispatch(userActions.login());
    }
    else if(localStorage.getItem("adminId")){
      dispatch(adminActions.login());
    }
  },[])
  return (
    <div >
     <Header/>
     <section>
     <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<Movies />} />
          {!isUserLoggedIn && !isAdminLoggedIn && (
            <>
              {" "}
              <Route path="/admin" element={<Admin />} />
              <Route path="/auth" element={<Auth />} />
            </>
          )}
          {isUserLoggedIn && !isAdminLoggedIn && (
            <>
              {" "}
              <Route path="/user" element={<UserProfile />} />
              <Route path="/booking/:id" element={<Booking />} />
            </>
          )}
          {isAdminLoggedIn && !isUserLoggedIn && (
            <>
              {" "}
              <Route path="/add" element={<AddMovie />} />
              <Route path="/user-admin" element={<AdminProfile />} />{" "}
            </>
          )}
        </Routes>
     </section>
     {/* {HomePage} */}
    </div>
  );
}

export default App;
// When an action is dispatched, useSelector() will do a reference comparison of the previous selector result value and the current result value. If they are different, the component will be forced to re-render. If they are the same, the component will not re-render. 
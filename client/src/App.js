import React ,{createContext,useReducer } from 'react';
import { Route, Routes, Navigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";
import Navbar from './components/navbar/Navbar';
import Home from './Pages/home/Home';
import Login from './Pages/login/Login';
import Signup from './Pages/register/Signup';
import Welcome from './Pages/welcome/Welcome';
import ErrorPage from './Pages/error/ErrorPage';
import Logout from './Pages/logout/Logout';
// import NavPageImage from './components/NavPageImage';
import RandomImagePage from './Pages/RandomImagePage';
import Dashboard from './Pages/Dashboard/Dashboard';
import List from './Pages/list/List';
import { initialState,reducer } from './components/reducer/UseReducer';
import Admin from './Pages/Admin/Admin';
import ProtectedRoute from './ProtectedRoute';
export const UserContext = createContext();


const Routing = () => {
  var isLoggedIn = localStorage.getItem("jwt");
  var isAdmin = localStorage.getItem("role");

  console.log(isAdmin);
 console.log("Routing");
  return (
    
    <Routes>
        <Route path="/" element={<RandomImagePage />} />
        <Route path="/login" exact element={isLoggedIn ? <Navigate to="/home" /> : <Login />} />
        {/* <Route path="/login" exact element={<Login />} /> */}

        <Route path="/signup" exact element={isLoggedIn ? <Navigate to="/home" /> : <Signup />} />
        {/* <Route path="/welcome" element={<Welcome />} />  */}
        <Route path="/error" element={<ErrorPage />} />
        

        {/* ProtectedRoutes */}
        <Route path="/welcome" element={<ProtectedRoute component={Welcome} />} />
        <Route exact path="/home" element={<ProtectedRoute component={Home} />} />
        <Route path="/list" element={<ProtectedRoute  component={List} />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/Admin" element={isAdmin === "admin" ? <ProtectedRoute  component={Admin} /> : <Navigate to="/home" />} />
        <Route path="/Dashboard" element={<ProtectedRoute  component={Dashboard} />} />
        {/* <Route path="/Dashboard" element={<ProtectedRoute  component={Dashboard} />} /> */}
        {/* <Route path="/about" element={<About/>} /> */}
        </Routes>
  );
}



const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);


  return (
    <div>

      <UserContext.Provider value={[state, dispatch]}>
        <Navbar />
        <Routing />
      </UserContext.Provider>

    </div>
  
  );
}
export default App;
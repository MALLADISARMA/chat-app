import {Navigate,Route,Routes} from "react-router-dom";
import Login from "./pages/login/login";
import SignUp from "./pages/signup/signup";
import Home from "./pages/Home/home";

import "./App.css";
import {Toaster} from 'react-hot-toast';
import { useAuthContext } from "./context/authcontext";




function App() {
  const {authUser}=useAuthContext();
  

 return( 
   <div className='p-4 h-screen flex items-center justify-center'>
      
    <Routes>
      <Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
      <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />}/>
      <Route path='/signup'  element={authUser ? <Navigate to='/' /> : <SignUp />}/>




    </Routes>
    <Toaster/>

    </div>
  );

      
    
  
}

export default App;

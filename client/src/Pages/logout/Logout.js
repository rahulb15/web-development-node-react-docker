import React,{ useEffect,useContext,useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../App";




function Logout() {
const [data, setData] = useState(localStorage.getItem("jwt"));
const [ state, dispatch ] = useContext(UserContext);
const navigate = useNavigate();

  const handleSubmit = async () => {
    const result = await axios.get(
      "http://localhost:5000/api/user/logout",
      { headers: { Authorization: "Bearer " + data } }
    );
    localStorage.removeItem("jwt");
    localStorage.removeItem("role");
    dispatch({ type: "USER", payload: null });
    window.location.reload();
    navigate("/");
  }

  useEffect(() => {
    if (data) {
      handleSubmit();
    }
  }
  , [data]);

  // return (
  //   <div>
  //     <h1>Logout</h1>
  //     <button onClick={handleSubmit}>Logout</button>
  //   </div>
  // );

}


export default Logout;












// const Logout = () => {
//     const jwtToken = localStorage.getItem("jwt");
//   const [ state, dispatch ] = useContext(UserContext);
//   // const [data, setData] = useState([]);
//   const navigate = useNavigate();
//   var count = 0;
//   console.log(count);

//   async function logout(e) {
//     count++;
//     console.log(count);
//     e.preventDefault();
//     if(jwtToken)  {
//     const result = await axios.get(
//       "http://localhost:5000/api/user/logout",
//       { headers: { Authorization: "Bearer " + jwtToken } }
//     );
//     console.log(result.data.user);
//     localStorage.removeItem("jwt");
//     dispatch({ type: "USER", payload: null });
//     window.location.reload();
//     navigate("/");
//     }
//     else{
//       navigate("/");
//     }
//     // console.log("Button clicked");
//   }
//   return (
//     <>
//     <div>Logout</div>
//     <button className="btn btn-primary" onClick={logout}>Logout</button> 
//     </>
//   );

// }

// export default Logout;
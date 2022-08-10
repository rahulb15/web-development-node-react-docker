import React, { useEffect, useState} from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";


const List = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const token = localStorage.getItem("jwt");
  const temp = false;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await axios.get(
          "http://localhost:5000/api/user/allUsers"
        );
        setData(result.data);
        result.data.map(user => {
          if (temp){
          if (user.role === "admin") {
           setData(result.data.filter((item) => item.role === "admin"));
          }
          }
          else
          setData(result.data.filter((item) => item.role === "user"));
      }
      
      );
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  React.deleteElement = (token) => {
    var url = "http://localhost:5000/api/user/deleteUser";
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + token);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log("Deleted");
          window.location.reload();
        } else {
          console.log("Error");
        }
      }
    };
    xhr.send(JSON.stringify({ token: token }));
  };

  React.logoutElement = (token) => {
    console.log(token);
    var url = "http://localhost:5000/api/user/logout";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + token);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log("Logged out");
          localStorage.removeItem("jwt");
          window.location.reload();
        } else {
          console.log("Error");
        }
      }
    };
    xhr.send(JSON.stringify({ token: token }));
  };

React.updateElement = (item,role) => {
      var url = "http://localhost:5000/api/user/updateuser";
      var xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("Authorization", "Bearer " + item.token);
      xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                  if (role === "admin") {
                    setData(data.filter((item) => item.role="admin"));
                    console.log("Updated");
                    window.location.reload();
                  } else if (role === "user") {
                    setData(data.filter((item) => (item.role = "user")));
                    console.log("Updated");
                    window.location.reload();
                  }
              } else {
                  console.log("Error");
              }
          }
      }
      xhr.send(JSON.stringify({ token: item.token, role: role }));
      };

  return (
   
    <div className="home">
      <Sidebar />
      <div className="container">
     
        <div className="row">


{/* All Users Details Here*/}


          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h3 >All Users <span className="float-right"> <button className="btn btn-primary" onClick={() => {window.location.reload();}}>Refresh</button> </span></h3> 
              </div>
              <div className="card-body">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>
                      <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                          </div>
                      </th>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>
                        <button
                          className="btn btn-primary"
                        >
                          Delete All
                        </button>
                      </th>
                      <th>
                        <button
                          className="btn btn-primary"
                        >
                          Logout All
                        </button>
                      </th>
                      <th>
                        <button
                          className="btn btn-primary"
                        >
                          Assign to Admins
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((user) => (
                      <tr key={user.id}>
                        <td>
                          {<div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                          </div>}
                        </td>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.status}</td>
                        <td>
                          <button
                            className="btn btn-danger"
                              onClick={() => {
                                  React.deleteElement(user.token);
                              }
                              }
                          >
                            Delete
                          </button>
                        </td>
                          <td>
                              <button
                                  className="btn btn-primary"
                                  onClick={() => React.logoutElement(user.token)}
                              >
                                  Logout
                              </button>
                          </td>
                          <td>
                              <button
                                  className="btn btn-primary"
                                  onClick={() => React.updateElement(user,"admin")}
                              >
                                  To Admin
                              </button>
                          </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        


        </div>
      </div>
    </div>
  );
};
export default List;


import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./navbar.css";
import { logout } from "../../redux/actions/auth.action";
const Navbar = () => {
  const { userInfo, isAuthenticated } = useSelector(
    (state) => state.loginReducer
  );
  const dispatch = useDispatch();
  const logoutHandler = () => {
    localStorage.removeItem("clientInfo");
    dispatch(logout());
  };
  return (
    <div className="navbar">
      <div className="container">
        <div className="rightSection">
          <Link to="/">
            <img src="https://play-lh.googleusercontent.com/VRYmahhs3v6rARILk40Rf2dmUKOWJXwNjNi7cUme0iytSYd6YWNb5XtmGa6oZqExhQ" />
          </Link>
          <h1>Lezzoo Store</h1>
        </div>
        <div className="leftSection">
          <div className="login">
            {isAuthenticated ? (
              <h3>welcome {userInfo.name}</h3>
            ) : (
              <Link to="/login">login</Link>
            )}
          </div>
          <div className="Register">
            {isAuthenticated ? (
              <h3 style={{ cursor: "pointer" }} onClick={logoutHandler}>
                logout
              </h3>
            ) : (
              <Link to="/register">Register</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

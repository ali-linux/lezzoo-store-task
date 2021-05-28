import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import { login } from "../../redux/actions/auth.action";
import "./auth.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const { email, password } = formData;
  const { isAuthenticated, loading } = useSelector(
    (state) => state.loginReducer
  );
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  if (isAuthenticated) history.push("/");

  return (
    <div id="form">
      {loading && <Spin size="large" />}
      {isAuthenticated ? (
        <div></div>
      ) : (
        <div>
          <h1 className="auth-heading">Login</h1>
          <p className="lead">Login to Your Account</p>
          <form className="form" onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={onChange}
                minLength="6"
              />
            </div>
            <input type="submit" className="submit-button" value="Login" />
          </form>
          <p>
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;

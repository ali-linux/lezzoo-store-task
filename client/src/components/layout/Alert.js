import React from "react";
import { useSelector } from "react-redux";
import "./alert.css";
const Alert = () => {
  const alerts = useSelector((state) => state.alert);
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div className={`alert alert-${alert.alertType} `}>{alert.msg}</div>
    ))
  );
};

export default Alert;

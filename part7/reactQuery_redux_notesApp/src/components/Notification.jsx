import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const { message, type } = useSelector((state) => state.notification);
  if (!message) return null;
  const styles = {
    padding: "10px",
    margin: "10px 0",
    border: type === "error" ? "1px solid red" : "1px solid green",
    borderRadius: "5px",
  };

  return <div style={styles}>{message}</div>;
};

export default Notification;

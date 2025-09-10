import React from "react";

export default function Notification({ message, type }) {
  if (!message) return null;

  const baseStyle = {
    padding: 10,
    marginBottom: 10,
    border: "2px solid",
    borderRadius: 5,
  };

  const style = {
    ...baseStyle,
    color: type === "error" ? "red" : "green",
    borderColor: type === "error" ? "red" : "green",
  };

  return <div style={style}>{message}</div>;
}

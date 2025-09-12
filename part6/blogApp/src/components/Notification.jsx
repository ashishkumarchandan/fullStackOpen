import PropTypes from "prop-types";

const Notification = ({ message }) => {
  if (message === null) return null;

  const style = {
    color: message.type === "error" ? "red" : "green",
    background: "#f0f0f0",
    fontSize: 20,
    border: "1px solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return <div style={style}>{message.text}</div>;
};

Notification.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
};

export default Notification;

import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  if (!notification) return null;

  const style = {
    border: "1px solid black",
    padding: 10,
    margin: 10,
  };

  return <div style={style}>{notification}</div>;
};

export default Notification;

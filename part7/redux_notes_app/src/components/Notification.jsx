import { useSelector } from "react-redux";

const Notification = () => {
  const message = useSelector((state) => state.notification);

  if (!message) return null;

  return (
    <div
      style={{
        border: "1px solid black",
        padding: 10,
        marginBottom: 10,
        backgroundColor: "#808080",
      }}
    >
      {message}
    </div>
  );
};

export default Notification;

import React, { useState, useEffect } from "react";
import loginService from "./services/login";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import "./App.css";

export default function App() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });

  // load blogs from backend
  useEffect(() => {
    (async () => {
      const fetched = await blogService.getAll();
      setBlogs(fetched);
    })();
  }, []);

  // check localStorage for logged-in user
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const showNotification = (message, type = "success", seconds = 5) => {
    setNotification({ message, type });
    setTimeout(
      () => setNotification({ message: null, type: null }),
      seconds * 1000
    );
  };

  const handleLogin = async (credentials) => {
    try {
      const loggedUser = await loginService.login(credentials);
      window.localStorage.setItem(
        "loggedBlogAppUser",
        JSON.stringify(loggedUser)
      );
      blogService.setToken(loggedUser.token);
      setUser(loggedUser);
      showNotification(`Welcome ${loggedUser.name}`, "success");
    } catch (error) {
      showNotification("Wrong username or password", "error");
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    blogService.setToken(null);
    setUser(null);
    showNotification("Logged out", "success");
  };

  const createBlog = async (blogObject) => {
    try {
      const created = await blogService.create(blogObject);
      setBlogs(blogs.concat(created));
      showNotification(
        `A new blog "${created.title}" by ${created.author} added`,
        "success"
      );
    } catch (error) {
      showNotification("Error creating blog", "error");
    }
  };

  if (user === null) {
    return (
      <div>
        <Notification message={notification.message} type={notification.type} />
        <LoginForm onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification.message} type={notification.type} />
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <BlogForm createBlog={createBlog} />

      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
}

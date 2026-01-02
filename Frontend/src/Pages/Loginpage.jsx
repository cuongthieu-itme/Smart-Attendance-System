import { useState, useContext } from "react";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";
import { usercontext } from "../context/user-context";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(usercontext);

  const [user, setUserState] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;

    setUserState({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/login",
        user
      );

      if (response.data.success) {
        setUser({ name: response.data.username, email: user.email }); // Set username in context
        localStorage.setItem("token", response.data.token);
        message.success("Đăng nhập thành công");
        // Clear the form after successful login
        setUserState({
          email: "",
          password: "",
        });
        // Navigate to another page upon successful login
        navigate("/");
      } else {
        message.error(
          response.data.message ||
          "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin."
        );
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      message.error("Đăng nhập thất bại. Vui lòng thử lại sau.");
    }
  };

  return (
    <section>
      <main>
        <div className="section-login">
          <div className="container grid grid-two-cols">
            <div className="login-image log-img">
              <img
                src="/images/login.png"
                width="400"
                height="500"
                alt="Login"
              />
            </div>
            <div className="login-form">
              <h1 className="main-heading mb-3 text-7xl text-white">Đăng nhập</h1>
              <br />
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleInput}
                    placeholder="Email"
                  />
                </div>
                <div>
                  <label htmlFor="password">Mật khẩu</label>
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleInput}
                    placeholder="Mật khẩu"
                  />
                </div>
                <br />
                <button type="submit" className="btn btn-submit">
                  Đăng nhập ngay
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default LoginPage;

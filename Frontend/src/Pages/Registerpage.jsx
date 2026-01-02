import { useState } from "react";
import axios from "axios";
import "../styles/Registerpage.css";
import { message } from "antd";

const Registerpage = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/register",
        user
      );
      if (response.data.success) {
        message.success("Đăng ký thành công");
        setUser({
          username: "",
          email: "",
          password: "",
        });
      } else {
        message.error("Đăng ký thất bại. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Error during registration:", error.message);
      message.error("Đăng ký thất bại. Vui lòng thử lại sau.");
    }
  };

  return (
    <section>
      <main>
        <div className="section-registration">
          <div className="container grid grid-two-cols">
            <div className="registration-image reg-img">
              <img
                src="/images/register.png"
                width="400"
                height="500"
                alt="Registration"
              />
            </div>
            <div className="registration-form">
              <h1 className="main-heading mb-3 text-7xl text-white">
                Đăng ký tài khoản
              </h1>
              <br />
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="username">Tên người dùng</label>
                  <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleInput}
                    placeholder="Tên người dùng"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleInput}
                    placeholder="Email"
                    required
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
                    required
                  />
                </div>
                <br />
                <button type="submit" className="btn btn-submit">
                  Đăng ký ngay
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Registerpage;

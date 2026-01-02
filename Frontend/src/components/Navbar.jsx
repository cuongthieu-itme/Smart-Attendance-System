import { NavLink, Link } from "react-router-dom";
import "../styles/Navbar.css";
import { useContext } from "react";
import { usercontext } from "../context/user-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export const Navbar = () => {
  const { user, setUser } = useContext(usercontext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser({ name: "", email: "" });
  };

  return (
    <>
      <header>
        <div className="navbar">
          <div className="container nav">
            <nav>
              <ul>
                <li>
                  <NavLink to="/" activeClassName="active" exact>
                    Trang chủ
                  </NavLink>
                </li>

                {user.name && (
                  <>
                    <li>
                      <NavLink
                        to="/yourclassroom"
                        activeClassName="active"
                        exact
                      >
                        Lớp học của bạn
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/createclassroom"
                        activeClassName="active"
                        exact
                      >
                        Tạo lớp học
                      </NavLink>
                    </li>
                  </>
                )}

                {!user.name ? (
                  <>
                    <li>
                      <NavLink to="/login" activeClassName="active" exact>
                        Đăng nhập
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/register" activeClassName="active" exact>
                        Đăng ký
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link to="/" onClick={handleLogout}>
                      Đăng xuất
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
            <div className="text-white">
              {user.name ? (
                <Link to="/" className="username">
                  <div>
                    <FontAwesomeIcon icon={faUser} style={{ color: "white" }} />
                    &nbsp;&nbsp;
                    {user.name}
                  </div>
                </Link>
              ) : (
                <Link to="/">Smart Attendance System</Link>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

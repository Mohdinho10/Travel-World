import { Container, Row, Button } from "reactstrap";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import "./Header.css";
import { useEffect, useRef } from "react";
import { useLogout } from "../hooks/useLogout";
import { useUser } from "../context/UserContext";
import ClipLoader from "react-spinners/ClipLoader";

// const navLinks = [
//   {
//     path: "/",
//     display: "Home",
//   },
//   {
//     path: "/about",
//     display: "About",
//   },
//   {
//     path: "/tours",
//     display: "Tours",
//   },
// ];

function Header() {
  const { logout, isLogout } = useLogout();
  const { user } = useUser();
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const stickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    stickyHeader();

    return window.removeEventListener("scroll", stickyHeader);
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            <Link to="/" className="logo">
              <img src={logo} alt="logo" />
            </Link>

            {/* Menu */}
            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              {/* <ul className="menu d-flex align-items-center gap-5">
                {navLinks.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "active__link" : " "
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul> */}
            </div>
            <div className="nav__right d-flex align-items-center gap-4">
              <div className="nav__btn d-flex align-items-center gap-4">
                {user ? (
                  <>
                    <h5 className="mb-0">{user.username}</h5>
                    <Button className="btn btn__dark" onClick={logout}>
                      {isLogout ? (
                        <ClipLoader color="#ffffff" size={20} />
                      ) : (
                        "Logout"
                      )}
                    </Button>
                  </>
                ) : (
                  <>
                    {/* <Button className="btn secondary__btn">
                      <Link to="/login">Login</Link>
                    </Button> */}
                    <Button className="btn primary__btn">
                      <Link to="/register">Register</Link>
                    </Button>
                  </>
                )}
              </div>

              <span className="mobile__menu" onClick={toggleMenu}>
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
}

export default Header;

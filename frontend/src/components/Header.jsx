import { Container, Row, Button } from "reactstrap";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import "./Header.css";
import { useLogout } from "../hooks/useLogout";
import { useUser } from "../context/UserContext";
import ClipLoader from "react-spinners/ClipLoader";

function Header() {
  const { logout, isLogout } = useLogout();
  const { user } = useUser();

  return (
    <header className="header">
      <Container>
        <Row>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            <Link to="/" className="logo">
              <img src={logo} alt="logo" />
            </Link>

            {/* Menu */}
            <div className="navigation"></div>
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
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
}

export default Header;

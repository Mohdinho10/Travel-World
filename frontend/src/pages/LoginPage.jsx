import "../styles/Login.css";
import loginImg from "../assets/images/login.png";
import userIcon from "../assets/images/user.png";
import { Button, Col, Container, Form, FormGroup, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import ClipLoader from "react-spinners/ClipLoader";

function LoginPage() {
  const { login, isLogin } = useLogin();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    login(credentials);
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={loginImg} alt="" />
              </div>

              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Login</h2>
                <Form onSubmit={submitHandler}>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Email"
                      id="email"
                      onChange={inputHandler}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Password"
                      id="password"
                      onChange={inputHandler}
                      required
                    />
                  </FormGroup>
                  <Button className=" auth__btn" type="submit">
                    {!isLogin ? (
                      "Login"
                    ) : (
                      <ClipLoader color="#ffffff" size={20} />
                    )}
                  </Button>
                </Form>
                <p>
                  Don`t have an account? <Link to="/register">Register</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default LoginPage;

import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Container, Form, FormGroup, Row } from "reactstrap";
import registerImg from "../assets/images/register.png";
import userIcon from "../assets/images/user.png";
import { useRegister } from "../hooks/useRegister";
import ClipLoader from "react-spinners/ClipLoader";

function RegisterPage() {
  const { register, isRegister } = useRegister();
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    register(credentials);
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={registerImg} alt="" />
              </div>

              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Register</h2>
                <Form onSubmit={submitHandler}>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="username"
                      id="username"
                      onChange={inputHandler}
                      required
                    />
                  </FormGroup>
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
                    {!isRegister ? (
                      "Create Account"
                    ) : (
                      <ClipLoader color="#ffffff" size={20} />
                    )}
                  </Button>
                </Form>
                <p>
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default RegisterPage;

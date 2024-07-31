import { Col, Container, ListGroup, ListGroupItem, Row } from "reactstrap";
import logo from "../assets/images/logo.png";
import "./Footer.css";
import { Link } from "react-router-dom";

const quickLinks = [
  {
    path: "/",
    display: "home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/tours",
    display: "Tours",
  },
];

const quickLinks2 = [
  {
    path: "/gallery",
    display: "Gallery",
  },
  {
    path: "/login",
    display: "Login",
  },
  {
    path: "/register",
    display: "Register",
  },
];

function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="3">
            <div className="logo">
              <img src={logo} alt="" />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
                maiores iusto officia temporibus nihil pariatur!
              </p>
              <div className="social__links d-flex align-items-center gap-4">
                <span>
                  <Link to="#">
                    <i className="ri-youtube-line"></i>
                  </Link>
                </span>

                <span>
                  <Link to="#">
                    <i className="ri-instagram-line"></i>
                  </Link>
                </span>

                <span>
                  <Link to="#">
                    <i className="ri-tiktok-line"></i>
                  </Link>
                </span>

                <span>
                  <Link to="#">
                    <i className="ri-facebook-circle-line"></i>
                  </Link>
                </span>
              </div>
            </div>
          </Col>
          <Col lg="3">
            <h5 className="footer__link-title">Discover</h5>

            <ListGroup className="footer__quick-links">
              {quickLinks.map((item, index) => (
                <ListGroupItem key={index} className="ps-0 border-0">
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col lg="3">
            <h5 className="footer__link-title">Quick Links</h5>

            <ListGroup className="footer__quick-links">
              {quickLinks2.map((item, index) => (
                <ListGroupItem key={index} className="ps-0 border-0">
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col lg="3">
            <h5 className="footer__link-title">Contacts</h5>

            <ListGroup className="footer__quick-links">
              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-map-pin-line"></i>
                  </span>
                  Address
                </h6>
                <p className="mb-0">Dar Es Salaam, Kariakoo</p>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-mail-line"></i>
                  </span>
                  Email:
                </h6>
                <p className="mb-0">mohdinho@gmail.com</p>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-phone-line"></i>
                  </span>
                  Phone:
                </h6>
                <p className="mb-0">+255 693 275 058</p>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;

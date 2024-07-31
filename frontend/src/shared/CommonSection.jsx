/* eslint-disable react/prop-types */

import { Col, Container } from "reactstrap";
import "./CommonSection.css";

function CommonSection({ title }) {
  return (
    <section className="common__section">
      <Container>
        <Col lg="12">
          <h1>{title}</h1>
        </Col>
      </Container>
    </section>
  );
}

export default CommonSection;

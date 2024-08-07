import { Button, Col, Container, Form, FormGroup, Row } from "reactstrap";

import "../styles/AddTour.css";
import { useAddTour } from "../hooks/useAddTour";
import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";

function AddTourPage() {
  const { addTour, isAddTour } = useAddTour();
  const [formData, setFormData] = useState({
    title: "",
    city: "",
    address: "",
    distance: "",
    desc: "",
    maxGroupSize: "",
    price: "",
    photo: null,
  });

  const inputHandler = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      [name]: name === "photo" ? files[0] : value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formInputs = new FormData(e.target);
    console.log(formInputs);
    const inputs = Object.fromEntries(formInputs);
    console.log(inputs);

    addTour(formInputs);
  };

  return (
    <Container>
      <Row>
        <Col lg="8" className="m-auto">
          <div className="tour__container d-flex justify-content-between">
            <div className="tour__form">
              <h2>Add Tour</h2>
              <Form onSubmit={submitHandler}>
                <FormGroup>
                  <input
                    type="text"
                    placeholder="Title"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={inputHandler}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <input
                    type="text"
                    placeholder="City"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={inputHandler}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <input
                    type="text"
                    placeholder="Address"
                    id="address"
                    name="address"
                    onChange={inputHandler}
                    value={formData.address}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <input
                    type="number"
                    placeholder="Distance"
                    id="distance"
                    name="distance"
                    value={formData.distance}
                    onChange={inputHandler}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <input
                    type="text"
                    placeholder="Description"
                    id="desc"
                    name="desc"
                    value={formData.desc}
                    onChange={inputHandler}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <input
                    type="number"
                    placeholder="Group Size"
                    id="maxGroupSize"
                    name="maxGroupSize"
                    value={formData.maxGroupSize}
                    onChange={inputHandler}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <input
                    type="number"
                    placeholder="Price"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={inputHandler}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <input
                    type="file"
                    name="photo"
                    onChange={inputHandler}
                    accept="image/*"
                  />
                </FormGroup>

                {/* {formData.profileImage && (
                  <img
                    src={URL.createObjectURL(formData.profileImage)}
                    alt="profile preview"
                    style={{ maxWidth: "80px", borderRadius: "50px" }}
                  />
                )} */}

                <Button className=" auth__btn" type="submit">
                  {!isAddTour ? (
                    "Add Tour"
                  ) : (
                    <ClipLoader color="#ffffff" size={20} />
                  )}
                </Button>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AddTourPage;

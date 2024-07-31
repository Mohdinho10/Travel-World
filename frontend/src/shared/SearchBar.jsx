import { Col, Form, FormGroup } from "reactstrap";
import "./SearchBar.css";
import { useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const locationRef = useRef("");
  const distanceRef = useRef("");
  const maxGroupSizeRef = useRef("");

  const navigate = useNavigate();

  const searchHandler = async () => {
    const location = locationRef.current.value;
    const distance = distanceRef.current.value;
    const maxGroupSize = maxGroupSizeRef.current.value;

    if (location === "" || distance === "" || maxGroupSize === "") {
      return alert("All fields are required!");
    }

    const { data } = await axios.get(
      `${BASE_URL}/tours/search?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`
    );
    console.log(data);
    navigate(
      `/tours/search?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`,
      { state: data }
    );
  };

  return (
    <Col lg="12">
      <div className="search__bar">
        <Form className="d-flex align-items-center gap-4">
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i className="ri-map-pin-line"></i>
            </span>
            <div>
              <h6>Location</h6>
              <input
                type="text"
                ref={locationRef}
                placeholder="Where are you going?"
              />
            </div>
          </FormGroup>

          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i className="ri-map-pin-time-line"></i>
            </span>
            <div>
              <h6>Distance</h6>
              <input
                type="number"
                ref={distanceRef}
                placeholder="Distance k/m"
              />
            </div>
          </FormGroup>

          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i className="ri-group-line"></i>
            </span>
            <div>
              <h6>Max people</h6>
              <input type="number" ref={maxGroupSizeRef} placeholder="0" />
            </div>
          </FormGroup>
          <span className="search__icon" type="submit" onClick={searchHandler}>
            <i className="ri-search-line"></i>
          </span>
        </Form>
      </div>
    </Col>
  );
}

export default SearchBar;

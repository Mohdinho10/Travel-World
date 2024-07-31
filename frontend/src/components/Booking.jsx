/* eslint-disable react/prop-types */
import { Button, Form, FormGroup, ListGroup, ListGroupItem } from "reactstrap";
import "./Booking.css";
import { useState } from "react";
import { useUser } from "../context/UserContext";
import { toast } from "react-toastify";
import { useBookTour } from "../hooks/useBookTour";
import ClipLoader from "react-spinners/ClipLoader";

function Booking({ tour, avgRating }) {
  const { user } = useUser();
  const { book, isBook } = useBookTour();
  const { price, reviews, title } = tour || {};

  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    tourName: title,
    phone: "",
    guestSize: 1,
    bookAt: "",
  });

  const inputHandler = (e) => {
    setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const serviceFee = 10;
  const totalAmount =
    Number(price) * Number(booking.guestSize) + Number(serviceFee);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please Login!");
      return;
    }

    // console.log(credentials);
    book(booking);
  };

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          ${price} <span>/per person</span>
        </h3>
        <span className="tour__rating d-flex align-items-center">
          <i
            className="ri-star-fill"
            // style={{ color: "var(--secondary-color" }}
          ></i>{" "}
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form" onSubmit={submitHandler}>
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              required
              onChange={inputHandler}
            />
          </FormGroup>

          <FormGroup>
            <input
              type="number"
              placeholder="Phone"
              id="phone"
              required
              onChange={inputHandler}
            />
          </FormGroup>

          <FormGroup>
            <input
              type="date"
              placeholder=""
              id="bookAt"
              required
              onChange={inputHandler}
            />
            <input
              type="number"
              placeholder="Guest"
              id="guestSize"
              required
              onChange={inputHandler}
            />
          </FormGroup>
        </Form>
      </div>
      {/* Booking bottom */}
      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              ${price}
              <i className="ri-close-line"></i> 1 person
            </h5>
            <span> ${price} </span>
          </ListGroupItem>

          <ListGroupItem className="border-0 px-0">
            <h5>Service charge</h5>
            <span> ${serviceFee} </span>
          </ListGroupItem>

          <ListGroupItem className="border-0 px-0">
            <h5>Total</h5>
            <span> ${totalAmount} </span>
          </ListGroupItem>
        </ListGroup>
        <Button className="btn primary__btn w-100 mt-4" onClick={submitHandler}>
          {isBook ? <ClipLoader color="#ffffff" size={20} /> : "Book Now"}
        </Button>
      </div>
    </div>
  );
}

export default Booking;

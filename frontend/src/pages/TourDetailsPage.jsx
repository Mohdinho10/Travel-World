import { useParams } from "react-router-dom";
import { Col, Container, Form, ListGroup, Row } from "reactstrap";
// import tourData from "../assets/data/tours";
import "../styles/TourDetails.css";
import { calculateAvgRating } from "../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Booking from "../components/Booking";
import NewsLetter from "../shared/NewsLetter";
import { useGetTour } from "../hooks/useGetTour";
import Loader from "../components/Loader";
import { useUser } from "../context/UserContext";
import { useReview } from "../hooks/useReview";

function TourDetailsPage() {
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);

  const { user } = useUser();
  const { createReview } = useReview();

  const { isPending, tour } = useGetTour(id);

  const {
    photo,
    title,
    desc,
    price,
    reviews,
    city,
    address,
    distance,
    maxGroupSize,
  } = tour || {};

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  // Format date
  const options = { day: "numeric", month: "long", year: "numeric" };

  const submitHandler = (e) => {
    e.preventDefault();

    const reviewText = reviewMsgRef.current.value;

    // toast.success(`${reviewText}, ${tourRating}`);
    if (!user) {
      toast.error("Please Login!");
    }

    const reviewObj = {
      username: user.username,
      reviewText,
      rating: tourRating,
    };

    createReview({ reviewId: id, reviewData: reviewObj });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);

  return (
    <>
      <section>
        <Container>
          {isPending && <Loader />}
          {!isPending && (
            <Row>
              <Col lg="8">
                <div className="tour__content">
                  <img src={photo} alt="" />

                  <div className="tour__info">
                    <h2>{title} </h2>
                    <div className="d-flex align-items-center gap-5">
                      <span className="tour__rating d-flex align-items-center gap-1">
                        <i
                          className="ri-star-fill"
                          style={{ color: "var(--secondary-color" }}
                        ></i>{" "}
                        {avgRating === 0 ? null : avgRating}
                        {totalRating === 0 ? (
                          "Not rated"
                        ) : (
                          <span>({reviews?.length})</span>
                        )}
                      </span>
                      <span>
                        <i className="ri-map-pin-user-fill"></i> {address}
                      </span>
                    </div>
                    <div className="tour__extra-details">
                      <span>
                        <i className="ri-map-pin-2-line"></i>
                        {city}
                      </span>
                      <span>
                        <i className="ri-money-dollar-circle-line"></i> ${price}{" "}
                        /per person
                      </span>
                      <span>
                        <i className="ri-map-pin-time-line"></i> {distance}
                        k/m
                      </span>
                      <span>
                        <i className="ri-group-line"></i> {maxGroupSize} people
                      </span>
                    </div>
                    <h5>Description</h5>
                    <p>{desc}</p>
                  </div>
                  {/* Tour review section */}
                  <div className="tour__reviews mt-4">
                    <h4>Reviews ({reviews?.length} reviews)</h4>

                    <Form onSubmit={submitHandler}>
                      <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                        <span onClick={() => setTourRating(1)}>
                          1 <i className="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(2)}>
                          2 <i className="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(3)}>
                          3 <i className="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(4)}>
                          4 <i className="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(5)}>
                          5 <i className="ri-star-s-fill"></i>
                        </span>
                      </div>

                      <div className="review__input">
                        <input
                          type="text"
                          ref={reviewMsgRef}
                          placeholder="share your thoughts"
                          required
                        />
                        <button
                          className="btn primary__btn text__white"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </Form>
                    <ListGroup className="user__reviews">
                      {reviews?.map((review, index) => (
                        <div className="review__item" key={index}>
                          <img src={avatar} alt="" />
                          <div className="w-100">
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <h5>{review.username}</h5>
                                <p>
                                  {" "}
                                  {new Date("01-18-2023").toLocaleDateString(
                                    "en-US",
                                    options
                                  )}{" "}
                                </p>
                              </div>
                              <span className="d-flex-align-items">
                                {review.rating}{" "}
                                <i className="ri-star-s-fill"></i>
                              </span>
                            </div>
                            <h6>{review.reviewText}</h6>
                          </div>
                        </div>
                      ))}
                    </ListGroup>
                  </div>
                </div>
              </Col>

              <Col lg="4">
                <Booking tour={tour} avgRating={avgRating} />
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <NewsLetter />
    </>
  );
}

export default TourDetailsPage;

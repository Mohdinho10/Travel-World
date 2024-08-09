import { Col, Container, Row } from "reactstrap";
import CommonSection from "../shared/CommonSection";
import SearchBar from "../shared/SearchBar";
import TourCard from "../shared/TourCard";
import NewsLetter from "../shared/NewsLetter";
// import tourData from "../assets/data/tours";
import "../styles/Tour.css";
import { useEffect, useState } from "react";
import { useGetTours } from "../hooks/useGetTours";
import { useGetTourCount } from "../hooks/useGetTourCount";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

function ToursPage() {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const { isPending, tours } = useGetTours(page);
  const { isPending: isLoadingTourCount, tourCount } = useGetTourCount();
  const { user } = useUser();

  // console.log(tourCount.length);

  useEffect(() => {
    const pages = Math.ceil(tourCount / 8);
    setPageCount(pages);
    window.scrollTo(0, 0);
  }, [page, tourCount]);

  return (
    <>
      <CommonSection title={"All Tours"} />
      <section>
        <Container
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Row>
            <SearchBar />
          </Row>
          {user?.role === "admin" && (
            <Row>
              {" "}
              <Link to="/add-tour" className="add__tour">
                Add Tour
              </Link>
            </Row>
          )}
        </Container>
      </section>

      <section className="pt-0">
        <Container>
          {isPending || (isLoadingTourCount && <Loader />)}
          {!isPending && (
            <Row>
              {tours?.map((tour) => (
                <Col lg="3" md="6" sm="6" className="mb-4" key={tour._id}>
                  <TourCard tour={tour} />
                </Col>
              ))}

              <Col lg="12">
                <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                  {[...Array(pageCount).keys()]?.map((number) => (
                    <span
                      key={number}
                      onClick={() => setPage(number)}
                      className={page === number ? "active__page" : ""}
                    >
                      {number + 1}
                    </span>
                  ))}
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <NewsLetter />
    </>
  );
}

export default ToursPage;

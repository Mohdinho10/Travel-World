import { Col } from "reactstrap";
// import tourData from "../assets/data/tours";
import TourCard from "../shared/TourCard";
import { useGetTours } from "../hooks/useGetTours";
import Loader from "./Loader";
function FeaturedTours() {
  const { isPending, tours } = useGetTours();

  return (
    <>
      {isPending && <Loader />}
      {tours?.map((tour) => (
        <Col lg="3" md="6" sm="6" className="mb-4" key={tour?.id}>
          <TourCard tour={tour} />
        </Col>
      ))}
    </>
  );
}

export default FeaturedTours;

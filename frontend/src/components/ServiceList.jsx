import { Col } from "reactstrap";
import weatherImg from "../assets/images/weather.png";
import guideImg from "../assets/images/guide.png";
import customizationImg from "../assets/images/customization.png";
import ServiceCard from "./ServiceCard";

const servicesData = [
  {
    imgUrl: weatherImg,
    title: "Calculate Weather",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet, commodi.Deleniti sunt aliquid rem nostrum.",
  },
  {
    imgUrl: guideImg,
    title: "Best Tour Guide",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet, commodi.Deleniti sunt aliquid rem nostrum.",
  },
  {
    imgUrl: customizationImg,
    title: "Customization",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet, commodi.Deleniti sunt aliquid rem nostrum.",
  },
];

function ServiceList() {
  return (
    <>
      {servicesData.map((item, index) => (
        <Col lg="3" md="6" sm="12" key={index}>
          <ServiceCard item={item} />
        </Col>
      ))}
    </>
  );
}

export default ServiceList;

import Slider from "react-slick";
import ava1 from "../assets/images/ava-1.jpg";
import ava2 from "../assets/images/ava-2.jpg";
import ava3 from "../assets/images/ava-3.jpg";

function Testimonials() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 3, // Default for large screens
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      <div className="testimonial py-4 px-3">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
          aspernatur natus aliquid voluptatem eveniet rem dicta eligendi
          doloribus dolor! Nemo excepturi voluptatem doloribus cum distinctio
          dolore neque nobis consectetur
        </p>
        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava1} alt="" className="w-25 h-25 rounded-2" />
          <div>
            <h5 className="mb-0 mt-3">John Doe</h5>
            <p>customer</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
          aspernatur natus aliquid voluptatem eveniet rem dicta eligendi
          doloribus dolor! Nemo excepturi voluptatem doloribus cum distinctio
          dolore neque nobis consectetur
        </p>
        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava2} alt="" className="w-25 h-25 rounded-2" />
          <div>
            <h5 className="mb-0 mt-3">Lia Franklin</h5>
            <p>customer</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
          aspernatur natus aliquid voluptatem eveniet rem dicta eligendi
          doloribus dolor! Nemo excepturi voluptatem doloribus cum distinctio
          dolore neque nobis consectetur
        </p>
        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava3} alt="" className="w-25 h-25 rounded-2" />
          <div>
            <h5 className="mb-0 mt-3">Facundo Mae</h5>
            <p>customer</p>
          </div>
        </div>
      </div>
    </Slider>
  );
}

export default Testimonials;

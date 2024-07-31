import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { galleryImages } from "../utils/galleryImages";

function MasonryImagesGallery() {
  return (
    <ResponsiveMasonry>
      <Masonry gutter="1rem">
        {galleryImages.map((item, index) => (
          <img
            className="masonry__images"
            src={item}
            alt=""
            key={index}
            style={{ width: "100%", display: "block", borderRadius: "10px" }}
          />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
}

export default MasonryImagesGallery;

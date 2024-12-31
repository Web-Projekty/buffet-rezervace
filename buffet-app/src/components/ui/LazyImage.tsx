import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

type LazyImageProps = {
  image: string;
  alt: string;
};

const LazyImage = ({ image, alt }: LazyImageProps) => {
  return (
    <LazyLoadImage
      alt={alt}
      effect="blur"
      wrapperProps={{
        style: { transitionDelay: "0.5s" },
      }}
      className={`h-[12rem] w-[16rem] rounded-lg object-cover`}
      src={image}
    />
  );
};

export default LazyImage;

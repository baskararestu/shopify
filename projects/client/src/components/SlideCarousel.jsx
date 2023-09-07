import { Link } from "react-router-dom";

const SlideCarousel = ({
  src,
  title = "Discover Your Style",
  description = "Elevate your fashion game and define your unique style with our curated collections and expert guidance.",
}) => {
  return (
    <div className="hero min-h-screen">
      <img
        src={src}
        className="md:h-[710px] h-[450px] object-cover w-full rounded-xl"
        alt="Slide 1"
      />
      <div className="hero-overlay bg-opacity-30 rounded-xl md:h-[710px] h-[450px]"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold text-white/90">{title}</h1>
          <p className="mb-5 text-white/80">{description}</p>
          <Link to="/products" className="btn btn-primary uppercase">
            Shop now
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SlideCarousel;

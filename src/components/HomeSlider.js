import $ from "jquery";
//import slick from "slick-carousel";
import { useEffect } from "react";
import banner1 from "../images/slideshow-banners/home12-category-banner1.jpg";
import banner2 from "../images/slideshow-banners/home12-category-banner2.jpg";

const HomeSlider = () => {
  useEffect(()=> {
   setSlider();
  }, []);

  const setSlider = () => {
    $(".home-slideshow").slick({
      dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      arrows: true,
      autoplay: true,
      autoplaySpeed: 4000,
      lazyLoad: "ondemand",
    });
  };

  return (
    <div className="slideshow slideshow-wrapper pb-section">
      <div className="home-slideshow">
        <div className="slide slideshow--medium">
          <div className="">
            <img
              className=""
              data-src={banner1}
              src={banner1}
              alt="Outfit of Today"
              title="Outfit of Today"
            />
            <div className="slideshow__text-wrap slideshow__overlay classNameic middle">
              <div className="slideshow__text-content classNameic left">
                <div className="container">
                  <div className="wrap-caption left">
                    <h2 className="h1 mega-title slideshow__title">
                      Outfit of Today
                    </h2>
                    <span className="mega-subtitle slideshow__subtitle">
                      Lookbook ss 2018
                    </span>
                    <span className="btn">View Catelog</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="slide slideshow--medium">
          <div className="">
            <img
              className=""
              data-src={banner2}
              src={banner2}
              alt="Accessories"
              title="Accessories"
            />
            <div className="slideshow__text-wrap slideshow__overlay classNameic middle">
              <div className="slideshow__text-content classNameic left">
                <div className="container">
                  <div className="wrap-caption left">
                    <h2 className="h1 mega-title slideshow__title">
                      Accessories
                    </h2>
                    <span className="mega-subtitle slideshow__subtitle">
                      New Collection A-W ss18
                    </span>
                    <span className="btn">Shop now</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSlider;

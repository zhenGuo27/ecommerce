import $ from "jquery";
import { useEffect } from "react";
import banner1 from "../images/homeSlider/html.jpg"
import banner2 from "../images/homeSlider/coding.jpg"

const sliderData = [
  {
    title: "網頁前端",
    subtitle: "React JS | HTML5 | JS | CSS3",
    btnText: "More",
    img: banner1,
  },
  {
    title: "網頁後端",
    subtitle: "ASP.NET MVC5 | C#",
    btnText: "More",
    img: banner2,
  },
];

const HomeSlider = () => {
  useEffect(() => {
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
        {sliderData.map((item) => (
          <div className="slide slideshow--medium" key={item.title}>
            <div>
              <img
                data-src={item.img}
                src={item.img}
                alt={item.title}
                title={item.title}
              />
              <div className="slideshow__text-wrap slideshow__overlay classNameic middle">
                <div className="slideshow__text-content classNameic left">
                  <div className="container">
                    <div className="wrap-caption left">
                      <h2 className="h1 mega-title slideshow__title">
                        {item.title}
                      </h2>
                      <span className="mega-subtitle slideshow__subtitle">
                        {item.subtitle}
                      </span>
                      {/*btn to about page */}
                      <span className="btn">{item.btnText}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}        
      </div>
    </div>
  );
};

export default HomeSlider;

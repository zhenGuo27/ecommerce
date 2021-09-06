import $ from "jquery";
import slick from "slick-carousel";
import { useEffect } from "react";
import banner1 from "../images/homeSlider/html.jpg"
import banner2 from "../images/homeSlider/coding.jpg"
import { useHistory } from "react-router-dom";
import { hostPath } from "../actions/sharedConst";

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
  const history = useHistory();

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

  const toAbout = () => {
    history.replace(hostPath +"/About");
  };

  return (
    <div className="slideshow slideshow-wrapper pb-section">
      <div className="home-slideshow">
        {sliderData.map((item) => (
          <div className="slide slideshow--medium" key={item.title}>
            <div>
              <img
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
                      <span className="btn" onClick={toAbout}>{item.btnText}</span>
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

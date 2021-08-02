import $ from "jquery";
import { useEffect, useState, Fragment } from "react";
import slick from "slick-carousel";
import QuickViewPopup from "./QuickViewPopup";
import { getProducts } from "./product-action";

let popupInit = true;

const ProductSlider = (props) => {
  const [productData, setProductData] = useState([]);
  const [popupProductId, setPopupProductId] = useState("");

  useEffect(() => {
    getProducts(1, "").then((items) => {
      if (items && items.products.length !== 0) {
        setProductData(items.products);
      } else {
        setProductData([]);
      }
    });
  }, []);

  useEffect(() => {
    if (productData.length !== 0) {
      setSlider();
    }
  }, [productData]);

  useEffect(() => {
    if (!popupInit) {
      $("#content_quickview").modal("show");
    } else {
      popupInit = false;
    }
  }, [popupProductId]);

  const closePopup = () => {
    setPopupProductId("");
    $("#content_quickview").modal("hide");
  };

  const showQuickPopup = (id) => {
    setPopupProductId(id);
  };

  const inputOnChangeHandler = () => {};

  const setSlider = () => {
    $("." + props.slider).slick({
      dots: false,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
  };

  const HomeSliderImgById = (props) => {
    const imgs = productData.find((item) => item.id == props.id);
    const classes = props.hover ? "hover" : "primary";

    let imgSrc = "";
    if (props.hover) {
      imgSrc = imgs.largeImgs.find(
        (item) => item.homeSlider && item.homeSliderHover
      ).src;
    } else {
      imgSrc = imgs.largeImgs.find(
        (item) => item.homeSlider && !item.homeSliderHover
      ).src;
    }

    return (
      <img
        className={classes}
        data-src={imgSrc}
        src={imgSrc}
        alt="image"
        title="product"
      />
    );
  };

  return (
    <Fragment>
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
              <div className="section-header text-center">
                <h2 className="h2">{props.title}</h2>
                <p>{props.subtitle}</p>
              </div>
              <div className={`${props.slider} productSlider grid-products grid-products-hover-gry`}>
                {productData.map((item) => {
                  return (
                    <div className="col-12 item" key={item.id}>
                      {/* start product image */}
                      <div className="product-image">
                        {/* start product image */}
                        <a
                          href="product-layout-1.html"
                          className="grid-view-item__link"
                        >
                          <HomeSliderImgById id={item.id} hover={false} />
                          <HomeSliderImgById id={item.id} hover={true} />
                        </a>
                        {/* end product image */}
                        {/* Start product button */}
                        <form
                          className="variants add"
                          action="#"
                          onClick={inputOnChangeHandler}
                          method="post"
                        >
                          <button
                            className="btn btn-addto-cart"
                            type="button"
                            tabIndex="0"
                          >
                            Add To Cart
                          </button>
                        </form>
                        <div className="button-set">
                          <a
                            title="Quick View"
                            className="quick-view-popup quick-view"
                            onClick={showQuickPopup.bind(null, item.id)}
                          >
                            <i className="icon anm anm-search-plus-r"></i>
                          </a>
                        </div>
                        {/* end product button */}
                      </div>
                      {/* end product image */}
                      {/*start product details */}
                      <div className="product-details text-center">
                        {/* product name */}
                        <div className="product-name">
                          <a>{item.title}</a>
                        </div>
                        {/* End product name */}
                        {/* product price */}
                        <div className="product-price">
                          <span className="price">${item.sku[0].price}</span>
                        </div>
                        {/* End product price */}
                      </div>
                      {/* End product details */}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      {popupProductId && (
        <QuickViewPopup id={popupProductId} onClose={closePopup} />
      )}
    </Fragment>
  );
};

export default ProductSlider;

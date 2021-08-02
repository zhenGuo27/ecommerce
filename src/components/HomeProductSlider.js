import $ from "jquery";
import { useEffect, useState, Fragment } from "react";
import slick from "slick-carousel";
import QuickViewPopup from "./QuickViewPopup";
import { getProducts } from "./product-action";

import product4 from "../images/product-images/product-image4.jpg";
import product4_1 from "../images/product-images/product-image4-1.jpg";
import product5 from "../images/product-images/product-image5.jpg";
import product5_1 from "../images/product-images/product-image5-1.jpg";
import product7 from "../images/product-images/product-image7.jpg";
import product7_1 from "../images/product-images/product-image7-1.jpg";
import product24 from "../images/product-images/product-image24.jpg";
import product24_1 from "../images/product-images/product-image24-1.jpg";
import product33 from "../images/product-images/product-image33.jpg";
import product33_1 from "../images/product-images/product-image33-1.jpg";

// const products = [
//   {
//     id: "clothing-1",
//     title: "Clothing-2 product",
//     desc: "Product desc",
//     tagId: 1,
//     startDate: "2021-07-14",
//     rate: 1,
//   },
//   {
//     id: "clothing-2",
//     title: "Clothing-2 product",
//     desc: "Product desc",
//     tagId: 2,
//     startDate: "2021-07-12",
//     rate: 2,
//   },
//   {
//     id: "clothing-3",
//     title: "Clothing-3 product",
//     desc: "Product desc",
//     tagId: 1,
//     startDate: "2021-07-14",
//     rate: 3,
//   },
//   {
//     id: "clothing-4",
//     title: "Clothing-4 product",
//     desc: "Product desc",
//     tagId: 2,
//     startDate: "2021-07-11",
//     rate: 4,
//   },
//   {
//     id: "clothing-5",
//     title: "Clothing-5 product",
//     desc: "Product desc",
//     tagId: 2,
//     startDate: "2021-07-11",
//     rate: 5,
//   },
// ];

// const productImgs = [
//   {
//     productId: "clothing-1",
//     largeImg: [
//       {
//         src: product7,
//         homeSlider: true,
//         homeSliderHover: false,
//       },
//       {
//         src: product7_1,
//         homeSlider: true,
//         homeSliderHover: true,
//       },
//     ],
//     smallImg: [],
//   },
//   {
//     productId: "clothing-2",
//     largeImg: [
//       {
//         src: product24,
//         homeSlider: true,
//         homeSliderHover: false,
//       },
//       {
//         src: product24_1,
//         homeSlider: true,
//         homeSliderHover: true,
//       },
//     ],
//     smallImg: [],
//   },
//   {
//     productId: "clothing-3",
//     largeImg: [
//       {
//         src: product33,
//         homeSlider: true,
//         homeSliderHover: false,
//       },
//       {
//         src: product33_1,
//         homeSlider: true,
//         homeSliderHover: true,
//       },
//     ],
//     smallImg: [],
//   },
//   {
//     productId: "clothing-4",
//     largeImg: [
//       {
//         src: product4,
//         homeSlider: true,
//         homeSliderHover: false,
//       },
//       {
//         src: product4_1,
//         homeSlider: true,
//         homeSliderHover: true,
//       },
//     ],
//     smallImg: [],
//   },
//   {
//     productId: "clothing-5",
//     largeImg: [
//       {
//         src: product5,
//         homeSlider: true,
//         homeSliderHover: false,
//       },
//       {
//         src: product5_1,
//         homeSlider: true,
//         homeSliderHover: true,
//       },
//     ],
//     smallImg: [],
//   },
// ];

let popupInit = true;

const HomeProductSlider = () => {
  const [productData, setProductData] = useState([]);
  const [popupProductId, setPopupProductId] = useState("");

  useEffect(() => {
    getProducts(1, "").then((items) => {
      if (items && items.products.length !== 0) {
        setProductData(items.products);
        console.log("items", items.products);
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
    $(".productSlider").slick({
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
                <h2 className="h2">Shop these looks</h2>
                <p>Shop from hundreds of collections for a fashionable look.</p>
              </div>
              <div className="productSlider grid-products grid-products-hover-gry">
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

export default HomeProductSlider;

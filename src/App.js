// import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import $ from "jquery";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
//import "./App.css";
import slick from "slick-carousel";

import logo from "./images/logo.svg";
import safepayment from "./images/safepayment.png";
import megamenuBg1 from "./images/megamenu-bg1.jpg";
import megamenuBg2 from "./images/megamenu-bg2.jpg";
import capeDress1 from "./images/product-images/cape-dress-1.jpg";
import capeDress2 from "./images/product-images/cape-dress-2.jpg";
import banner1 from "./images/slideshow-banners/home12-category-banner1.jpg";
import banner2 from "./images/slideshow-banners/home12-category-banner2.jpg";
import bnr1 from "./images/collection/home12-category-bnr1.jpg";
import bnr2 from "./images/collection/home12-category-bnr2.jpg";
import bnr3 from "./images/collection/home12-category-bnr3.jpg";

import product_H1 from "./images/product-images/home7-product1.jpg";
import product_H2 from "./images/product-images/home7-product2.jpg";
import product_H3 from "./images/product-images/home7-product3.jpg";
import product_H4 from "./images/product-images/home7-product4.jpg";
import product_H5 from "./images/product-images/home7-product5.jpg";
import product_H6 from "./images/product-images/home7-product6.jpg";

import product4 from "./images/product-images/product-image4.jpg";
import product4_1 from "./images/product-images/product-image4-1.jpg";
import product5 from "./images/product-images/product-image5.jpg";
import product5_1 from "./images/product-images/product-image5-1.jpg";
import product7 from "./images/product-images/product-image7.jpg";
import product7_1 from "./images/product-images/product-image7-1.jpg";
import product24 from "./images/product-images/product-image24.jpg";
import product24_1 from "./images/product-images/product-image24-1.jpg";
import product33 from "./images/product-images/product-image33.jpg";
import product33_1 from "./images/product-images/product-image33-1.jpg";
import cameliaReversibleBig1 from "./images/product-detail-page/camelia-reversible-big1.jpg";
import newsletter from "./images/newsletter-img.jpg";

function App() {
  useEffect(() => {
    search_bar();
    home_slider();
    product_slider();
    minicart_dropdown();
    mobileMenu();
    footer_dropdown();
    scroll_top();

    $(window).scroll(function () {
      stickyHeader();
    });
  }, []);

  const search_bar=()=> {
		$('.search-trigger').on('click', function () {
			const search = $('.search');
	
			if (search.is('.search--opened')) {
				search.removeClass('search--opened');
			} else {
				search.addClass('search--opened');
				$('.search__input')[0].focus();
			}
		});
	}

  const home_slider = () => {
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

  const product_slider = () => {
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

  const minicart_dropdown = () => {
    $(".site-header__cart").on("click", function (i) {
      i.preventDefault();
      $("#header-cart").slideToggle();
    });
    // Hide Cart on document click
    $("body").on("click", function (event) {
      var $target = $(event.target);
      if (!$target.parents().is(".site-cart") && !$target.is(".site-cart")) {
        $("body").find("#header-cart").slideUp();
      }
    });
  };

  const stickyHeader = () => {
    if ($(window).width() > 1199) {
      if ($(window).scrollTop() > 145) {
        $(".header-wrap").addClass("stickyNav animated fadeInDown");
      } else {
        $(".header-wrap").removeClass("stickyNav fadeInDown");
      }
    }
  };

  const mobileMenu = () => {
    var selectors = {
      body: "body",
      sitenav: "#siteNav",
      navLinks: "#siteNav .lvl1 > a",
      menuToggle: ".js-mobile-nav-toggle",
      mobilenav: ".mobile-nav-wrapper",
      menuLinks: "#MobileNav .anm",
      closemenu: ".closemobileMenu",
    };

    $(selectors.navLinks).each(function () {
      if ($(this).attr("href") == window.location.pathname)
        $(this).addClass("active");
    });

    $(selectors.menuToggle).on("click", function () {
      $(selectors.mobilenav).toggleClass("active");
      $(selectors.body).toggleClass("menuOn");
      $(selectors.menuToggle).toggleClass("mobile-nav--open mobile-nav--close");
    });

    $(selectors.closemenu).on("click", function () {
      $(selectors.mobilenav).toggleClass("active");
      $(selectors.body).toggleClass("menuOn");
      $(selectors.menuToggle).toggleClass("mobile-nav--open mobile-nav--close");
    });

    $("body").on("click", function (event) {
      var $target = $(event.target);
      if (
        !$target.parents().is(selectors.mobilenav) &&
        !$target.parents().is(selectors.menuToggle) &&
        !$target.is(selectors.menuToggle)
      ) {
        $(selectors.mobilenav).removeClass("active");
        $(selectors.body).removeClass("menuOn");
        $(selectors.menuToggle)
          .removeClass("mobile-nav--close")
          .addClass("mobile-nav--open");
      }
    });

    $(selectors.menuLinks).on("click", function (e) {
      e.preventDefault();
      $(this).toggleClass("anm-plus-l anm-minus-l");
      $(this).parent().next().slideToggle();
    });
  };

  const footer_dropdown = () => {
    $(".footer-links .h4").on("click", function () {
      if ($(window).width() < 766) {
        $(this).next().slideToggle();
        $(this).toggleClass("active");
      }
    });
  };

  const scroll_top = () => {
    $("#site-scroll").on("click", function () {
      $("html, body").animate({ scrollTop: 0 }, 1000);
      return false;
    });
  };

  const test = () => {};

  return (
    <div classNameName="pageWrapper">
      {/*Search Form Drawer*/}
      <div className="search">
        <div className="search__form">
          <form className="search-bar__form" action="#">
            <button className="go-btn search__button" type="submit">
              <i className="icon anm anm-search-l"></i>
            </button>
            <input
              className="search__input"
              type="search"
              name="q"
              value=""
              placeholder="Search entire store..."
              aria-label="Search"
              autoComplete="off"
              onChange={test}
            />
          </form>
          <button type="button" className="search-trigger close-btn">
            <i className="anm anm-times-l"></i>
          </button>
        </div>
      </div>

      {/*Top Header*/}
      <div className="top-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-10 col-sm-8 col-md-5 col-lg-4">
              <p className="phone-no">
                <i className="anm anm-phone-s"></i> +440 0(111) 044 833
              </p>
            </div>
            <div className="col-sm-4 col-md-4 col-lg-4 d-none d-lg-none d-md-block d-lg-block">
              <div className="text-center">
                <p className="top-header_middle-text">
                  {" "}
                  Worldwide Express Shipping
                </p>
              </div>
            </div>
            <div className="col-2 col-sm-4 col-md-3 col-lg-4 text-right">
              <span className="user-menu d-block d-lg-none">
                <i className="anm anm-user-al" aria-hidden="true"></i>
              </span>
              <ul className="customer-links list-inline">
                <li>
                  <a href="login.html">Login</a>
                </li>
                <li>
                  <a href="register.html">Create Account</a>
                </li>
                <li>
                  <a href="wishlist.html">Wishlist</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/*Header*/}
      <div className="header-wrap classNameicHeader animated d-flex">
        <div className="container-fluid">
          <div className="row align-items-center">
            {/*Desktop Logo*/}
            <div className="logo col-md-2 col-lg-2 d-none d-lg-block">
              <a href="index.html">
                <img
                  src={logo}
                  alt="Belle Multipurpose Html Template"
                  title="Belle Multipurpose Html Template"
                />
              </a>
            </div>
            {/*End Desktop Logo*/}
            <div className="col-2 col-sm-3 col-md-3 col-lg-8">
              <div className="d-block d-lg-none">
                <button
                  type="button"
                  className="btn--link site-header__menu js-mobile-nav-toggle mobile-nav--open"
                >
                  <i className="icon anm anm-times-l"></i>
                  <i className="anm anm-bars-r"></i>
                </button>
              </div>
              {/*Desktop Menu*/}
              <nav className="grid__item" id="AccessibleNav">
                {/* for mobile */}
                <ul id="siteNav" className="site-nav medium center hidearrow">
                  <li className="lvl1 parent megamenu">
                    <a href="#">
                      Home <i className="anm anm-angle-down-l"></i>
                    </a>
                    <div className="megamenu style1">
                      <ul className="grid mmWrapper">
                        <li className="grid__item large-up--one-whole">
                          <ul className="grid">
                            <li className="grid__item lvl-1 col-md-3 col-lg-3">
                              <a href="#" className="site-nav lvl-1">
                                Home Group 1
                              </a>
                              <ul className="subLinks">
                                <li className="lvl-2">
                                  <a
                                    href="index.html"
                                    className="site-nav lvl-2"
                                  >
                                    Home 1 - classNameic
                                  </a>
                                </li>
                                <li className="lvl-2">
                                  <a
                                    href="home2-default.html"
                                    className="site-nav lvl-2"
                                  >
                                    Home 2 - Default
                                  </a>
                                </li>
                                <li className="lvl-2">
                                  <a
                                    href="home15-funiture.html"
                                    className="site-nav lvl-2"
                                  >
                                    Home 15 - Furniture{" "}
                                    <span className="lbl nm_label1">New</span>
                                  </a>
                                </li>
                                <li className="lvl-2">
                                  <a
                                    href="home3-boxed.html"
                                    className="site-nav lvl-2"
                                  >
                                    Home 3 - Boxed
                                  </a>
                                </li>
                                <li className="lvl-2">
                                  <a
                                    href="home4-fullwidth.html"
                                    className="site-nav lvl-2"
                                  >
                                    Home 4 - Fullwidth
                                  </a>
                                </li>
                                <li className="lvl-2">
                                  <a
                                    href="home5-cosmetic.html"
                                    className="site-nav lvl-2"
                                  >
                                    Home 5 - Cosmetic
                                  </a>
                                </li>
                                <li className="lvl-2">
                                  <a
                                    href="home6-modern.html"
                                    className="site-nav lvl-2"
                                  >
                                    Home 6 - Modern
                                  </a>
                                </li>
                                <li className="lvl-2">
                                  <a
                                    href="home7-shoes.html"
                                    className="site-nav lvl-2"
                                  >
                                    Home 7 - Shoes
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li className="grid__item lvl-1 col-md-3 col-lg-3">
                              <a href="#" className="site-nav lvl-1">
                                Home Group 2
                              </a>
                              <ul className="subLinks">
                                <li className="lvl-2">
                                  <a
                                    href="home8-jewellery.html"
                                    className="site-nav lvl-2"
                                  >
                                    Home 8 - Jewellery
                                  </a>
                                </li>
                                <li className="lvl-2">
                                  <a
                                    href="home9-parallax.html"
                                    className="site-nav lvl-2"
                                  >
                                    Home 9 - Parallax
                                  </a>
                                </li>
                                <li className="lvl-2">
                                  <a
                                    href="home10-minimal.html"
                                    className="site-nav lvl-2"
                                  >
                                    Home 10 - Minimal
                                  </a>
                                </li>
                                <li className="lvl-2">
                                  <a
                                    href="home11-grid.html"
                                    className="site-nav lvl-2"
                                  >
                                    Home 11 - Grid
                                  </a>
                                </li>
                                <li className="lvl-2">
                                  <a
                                    href="home12-category.html"
                                    className="site-nav lvl-2"
                                  >
                                    Home 12 - Category
                                  </a>
                                </li>
                                <li className="lvl-2">
                                  <a
                                    href="home13-auto-parts.html"
                                    className="site-nav lvl-2"
                                  >
                                    Home 13 - Auto Parts
                                  </a>
                                </li>
                                <li className="lvl-2">
                                  <a
                                    href="home14-bags.html"
                                    className="site-nav lvl-2"
                                  >
                                    Home 14 - Bags{" "}
                                    <span className="lbl nm_label1">New</span>
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li className="grid__item lvl-1 col-md-3 col-lg-3">
                              <a href="#" className="site-nav lvl-1">
                                New Sections
                              </a>
                              <ul className="subLinks">
                                <li className="lvl-2">
                                  <a
                                    href="home11-grid.html"
                                    className="site-nav lvl-2"
                                  >
                                    Image Gallery
                                  </a>
                                </li>
                                <li className="lvl-2">
                                  <a
                                    href="home5-cosmetic.html"
                                    className="site-nav lvl-2"
                                  >
                                    Featured Product
                                  </a>
                                </li>
                                <li className="lvl-2">
                                  <a
                                    href="home7-shoes.html"
                                    className="site-nav lvl-2"
                                  >
                                    Columns with Items
                                  </a>
                                </li>
                                <li className="lvl-2">
                                  <a
                                    href="home6-modern.html"
                                    className="site-nav lvl-2"
                                  >
                                    Text columns with images
                                  </a>
                                </li>
                                <li className="lvl-2">
                                  <a
                                    href="home2-default.html"
                                    className="site-nav lvl-2"
                                  >
                                    Products Carousel
                                  </a>
                                </li>
                                <li className="lvl-2">
                                  <a
                                    href="home9-parallax.html"
                                    className="site-nav lvl-2"
                                  >
                                    Parallax Banner
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li className="grid__item lvl-1 col-md-3 col-lg-3">
                              <a href="#" className="site-nav lvl-1">
                                New Features
                              </a>
                              <ul className="subLinks">
                                <li className="lvl-2">
                                  <a
                                    href="home13-auto-parts.html"
                                    className="site-nav lvl-2"
                                  >
                                    Top Information Bar{" "}
                                    <span className="lbl nm_label1">New</span>
                                  </a>
                                </li>
                                <li className="lvl-2">
                                  <a href="#" className="site-nav lvl-2">
                                    Age Varification{" "}
                                    <span className="lbl nm_label1">New</span>
                                  </a>
                                </li>
                                <li className="lvl-2">
                                  <a href="#" className="site-nav lvl-2">
                                    Footer Blocks
                                  </a>
                                </li>
                                <li className="lvl-2">
                                  <a href="#" className="site-nav lvl-2">
                                    2 New Megamenu style
                                  </a>
                                </li>
                                <li className="lvl-2">
                                  <a href="#" className="site-nav lvl-2">
                                    Show Total Savings{" "}
                                    <span className="lbl nm_label3">Hot</span>
                                  </a>
                                </li>
                                <li className="lvl-2">
                                  <a href="#" className="site-nav lvl-2">
                                    New Custom Icons
                                  </a>
                                </li>
                                <li className="lvl-2">
                                  <a href="#" className="site-nav lvl-2">
                                    Auto Currency
                                  </a>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="lvl1 parent megamenu">
                    <a href="#">
                      Shop <i className="anm anm-angle-down-l"></i>
                    </a>
                    <div className="megamenu style4">
                      <ul className="grid grid--uniform mmWrapper">
                        <li className="grid__item lvl-1 col-md-3 col-lg-3">
                          <a href="#" className="site-nav lvl-1">
                            Shop Pages
                          </a>
                          <ul className="subLinks">
                            <li className="lvl-2">
                              <a
                                href="shop-left-sidebar.html"
                                className="site-nav lvl-2"
                              >
                                Left Sidebar
                              </a>
                            </li>
                            <li className="lvl-2">
                              <a
                                href="shop-right-sidebar.html"
                                className="site-nav lvl-2"
                              >
                                Right Sidebar
                              </a>
                            </li>
                            <li className="lvl-2">
                              <a
                                href="shop-fullwidth.html"
                                className="site-nav lvl-2"
                              >
                                Fullwidth
                              </a>
                            </li>
                            <li className="lvl-2">
                              <a
                                href="shop-grid-3.html"
                                className="site-nav lvl-2"
                              >
                                3 items per row
                              </a>
                            </li>
                            <li className="lvl-2">
                              <a
                                href="shop-grid-4.html"
                                className="site-nav lvl-2"
                              >
                                4 items per row
                              </a>
                            </li>
                            <li className="lvl-2">
                              <a
                                href="shop-grid-5.html"
                                className="site-nav lvl-2"
                              >
                                5 items per row
                              </a>
                            </li>
                            <li className="lvl-2">
                              <a
                                href="shop-grid-6.html"
                                className="site-nav lvl-2"
                              >
                                6 items per row
                              </a>
                            </li>
                            <li className="lvl-2">
                              <a
                                href="shop-grid-7.html"
                                className="site-nav lvl-2"
                              >
                                7 items per row
                              </a>
                            </li>
                            <li className="lvl-2">
                              <a
                                href="shop-listview.html"
                                className="site-nav lvl-2"
                              >
                                Product Listview
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li className="grid__item lvl-1 col-md-3 col-lg-3">
                          <a href="#" className="site-nav lvl-1">
                            Shop Features
                          </a>
                          <ul className="subLinks">
                            <li className="lvl-2">
                              <a
                                href="shop-left-sidebar.html"
                                className="site-nav lvl-2"
                              >
                                Product Countdown{" "}
                                <span className="lbl nm_label3">Hot</span>
                              </a>
                            </li>
                            <li className="lvl-2">
                              <a
                                href="shop-right-sidebar.html"
                                className="site-nav lvl-2"
                              >
                                Infinite Scrolling
                              </a>
                            </li>
                            <li className="lvl-2">
                              <a
                                href="shop-grid-3.html"
                                className="site-nav lvl-2"
                              >
                                Pagination - classNameic
                              </a>
                            </li>
                            <li className="lvl-2">
                              <a
                                href="shop-grid-6.html"
                                className="site-nav lvl-2"
                              >
                                Pagination - Load More
                              </a>
                            </li>
                            <li className="lvl-2">
                              <a
                                href="product-labels.html"
                                className="site-nav lvl-2"
                              >
                                Dynamic Product Labels
                              </a>
                            </li>
                            <li className="lvl-2">
                              <a
                                href="product-swatches-style.html"
                                className="site-nav lvl-2"
                              >
                                Product Swatches{" "}
                                <span className="lbl nm_label2">Sale</span>
                              </a>
                            </li>
                            <li className="lvl-2">
                              <a
                                href="product-hover-info.html"
                                className="site-nav lvl-2"
                              >
                                Product Hover Info
                              </a>
                            </li>
                            <li className="lvl-2">
                              <a
                                href="shop-grid-3.html"
                                className="site-nav lvl-2"
                              >
                                Product Reviews
                              </a>
                            </li>
                            <li className="lvl-2">
                              <a
                                href="shop-left-sidebar.html"
                                className="site-nav lvl-2"
                              >
                                Discount Label{" "}
                                <span className="lbl nm_label1">New</span>
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li className="grid__item lvl-1 col-md-6 col-lg-6">
                          <a href="#">
                            <img src={megamenuBg1} alt="" title="" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="lvl1 parent megamenu">
                    <a href="#">
                      Product <i className="anm anm-angle-down-l"></i>
                    </a>
                    <div className="megamenu style2">
                      <ul className="grid mmWrapper">
                        <li className="grid__item one-whole">
                          <ul className="grid">
                            <li className="grid__item lvl-1 col-md-3 col-lg-3">
                              <a href="#" className="site-nav lvl-1">
                                Product Page
                              </a>
                              <ul className="subLinks">
                                <li className="lvl-2">
                                  <a
                                    href="product-layout-1.html"
                                    className="site-nav lvl-2"
                                  >
                                    Product Layout 1
                                  </a>
                                </li>
                                <li className="lvl-2">
                                  <a
                                    href="product-layout-2.html"
                                    className="site-nav lvl-2"
                                  >
                                    Product Layout 2
                                  </a>
                                </li>
                                <li className="lvl-2">
                                  <a
                                    href="product-layout-3.html"
                                    className="site-nav lvl-2"
                                  >
                                    Product Layout 3
                                  </a>
                                </li>
                                <li className="lvl-2">
                                  <a
                                    href="product-with-left-thumbs.html"
                                    className="site-nav lvl-2"
                                  >
                                    Product With Left Thumbs
                                  </a>
                                </li>
                                <li className="lvl-2">
                                  <a
                                    href="product-with-right-thumbs.html"
                                    className="site-nav lvl-2"
                                  >
                                    Product With Right Thumbs
                                  </a>
                                </li>
                                <li className="lvl-2">
                                  <a
                                    href="product-with-bottom-thumbs.html"
                                    className="site-nav lvl-2"
                                  >
                                    Product With Bottom Thumbs
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li className="grid__item lvl-1 col-md-3 col-lg-3">
                              <a href="#" className="site-nav lvl-1">
                                Product Features
                              </a>
                              <ul className="subLinks">
                                <li className="lvl-2">
                                  <a
                                    href="short-description.html"
                                    className="site-nav lvl-2"
                                  >
                                    Short Description
                                  </a>
                                </li>
                                <li className="lvl-2">
                                  <a
                                    href="product-countdown.html"
                                    className="site-nav lvl-2"
                                  >
                                    Product Countdown
                                  </a>
                                </li>
                                <li className="lvl-2">
                                  <a
                                    href="product-video.html"
                                    className="site-nav lvl-2"
                                  >
                                    Product Video
                                  </a>
                                </li>
                                <li className="lvl-2">
                                  <a
                                    href="product-quantity-message.html"
                                    className="site-nav lvl-2"
                                  >
                                    Product Quantity Message
                                  </a>
                                </li>
                                <li className="lvl-2">
                                  <a
                                    href="product-visitor-sold-count.html"
                                    className="site-nav lvl-2"
                                  >
                                    Product Visitor/Sold Count{" "}
                                    <span className="lbl nm_label3">Hot</span>
                                  </a>
                                </li>
                                <li className="lvl-2">
                                  <a
                                    href="product-zoom-lightbox.html"
                                    className="site-nav lvl-2"
                                  >
                                    Product Zoom/Lightbox{" "}
                                    <span className="lbl nm_label1">New</span>
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li className="grid__item lvl-1 col-md-3 col-lg-3">
                              <a href="#" className="site-nav lvl-1">
                                Product Features
                              </a>
                              <ul className="subLinks">
                                <li className="lvl-2">
                                  <a
                                    href="product-with-variant-image.html"
                                    className="site-nav lvl-2"
                                  >
                                    Product with Variant Image
                                  </a>
                                </li>
                                <li className="lvl-2">
                                  <a
                                    href="product-with-color-swatch.html"
                                    className="site-nav lvl-2"
                                  >
                                    Product with Color Swatch
                                  </a>
                                </li>
                                <li className="lvl-2">
                                  <a
                                    href="product-with-image-swatch.html"
                                    className="site-nav lvl-2"
                                  >
                                    Product with Image Swatch
                                  </a>
                                </li>
                                <li className="lvl-2">
                                  <a
                                    href="product-with-dropdown.html"
                                    className="site-nav lvl-2"
                                  >
                                    Product with Dropdown
                                  </a>
                                </li>
                                <li className="lvl-2">
                                  <a
                                    href="product-with-rounded-square.html"
                                    className="site-nav lvl-2"
                                  >
                                    Product with Rounded Square
                                  </a>
                                </li>
                                <li className="lvl-2">
                                  <a
                                    href="swatches-style.html"
                                    className="site-nav lvl-2"
                                  >
                                    Product Swatches All Style
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li className="grid__item lvl-1 col-md-3 col-lg-3">
                              <a href="#" className="site-nav lvl-1">
                                Product Features
                              </a>
                              <ul className="subLinks">
                                <li className="lvl-2">
                                  <a
                                    href="product-accordion.html"
                                    className="site-nav lvl-2"
                                  >
                                    Product Accordion
                                  </a>
                                </li>
                                <li className="lvl-2">
                                  <a
                                    href="product-pre-orders.html"
                                    className="site-nav lvl-2"
                                  >
                                    Product Pre-orders{" "}
                                    <span className="lbl nm_label1">New</span>
                                  </a>
                                </li>
                                <li className="lvl-2">
                                  <a
                                    href="product-labels-detail.html"
                                    className="site-nav lvl-2"
                                  >
                                    Product Labels
                                  </a>
                                </li>
                                <li className="lvl-2">
                                  <a
                                    href="product-discount.html"
                                    className="site-nav lvl-2"
                                  >
                                    Product Discount In %
                                  </a>
                                </li>
                                <li className="lvl-2">
                                  <a
                                    href="product-shipping-message.html"
                                    className="site-nav lvl-2"
                                  >
                                    Product Shipping Message
                                  </a>
                                </li>
                                <li className="lvl-2">
                                  <a
                                    href="size-guide.html"
                                    className="site-nav lvl-2"
                                  >
                                    Size Guide{" "}
                                    <span className="lbl nm_label1">New</span>
                                  </a>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                        <li className="grid__item large-up--one-whole imageCol">
                          <a href="#">
                            <img src={megamenuBg2} alt="" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="lvl1 parent dropdown">
                    <a href="#">
                      Pages <i className="anm anm-angle-down-l"></i>
                    </a>
                    <ul className="dropdown">
                      <li>
                        <a href="cart-variant1.html" className="site-nav">
                          Cart Page <i className="anm anm-angle-right-l"></i>
                        </a>
                        <ul className="dropdown">
                          <li>
                            <a href="cart-variant1.html" className="site-nav">
                              Cart Variant1
                            </a>
                          </li>
                          <li>
                            <a href="cart-variant2.html" className="site-nav">
                              Cart Variant2
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="compare-variant1.html" className="site-nav">
                          Compare Product{" "}
                          <i className="anm anm-angle-right-l"></i>
                        </a>
                        <ul className="dropdown">
                          <li>
                            <a
                              href="compare-variant1.html"
                              className="site-nav"
                            >
                              Compare Variant1
                            </a>
                          </li>
                          <li>
                            <a
                              href="compare-variant2.html"
                              className="site-nav"
                            >
                              Compare Variant2
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="checkout.html" className="site-nav">
                          Checkout
                        </a>
                      </li>
                      <li>
                        <a href="about-us.html" className="site-nav">
                          About Us <span className="lbl nm_label1">New</span>{" "}
                        </a>
                      </li>
                      <li>
                        <a href="contact-us.html" className="site-nav">
                          Contact Us
                        </a>
                      </li>
                      <li>
                        <a href="faqs.html" className="site-nav">
                          FAQs
                        </a>
                      </li>
                      <li>
                        <a href="lookbook1.html" className="site-nav">
                          Lookbook<i className="anm anm-angle-right-l"></i>
                        </a>
                        <ul>
                          <li>
                            <a href="lookbook1.html" className="site-nav">
                              Style 1
                            </a>
                          </li>
                          <li>
                            <a href="lookbook2.html" className="site-nav">
                              Style 2
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="404.html" className="site-nav">
                          404
                        </a>
                      </li>
                      <li>
                        <a href="coming-soon.html" className="site-nav">
                          Coming soon <span className="lbl nm_label1">New</span>{" "}
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="lvl1 parent dropdown">
                    <a href="#">
                      Blog <i className="anm anm-angle-down-l"></i>
                    </a>
                    <ul className="dropdown">
                      <li>
                        <a href="blog-left-sidebar.html" className="site-nav">
                          Left Sidebar
                        </a>
                      </li>
                      <li>
                        <a href="blog-right-sidebar.html" className="site-nav">
                          Right Sidebar
                        </a>
                      </li>
                      <li>
                        <a href="blog-fullwidth.html" className="site-nav">
                          Fullwidth
                        </a>
                      </li>
                      <li>
                        <a href="blog-grid-view.html" className="site-nav">
                          Gridview
                        </a>
                      </li>
                      <li>
                        <a href="blog-article.html" className="site-nav">
                          Article
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="lvl1">
                    <a href="#">
                      <b>Buy Now!</b> <i className="anm anm-angle-down-l"></i>
                    </a>
                  </li>
                </ul>
              </nav>
              {/*End Desktop Menu*/}
            </div>
            {/*Mobile Logo*/}
            <div className="col-6 col-sm-6 col-md-6 col-lg-2 d-block d-lg-none mobile-logo">
              <div className="logo">
                <a href="index.html">
                  <img
                    src={logo}
                    alt="Belle Multipurpose Html Template"
                    title="Belle Multipurpose Html Template"
                  />
                </a>
              </div>
            </div>
            {/*Mobile Logo*/}
            <div className="col-4 col-sm-3 col-md-3 col-lg-2">
              <div className="site-cart">
                <a href="#;" className="site-header__cart" title="Cart">
                  <i className="icon anm anm-bag-l"></i>
                  <span
                    id="CartCount"
                    className="site-header__cart-count"
                    data-cart-render="item_count"
                  >
                    2
                  </span>
                </a>
                {/*Minicart Popup*/}
                <div id="header-cart" className="block block-cart">
                  <ul className="mini-products-list">
                    <li className="item">
                      <a className="product-image" href="#">
                        <img
                          src={capeDress1}
                          alt="3/4 Sleeve Kimono Dress"
                          title=""
                        />
                      </a>
                      <div className="product-details">
                        <a href="#" className="remove">
                          <i className="anm anm-times-l" aria-hidden="true"></i>
                        </a>
                        <a href="#" className="edit-i remove">
                          <i className="anm anm-edit" aria-hidden="true"></i>
                        </a>
                        <a className="pName" href="cart.html">
                          Sleeve Kimono Dress
                        </a>
                        <div className="variant-cart">Black / XL</div>
                        <div className="wrapQtyBtn">
                          <div className="qtyField">
                            <span className="label">Qty:</span>
                            <a className="qtyBtn minus" href="#">
                              <i
                                className="fa anm anm-minus-r"
                                aria-hidden="true"
                              ></i>
                            </a>
                            <input
                              type="text"
                              id="Quantity"
                              name="quantity"
                              value="1"
                              className="product-form__input qty"
                              onChange={test}
                            />
                            <a className="qtyBtn plus" href="#">
                              <i
                                className="fa anm anm-plus-r"
                                aria-hidden="true"
                              ></i>
                            </a>
                          </div>
                        </div>
                        <div className="priceRow">
                          <div className="product-price">
                            <span className="money">$59.00</span>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="item">
                      <a className="product-image" href="#">
                        <img
                          src={capeDress2}
                          alt="Elastic Waist Dress - Black / Small"
                          title=""
                        />
                      </a>
                      <div className="product-details">
                        <a href="#" className="remove">
                          <i className="anm anm-times-l" aria-hidden="true"></i>
                        </a>
                        <a href="#" className="edit-i remove">
                          <i className="anm anm-edit" aria-hidden="true"></i>
                        </a>
                        <a className="pName" href="cart.html">
                          Elastic Waist Dress
                        </a>
                        <div className="variant-cart">Gray / XXL</div>
                        <div className="wrapQtyBtn">
                          <div className="qtyField">
                            <span className="label">Qty:</span>
                            <a className="qtyBtn minus" href="#">
                              <i
                                className="fa anm anm-minus-r"
                                aria-hidden="true"
                              ></i>
                            </a>
                            <input
                              type="text"
                              id="Quantity"
                              name="quantity"
                              value="1"
                              onChange={test}
                              className="product-form__input qty"
                            />
                            <a className="qtyBtn plus" href="#">
                              <i
                                className="fa anm anm-plus-r"
                                aria-hidden="true"
                              ></i>
                            </a>
                          </div>
                        </div>
                        <div className="priceRow">
                          <div className="product-price">
                            <span className="money">$99.00</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div className="total">
                    <div className="total-in">
                      <span className="label">Cart Subtotal:</span>
                      <span className="product-price">
                        <span className="money">$748.00</span>
                      </span>
                    </div>
                    <div className="buttonSet text-center">
                      <a
                        href="cart.html"
                        className="btn btn-secondary btn--small"
                      >
                        View Cart
                      </a>
                      <a
                        href="checkout.html"
                        className="btn btn-secondary btn--small"
                      >
                        Checkout
                      </a>
                    </div>
                  </div>
                </div>
                {/*End Minicart Popup*/}
              </div>
              <div className="site-header__search">
                <button type="button" className="search-trigger">
                  <i className="icon anm anm-search-l"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Mobile Menu*/}
      <div className="mobile-nav-wrapper" role="navigation">
        <div className="closemobileMenu">
          <i className="icon anm anm-times-l pull-right"></i> Close Menu
        </div>
        <ul id="MobileNav" className="mobile-nav">
          <li className="lvl1 parent megamenu">
            <a href="index.html">
              Home <i className="anm anm-plus-l"></i>
            </a>
            <ul>
              <li>
                <a href="#" className="site-nav">
                  Home Group 1<i className="anm anm-plus-l"></i>
                </a>
                <ul>
                  <li>
                    <a href="index.html" className="site-nav">
                      Home 1 - classNameic
                    </a>
                  </li>
                  <li>
                    <a href="home2-default.html" className="site-nav">
                      Home 2 - Default
                    </a>
                  </li>
                  <li>
                    <a href="home15-funiture.html" className="site-nav">
                      Home 15 - Furniture{" "}
                    </a>
                  </li>
                  <li>
                    <a href="home3-boxed.html" className="site-nav">
                      Home 3 - Boxed
                    </a>
                  </li>
                  <li>
                    <a href="home4-fullwidth.html" className="site-nav">
                      Home 4 - Fullwidth
                    </a>
                  </li>
                  <li>
                    <a href="home5-cosmetic.html" className="site-nav">
                      Home 5 - Cosmetic
                    </a>
                  </li>
                  <li>
                    <a href="home6-modern.html" className="site-nav">
                      Home 6 - Modern
                    </a>
                  </li>
                  <li>
                    <a href="home7-shoes.html" className="site-nav last">
                      Home 7 - Shoes
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#" className="site-nav">
                  Home Group 2<i className="anm anm-plus-l"></i>
                </a>
                <ul>
                  <li>
                    <a href="home8-jewellery.html" className="site-nav">
                      Home 8 - Jewellery
                    </a>
                  </li>
                  <li>
                    <a href="home9-parallax.html" className="site-nav">
                      Home 9 - Parallax
                    </a>
                  </li>
                  <li>
                    <a href="home10-minimal.html" className="site-nav">
                      Home 10 - Minimal
                    </a>
                  </li>
                  <li>
                    <a href="home11-grid.html" className="site-nav">
                      Home 11 - Grid
                    </a>
                  </li>
                  <li>
                    <a href="home12-category.html" className="site-nav">
                      Home 12 - Category
                    </a>
                  </li>
                  <li>
                    <a href="home13-auto-parts.html" className="site-nav">
                      Home 13 - Auto Parts
                    </a>
                  </li>
                  <li>
                    <a href="home14-bags.html" className="site-nav last">
                      Home 14 - Bags
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#" className="site-nav">
                  New Sections<i className="anm anm-plus-l"></i>
                </a>
                <ul>
                  <li>
                    <a href="home11-grid.html" className="site-nav">
                      Image Gallery
                    </a>
                  </li>
                  <li>
                    <a href="home5-cosmetic.html" className="site-nav">
                      Featured Product
                    </a>
                  </li>
                  <li>
                    <a href="home7-shoes.html" className="site-nav">
                      Columns with Items
                    </a>
                  </li>
                  <li>
                    <a href="home6-modern.html" className="site-nav">
                      Text columns with images
                    </a>
                  </li>
                  <li>
                    <a href="home2-default.html" className="site-nav">
                      Products Carousel
                    </a>
                  </li>
                  <li>
                    <a href="home9-parallax.html" className="site-nav last">
                      Parallax Banner
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#" className="site-nav">
                  New Features<i className="anm anm-plus-l"></i>
                </a>
                <ul>
                  <li>
                    <a href="home13-auto-parts.html" className="site-nav">
                      Top Information Bar{" "}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="site-nav">
                      Age Varification{" "}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="site-nav">
                      Footer Blocks
                    </a>
                  </li>
                  <li>
                    <a href="#" className="site-nav">
                      2 New Megamenu style
                    </a>
                  </li>
                  <li>
                    <a href="#" className="site-nav">
                      Show Total Savings{" "}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="site-nav">
                      New Custom Icons
                    </a>
                  </li>
                  <li>
                    <a href="#" className="site-nav last">
                      Auto Currency
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="lvl1 parent megamenu">
            <a href="#">
              Shop <i className="anm anm-plus-l"></i>
            </a>
            <ul>
              <li>
                <a href="#" className="site-nav">
                  Shop Pages<i className="anm anm-plus-l"></i>
                </a>
                <ul>
                  <li>
                    <a href="shop-left-sidebar.html" className="site-nav">
                      Left Sidebar
                    </a>
                  </li>
                  <li>
                    <a href="shop-right-sidebar.html" className="site-nav">
                      Right Sidebar
                    </a>
                  </li>
                  <li>
                    <a href="shop-fullwidth.html" className="site-nav">
                      Fullwidth
                    </a>
                  </li>
                  <li>
                    <a href="shop-grid-3.html" className="site-nav">
                      3 items per row
                    </a>
                  </li>
                  <li>
                    <a href="shop-grid-4.html" className="site-nav">
                      4 items per row
                    </a>
                  </li>
                  <li>
                    <a href="shop-grid-5.html" className="site-nav">
                      5 items per row
                    </a>
                  </li>
                  <li>
                    <a href="shop-grid-6.html" className="site-nav">
                      6 items per row
                    </a>
                  </li>
                  <li>
                    <a href="shop-grid-7.html" className="site-nav">
                      7 items per row
                    </a>
                  </li>
                  <li>
                    <a href="shop-listview.html" className="site-nav last">
                      Product Listview
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#" className="site-nav">
                  Shop Features<i className="anm anm-plus-l"></i>
                </a>
                <ul>
                  <li>
                    <a href="shop-left-sidebar.html" className="site-nav">
                      Product Countdown{" "}
                    </a>
                  </li>
                  <li>
                    <a href="shop-right-sidebar.html" className="site-nav">
                      Infinite Scrolling
                    </a>
                  </li>
                  <li>
                    <a href="shop-grid-3.html" className="site-nav">
                      Pagination - classNameic
                    </a>
                  </li>
                  <li>
                    <a href="shop-grid-6.html" className="site-nav">
                      Pagination - Load More
                    </a>
                  </li>
                  <li>
                    <a href="product-labels.html" className="site-nav">
                      Dynamic Product Labels
                    </a>
                  </li>
                  <li>
                    <a href="product-swatches-style.html" className="site-nav">
                      Product Swatches{" "}
                    </a>
                  </li>
                  <li>
                    <a href="product-hover-info.html" className="site-nav">
                      Product Hover Info
                    </a>
                  </li>
                  <li>
                    <a href="shop-grid-3.html" className="site-nav">
                      Product Reviews
                    </a>
                  </li>
                  <li>
                    <a href="shop-left-sidebar.html" className="site-nav last">
                      Discount Label{" "}
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="lvl1 parent megamenu">
            <a href="product-layout-1.html">
              Product <i className="anm anm-plus-l"></i>
            </a>
            <ul>
              <li>
                <a href="product-layout-1.html" className="site-nav">
                  Product Page<i className="anm anm-plus-l"></i>
                </a>
                <ul>
                  <li>
                    <a href="product-layout-1.html" className="site-nav">
                      Product Layout 1
                    </a>
                  </li>
                  <li>
                    <a href="product-layout-2.html" className="site-nav">
                      Product Layout 2
                    </a>
                  </li>
                  <li>
                    <a href="product-layout-3.html" className="site-nav">
                      Product Layout 3
                    </a>
                  </li>
                  <li>
                    <a
                      href="product-with-left-thumbs.html"
                      className="site-nav"
                    >
                      Product With Left Thumbs
                    </a>
                  </li>
                  <li>
                    <a
                      href="product-with-right-thumbs.html"
                      className="site-nav"
                    >
                      Product With Right Thumbs
                    </a>
                  </li>
                  <li>
                    <a
                      href="product-with-bottom-thumbs.html"
                      className="site-nav last"
                    >
                      Product With Bottom Thumbs
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="short-description.html" className="site-nav">
                  Product Features<i className="anm anm-plus-l"></i>
                </a>
                <ul>
                  <li>
                    <a href="short-description.html" className="site-nav">
                      Short Description
                    </a>
                  </li>
                  <li>
                    <a href="product-countdown.html" className="site-nav">
                      Product Countdown
                    </a>
                  </li>
                  <li>
                    <a href="product-video.html" className="site-nav">
                      Product Video
                    </a>
                  </li>
                  <li>
                    <a
                      href="product-quantity-message.html"
                      className="site-nav"
                    >
                      Product Quantity Message
                    </a>
                  </li>
                  <li>
                    <a
                      href="product-visitor-sold-count.html"
                      className="site-nav"
                    >
                      Product Visitor/Sold Count{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="product-zoom-lightbox.html"
                      className="site-nav last"
                    >
                      Product Zoom/Lightbox{" "}
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#" className="site-nav">
                  Product Features<i className="anm anm-plus-l"></i>
                </a>
                <ul>
                  <li>
                    <a
                      href="product-with-variant-image.html"
                      className="site-nav"
                    >
                      Product with Variant Image
                    </a>
                  </li>
                  <li>
                    <a
                      href="product-with-color-swatch.html"
                      className="site-nav"
                    >
                      Product with Color Swatch
                    </a>
                  </li>
                  <li>
                    <a
                      href="product-with-image-swatch.html"
                      className="site-nav"
                    >
                      Product with Image Swatch
                    </a>
                  </li>
                  <li>
                    <a href="product-with-dropdown.html" className="site-nav">
                      Product with Dropdown
                    </a>
                  </li>
                  <li>
                    <a
                      href="product-with-rounded-square.html"
                      className="site-nav"
                    >
                      Product with Rounded Square
                    </a>
                  </li>
                  <li>
                    <a href="swatches-style.html" className="site-nav last">
                      Product Swatches All Style
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#" className="site-nav">
                  Product Features<i className="anm anm-plus-l"></i>
                </a>
                <ul>
                  <li>
                    <a href="product-accordion.html" className="site-nav">
                      Product Accordion
                    </a>
                  </li>
                  <li>
                    <a href="product-pre-orders.html" className="site-nav">
                      Product Pre-orders{" "}
                    </a>
                  </li>
                  <li>
                    <a href="product-labels-detail.html" className="site-nav">
                      Product Labels
                    </a>
                  </li>
                  <li>
                    <a href="product-discount.html" className="site-nav">
                      Product Discount In %
                    </a>
                  </li>
                  <li>
                    <a
                      href="product-shipping-message.html"
                      className="site-nav"
                    >
                      Product Shipping Message
                    </a>
                  </li>
                  <li>
                    <a
                      href="product-shipping-message.html"
                      className="site-nav last"
                    >
                      Size Guide{" "}
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="lvl1 parent megamenu">
            <a href="about-us.html">
              Pages <i className="anm anm-plus-l"></i>
            </a>
            <ul>
              <li>
                <a href="cart-variant1.html" className="site-nav">
                  Cart Page <i className="anm anm-plus-l"></i>
                </a>
                <ul className="dropdown">
                  <li>
                    <a href="cart-variant1.html" className="site-nav">
                      Cart Variant1
                    </a>
                  </li>
                  <li>
                    <a href="cart-variant2.html" className="site-nav">
                      Cart Variant2
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="compare-variant1.html" className="site-nav">
                  Compare Product <i className="anm anm-plus-l"></i>
                </a>
                <ul className="dropdown">
                  <li>
                    <a href="compare-variant1.html" className="site-nav">
                      Compare Variant1
                    </a>
                  </li>
                  <li>
                    <a href="compare-variant2.html" className="site-nav">
                      Compare Variant2
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="checkout.html" className="site-nav">
                  Checkout
                </a>
              </li>
              <li>
                <a href="checkout.html" className="site-nav">
                  Checkout
                </a>
              </li>
              <li>
                <a href="about-us.html" className="site-nav">
                  About Us<span className="lbl nm_label1">New</span>
                </a>
              </li>
              <li>
                <a href="contact-us.html" className="site-nav">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="faqs.html" className="site-nav">
                  FAQs
                </a>
              </li>
              <li>
                <a href="lookbook1.html" className="site-nav">
                  Lookbook<i className="anm anm-plus-l"></i>
                </a>
                <ul>
                  <li>
                    <a href="lookbook1.html" className="site-nav">
                      Style 1
                    </a>
                  </li>
                  <li>
                    <a href="lookbook2.html" className="site-nav last">
                      Style 2
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="404.html" className="site-nav">
                  404
                </a>
              </li>
              <li>
                <a href="coming-soon.html" className="site-nav">
                  Coming soon<span className="lbl nm_label1">New</span>
                </a>
              </li>
            </ul>
          </li>
          <li className="lvl1 parent megamenu">
            <a href="blog-left-sidebar.html">
              Blog <i className="anm anm-plus-l"></i>
            </a>
            <ul>
              <li>
                <a href="blog-left-sidebar.html" className="site-nav">
                  Left Sidebar
                </a>
              </li>
              <li>
                <a href="blog-right-sidebar.html" className="site-nav">
                  Right Sidebar
                </a>
              </li>
              <li>
                <a href="blog-fullwidth.html" className="site-nav">
                  Fullwidth
                </a>
              </li>
              <li>
                <a href="blog-grid-view.html" className="site-nav">
                  Gridview
                </a>
              </li>
              <li>
                <a href="blog-article.html" className="site-nav">
                  Article
                </a>
              </li>
            </ul>
          </li>
          <li className="lvl1">
            <a href="#">
              <b>Buy Now!</b>
            </a>
          </li>
        </ul>
      </div>

      {/*Body Content*/}
      <div id="page-content">
        {/*Home slider*/}
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
        {/*End Home slider*/}

        {/*Feature Content*/}
        <div className="section feature-content">
          <div className="container">
            <div className="row">
              <div className="feature-row">
                <div className="col-12 col-sm-12 col-md-6 feature-row__item text-center">
                  <img
                    className=""
                    data-src={bnr1}
                    src={bnr1}
                    alt="Hot hoodies jackets"
                    title="Hot hoodies jackets"
                  />
                </div>
                <div className="col-12 col-sm-12 col-md-6 feature-row__item feature-row__text feature-row__text--left text-left">
                  <div className="row-text">
                    <h2 className="h2">Hot hoodies jackets</h2>
                    <p>Cover up in style with Hot Jackets now only $50</p>
                    <a href="#" className="btn">
                      SHOP $50 Jackets
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*Feature Content*/}

        {/*Feature Content*/}
        <div className="section feature-content">
          <div className="container">
            <div className="row">
              <div className="feature-row">
                <div className="col-12 col-sm-12 col-md-6 feature-row__item feature-row__text feature-row__text--right text-right">
                  <div className="row-text">
                    <h2 className="h2">Shoes Collection</h2>
                    <p>Shoes we can't stop wearing!</p>
                    <a href="#" className="btn">
                      Shop Now
                    </a>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 feature-row__item text-center">
                  <img
                    className=""
                    data-src={bnr2}
                    src={bnr2}
                    alt="Shoes Collection"
                    title="Shoes Collection"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*Feature Content*/}

        {/*Shop these looks*/}
        <div className="section">
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                <div className="section-header text-center">
                  <h2 className="h2">Shop these looks</h2>
                  <p>
                    Shop from hundreds of collections for a fashionable look.
                  </p>
                </div>
                <div className="productSlider grid-products grid-products-hover-gry">
                  <div className="col-12 item">
                    {/* start product image */}
                    <div className="product-image">
                      {/* start product image */}
                      <a
                        href="product-layout-1.html"
                        className="grid-view-item__link"
                      >
                        {/* image */}
                        <img
                          className="primary "
                          data-src={product7}
                          src={product7}
                          alt="image"
                          title="product"
                        />
                        {/* End image */}
                        {/* Hover image */}
                        <img
                          className="hover "
                          data-src={product7_1}
                          src={product7_1}
                          alt="image"
                          title="product"
                        />
                        {/* End hover image */}
                      </a>
                      {/* end product image */}
                      {/* Start product button */}
                      <form
                        className="variants add"
                        action="#"
                        onClick={test}
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
                          href="#"
                          title="Quick View"
                          className="quick-view-popup quick-view"
                          data-toggle="modal"
                          data-target="#content_quickview"
                        >
                          <i className="icon anm anm-search-plus-r"></i>
                        </a>
                        <div className="wishlist-btn">
                          <a
                            className="wishlist add-to-wishlist"
                            href="wishlist.html"
                          >
                            <i className="icon anm anm-heart-l"></i>
                          </a>
                        </div>
                        <div className="compare-btn">
                          <a
                            className="compare add-to-compare"
                            href="compare.html"
                            title="Add to Compare"
                          >
                            <i className="icon anm anm-random-r"></i>
                          </a>
                        </div>
                      </div>
                      {/* end product button */}
                    </div>
                    {/* end product image */}
                    {/*start product details */}
                    <div className="product-details text-center">
                      {/* product name */}
                      <div className="product-name">
                        <a href="product-layout-1.html">Block Button Up</a>
                      </div>
                      {/* End product name */}
                      {/* product price */}
                      <div className="product-price">
                        <span className="price">$600.00</span>
                      </div>
                      {/* End product price */}
                    </div>
                    {/* End product details */}
                  </div>
                  <div className="col-12 item">
                    {/* start product image */}
                    <div className="product-image">
                      {/* start product image */}
                      <a
                        href="product-layout-1.html"
                        className="grid-view-item__link"
                      >
                        {/* image */}
                        <img
                          className="primary "
                          data-src={product24}
                          src={product24}
                          alt="image"
                          title="product"
                        />
                        {/* End image */}
                        {/* Hover image */}
                        <img
                          className="hover "
                          data-src={product24_1}
                          src={product24_1}
                          alt="image"
                          title="product"
                        />
                        {/* End hover image */}
                      </a>
                      {/* end product image */}

                      {/* Start product button */}
                      <form
                        className="variants add"
                        action="#"
                        onClick={test}
                        method="post"
                      >
                        <button
                          className="btn btn-addto-cart"
                          type="button"
                          tabIndex="0"
                        >
                          Select Options
                        </button>
                      </form>
                      <div className="button-set">
                        <a
                          href="#"
                          title="Quick View"
                          className="quick-view-popup quick-view"
                          data-toggle="modal"
                          data-target="#content_quickview"
                        >
                          <i className="icon anm anm-search-plus-r"></i>
                        </a>
                        <div className="wishlist-btn">
                          <a
                            className="wishlist add-to-wishlist"
                            href="wishlist.html"
                          >
                            <i className="icon anm anm-heart-l"></i>
                          </a>
                        </div>
                        <div className="compare-btn">
                          <a
                            className="compare add-to-compare"
                            href="compare.html"
                            title="Add to Compare"
                          >
                            <i className="icon anm anm-random-r"></i>
                          </a>
                        </div>
                      </div>
                      {/* end product button */}
                    </div>
                    {/* end product image */}

                    {/*start product details */}
                    <div className="product-details text-center">
                      {/* product name */}
                      <div className="product-name">
                        <a href="product-layout-1.html">Cena Skirt</a>
                      </div>
                      {/* End product name */}
                      {/* product price */}
                      <div className="product-price">
                        <span className="price">$748.00</span>
                      </div>
                      {/* End product price */}
                    </div>
                    {/* End product details */}
                  </div>
                  <div className="col-12 item">
                    {/* start product image */}
                    <div className="product-image">
                      {/* start product image */}
                      <a
                        href="product-layout-1.html"
                        className="grid-view-item__link"
                      >
                        {/* image */}
                        <img
                          className="primary "
                          data-src={product33}
                          src={product33}
                          alt="image"
                          title="product"
                        />
                        {/* End image */}
                        {/* Hover image */}
                        <img
                          className="hover "
                          data-src={product33_1}
                          src={product33_1}
                          alt="image"
                          title="product"
                        />
                        {/* End hover image */}
                      </a>
                      {/* end product image */}

                      {/* Start product button */}
                      <form
                        className="variants add"
                        action="#"
                        onClick={test}
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
                          href="#"
                          title="Quick View"
                          className="quick-view-popup quick-view"
                          data-toggle="modal"
                          data-target="#content_quickview"
                        >
                          <i className="icon anm anm-search-plus-r"></i>
                        </a>
                        <div className="wishlist-btn">
                          <a
                            className="wishlist add-to-wishlist"
                            href="wishlist.html"
                          >
                            <i className="icon anm anm-heart-l"></i>
                          </a>
                        </div>
                        <div className="compare-btn">
                          <a
                            className="compare add-to-compare"
                            href="compare.html"
                            title="Add to Compare"
                          >
                            <i className="icon anm anm-random-r"></i>
                          </a>
                        </div>
                      </div>
                      {/* end product button */}
                    </div>
                    {/* end product image */}

                    {/*start product details */}
                    <div className="product-details text-center">
                      {/* product name */}
                      <div className="product-name">
                        <a href="product-layout-1.html">Balda Button Pant</a>
                      </div>
                      {/* End product name */}
                      {/* product price */}
                      <div className="product-price">
                        <span className="price">$350.00</span>
                      </div>
                      {/* End product price */}
                    </div>
                    {/* End product details */}
                  </div>
                  <div className="col-12 item">
                    {/* start product image */}
                    <div className="product-image">
                      {/* start product image */}
                      <a
                        href="product-layout-1.html"
                        className="grid-view-item__link"
                      >
                        {/* image */}
                        <img
                          className="primary "
                          data-src={product_H4}
                          src={product_H4}
                          alt="image"
                          title="product"
                        />
                        {/* End image */}
                        {/* Hover image */}
                        <img
                          className="hover "
                          data-src={product4_1}
                          src={product4_1}
                          alt="image"
                          title="product"
                        />
                        {/* End hover image */}
                      </a>
                      {/* end product image */}

                      {/* Start product button */}
                      <form
                        className="variants add"
                        action="#"
                        onClick={test}
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
                          href="#"
                          title="Quick View"
                          className="quick-view-popup quick-view"
                          data-toggle="modal"
                          data-target="#content_quickview"
                        >
                          <i className="icon anm anm-search-plus-r"></i>
                        </a>
                        <div className="wishlist-btn">
                          <a
                            className="wishlist add-to-wishlist"
                            href="wishlist.html"
                          >
                            <i className="icon anm anm-heart-l"></i>
                          </a>
                        </div>
                        <div className="compare-btn">
                          <a
                            className="compare add-to-compare"
                            href="compare.html"
                            title="Add to Compare"
                          >
                            <i className="icon anm anm-random-r"></i>
                          </a>
                        </div>
                      </div>
                      {/* end product button */}
                    </div>
                    {/* end product image */}

                    {/*start product details */}
                    <div className="product-details text-center">
                      {/* product name */}
                      <div className="product-name">
                        <a href="product-layout-1.html">Cape Dress</a>
                      </div>
                      {/* End product name */}
                      {/* product price */}
                      <div className="product-price">
                        <span className="old-price">$900.00</span>
                        <span className="price">$788.00</span>
                      </div>
                      {/* End product price */}
                    </div>
                    {/* End product details */}
                  </div>
                  <div className="col-12 item">
                    {/* start product image */}
                    <div className="product-image">
                      {/* start product image */}
                      <a
                        href="product-layout-1.html"
                        className="grid-view-item__link"
                      >
                        {/* image */}
                        <img
                          className="primary "
                          data-src={product_H5}
                          src={product_H5}
                          alt="image"
                          title="product"
                        />
                        {/* End image */}
                        {/* Hover image */}
                        <img
                          className="hover "
                          data-src={product5_1}
                          src={product5_1}
                          alt="image"
                          title="product"
                        />
                        {/* End hover image */}
                      </a>
                      {/* end product image */}

                      {/* Start product button */}
                      <form
                        className="variants add"
                        action="#"
                        onClick={test}
                        method="post"
                      >
                        <button
                          className="btn btn-addto-cart"
                          type="button"
                          tabIndex="0"
                        >
                          Select Options
                        </button>
                      </form>
                      <div className="button-set">
                        <a
                          href="#"
                          title="Quick View"
                          className="quick-view-popup quick-view"
                          data-toggle="modal"
                          data-target="#content_quickview"
                        >
                          <i className="icon anm anm-search-plus-r"></i>
                        </a>
                        <div className="wishlist-btn">
                          <a
                            className="wishlist add-to-wishlist"
                            href="wishlist.html"
                          >
                            <i className="icon anm anm-heart-l"></i>
                          </a>
                        </div>
                        <div className="compare-btn">
                          <a
                            className="compare add-to-compare"
                            href="compare.html"
                            title="Add to Compare"
                          >
                            <i className="icon anm anm-random-r"></i>
                          </a>
                        </div>
                      </div>
                      {/* end product button */}
                    </div>
                    {/* end product image */}

                    {/*start product details */}
                    <div className="product-details text-center">
                      {/* product name */}
                      <div className="product-name">
                        <a href="product-layout-1.html">Paper Dress</a>
                      </div>
                      {/* End product name */}
                      {/* product price */}
                      <div className="product-price">
                        <span className="price">$450.00</span>
                      </div>
                      {/* End product price */}
                    </div>
                    {/* End product details */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*End Shop these looks*/}

        {/*Feature Content*/}
        <div className="section feature-content">
          <div className="container">
            <div className="row">
              <div className="feature-row">
                <div className="col-12 col-sm-12 col-md-6 feature-row__item text-center">
                  <img
                    className=""
                    data-src={bnr3}
                    src={bnr3}
                    alt="Nuke New Arrivals"
                    title="Nuke New Arrivals"
                  />
                </div>
                <div className="col-12 col-sm-12 col-md-6 feature-row__item feature-row__text feature-row__text--left text-left">
                  <div className="row-text">
                    <h2 className="h2">Nuke New Arrivals</h2>
                    <p>Fresh arrivals are here to take over your closet!</p>
                    <a href="#" className="btn">
                      Explore Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*Feature Content*/}

        {/*Three Column Products*/}
        <div className="section three-column-pro">
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-6 col-md-4 col-lg-4">
                <div className="section-header text-left">
                  <h2 className="h2">Most Popular</h2>
                </div>
                <div className="grid">
                  <div className="grid__item">
                    <div className="mini-list-item">
                      <div className="mini-view_image">
                        <a className="grid-view-item__link" href="#">
                          <img
                            className="grid-view-item__image "
                            data-src={product_H1}
                            src={product_H1}
                            alt=""
                          />
                        </a>
                      </div>
                      <div className="details">
                        {" "}
                        <a className="grid-view-item__title" href="#">
                          Camoscio Zip Heel
                        </a>
                        <div className="grid-view-item__meta">
                          <span className="product-price__price">
                            <span className="money">$173.60</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid__item">
                    <div className="mini-list-item">
                      <div className="mini-view_image">
                        {" "}
                        <a className="grid-view-item__link" href="#">
                          <img
                            className="grid-view-item__image "
                            data-src={product_H2}
                            src={product_H2}
                            alt=""
                          />
                        </a>{" "}
                      </div>
                      <div className="details">
                        {" "}
                        <a className="grid-view-item__title" href="#">
                          Camoscio Heel
                        </a>
                        <div className="grid-view-item__meta">
                          <span className="product-price__price">
                            <span className="money">$378.00</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid__item">
                    <div className="mini-list-item">
                      <div className="mini-view_image">
                        {" "}
                        <a className="grid-view-item__link" href="#">
                          <img
                            className="grid-view-item__image "
                            data-src={product_H3}
                            src={product_H3}
                            alt=""
                          />
                        </a>{" "}
                      </div>
                      <div className="details">
                        {" "}
                        <a className="grid-view-item__title" href="#">
                          Aqualina Sandal
                        </a>
                        <div className="grid-view-item__meta">
                          <span className="product-price__price">
                            <span className="money">$278.60</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-4 col-lg-4">
                <div className="section-header text-left">
                  <h2 className="h2">Weekly Top Seller</h2>
                </div>
                <div className="grid">
                  <div className="grid__item">
                    <div className="mini-list-item">
                      <div className="mini-view_image">
                        <a className="grid-view-item__link" href="#">
                          <img
                            className="grid-view-item__image"
                            src={product_H4}
                            alt=""
                          />
                        </a>
                      </div>
                      <div className="details">
                        {" "}
                        <a className="grid-view-item__title" href="#">
                          White Sneaker
                        </a>
                        <div className="grid-view-item__meta">
                          <span className="product-price__price">
                            <span className="money">$173.60</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid__item">
                    <div className="mini-list-item">
                      <div className="mini-view_image">
                        {" "}
                        <a className="grid-view-item__link" href="#">
                          <img
                            className="grid-view-item__image "
                            src={product_H5}
                            alt=""
                          />
                        </a>{" "}
                      </div>
                      <div className="details">
                        {" "}
                        <a className="grid-view-item__title" href="#">
                          Suede Loafers - Black/Blue
                        </a>
                        <div className="grid-view-item__meta">
                          <span className="product-price__price">
                            <span className="money">$378.00</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid__item">
                    <div className="mini-list-item">
                      <div className="mini-view_image">
                        {" "}
                        <a className="grid-view-item__link" href="#">
                          <img
                            className="grid-view-item__image "
                            src={product_H6}
                            alt=""
                          />
                        </a>{" "}
                      </div>
                      <div className="details">
                        {" "}
                        <a className="grid-view-item__title" href="#">
                          Stiro Oxford in Slate
                        </a>
                        <div className="grid-view-item__meta">
                          <span className="product-price__price">
                            <span className="money">$278.60</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-4 col-lg-4">
                <div className="section-header text-left">
                  <h2 className="h2">Flash Sale</h2>
                </div>
                <div className="grid">
                  <div className="grid__item">
                    <div className="mini-list-item">
                      <div className="mini-view_image">
                        <a className="grid-view-item__link" href="#">
                          <img
                            className="grid-view-item__image "
                            data-src={product_H1}
                            src={product_H1}
                            alt=""
                          />
                        </a>
                      </div>
                      <div className="details">
                        {" "}
                        <a className="grid-view-item__title" href="#">
                          Camoscio Zip Heel
                        </a>
                        <div className="grid-view-item__meta">
                          <span className="product-price__price">
                            <span className="money">$173.60</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid__item">
                    <div className="mini-list-item">
                      <div className="mini-view_image">
                        {" "}
                        <a className="grid-view-item__link" href="#">
                          <img
                            className="grid-view-item__image "
                            data-src={product_H2}
                            src={product_H2}
                            alt=""
                          />
                        </a>{" "}
                      </div>
                      <div className="details">
                        {" "}
                        <a className="grid-view-item__title" href="#">
                          Camoscio Heel
                        </a>
                        <div className="grid-view-item__meta">
                          <span className="product-price__price">
                            <span className="money">$378.00</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid__item">
                    <div className="mini-list-item">
                      <div className="mini-view_image">
                        {" "}
                        <a className="grid-view-item__link" href="#">
                          <img
                            className="grid-view-item__image "
                            data-src={product_H3}
                            src={product_H3}
                            alt=""
                          />
                        </a>{" "}
                      </div>
                      <div className="details">
                        {" "}
                        <a className="grid-view-item__title" href="#">
                          Aqualina Sandal
                        </a>
                        <div className="grid-view-item__meta">
                          <span className="product-price__price">
                            <span className="money">$278.60</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*End Three Column Products*/}

        {/* Instagram Section*/}
        <div className="section instagram-feed-section">
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                <div className="section-header text-center">
                  <h2 className="h2 heading-font">Belle On Instagram</h2>
                  <p>
                    Phasellus lorem malesuada ligula pulvinar commodo maecenas
                    suscipit auctom.
                  </p>
                </div>
                {/*Instagram ID*/}
                <div id="instafeed" className="imlow_resolution"></div>
                {/*End Instagram ID*/}
              </div>
            </div>
          </div>
        </div>
        {/*End Instagram Section*/}
      </div>

      {/*Footer*/}
      <footer id="footer" className="footer-5">
        <div className="site-footer">
          <div className="container">
            {/*Footer Links*/}
            <div className="footer-top">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-3 col-lg-3 footer-links">
                  <h4 className="h4">Informations</h4>
                  <ul>
                    <li>
                      <a href="#">About us</a>
                    </li>
                    <li>
                      <a href="#">Careers</a>
                    </li>
                    <li>
                      <a href="#">Privacy policy</a>
                    </li>
                    <li>
                      <a href="#">Terms &amp; condition</a>
                    </li>
                    <li>
                      <a href="#">My Account</a>
                    </li>
                  </ul>
                </div>
                <div className="col-12 col-sm-12 col-md-3 col-lg-3 footer-links">
                  <h4 className="h4">Customer Services</h4>
                  <ul>
                    <li>
                      <a href="#">Request Personal Data</a>
                    </li>
                    <li>
                      <a href="#">FAQ's</a>
                    </li>
                    <li>
                      <a href="#">Contact Us</a>
                    </li>
                    <li>
                      <a href="#">Orders and Returns</a>
                    </li>
                    <li>
                      <a href="#">Support Center</a>
                    </li>
                  </ul>
                </div>
                <div className="col-12 col-sm-12 col-md-3 col-lg-3">
                  <div className="display-table">
                    <div className="display-table-cell footer-newsletter">
                      <form action="#" method="post">
                        <label className="h4">Newsletter</label>
                        <p>
                          Be the first to hear about new trending and offers and
                          see how you've helped.
                        </p>
                        <div className="input-group">
                          <input
                            type="email"
                            className="input-group__field newsletter__input"
                            name="EMAIL"
                            value=""
                            placeholder="
                            Email address"
                            required=""
                            onChange={test}
                          />
                          <span className="input-group__btn">
                            <button
                              type="submit"
                              className="btn newsletter__submit"
                              name="commit"
                              id="Subscribe"
                            >
                              <span className="newsletter__submit-text--large">
                                Subscribe
                              </span>
                            </button>
                          </span>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-3 col-lg-3 contact-box">
                  <h4 className="h4">About Us</h4>
                  <p>
                    Belle – Responsive eCommerce Html Template with clean &amp;
                    modern design for your online fashion store and other web
                    shop.
                  </p>
                  <ul className="addressFooter">
                    <li className="email">
                      <i className="icon anm anm-envelope-l"></i>
                      <p>sales@yousite.com</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/*End Footer Links*/}
            <hr />
            <div className="footer-bottom">
              <div className="row">
                {/*Footer Copyright*/}
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 order-1 order-md-0 order-lg-0 order-sm-1 copyright text-sm-center text-md-left text-lg-left">
                  <span></span> <a href="templateshub.net">Templates Hub</a>
                </div>
                {/*End Footer Copyright*/}
                {/*Footer Payment Icon*/}
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 order-0 order-md-1 order-lg-1 order-sm-0 payment-icons text-right text-md-center">
                  <img src={safepayment} alt="Payment" />
                </div>
                {/*End Footer Payment Icon*/}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/*Scoll Top*/}
      <span id="site-scroll">
        <i className="icon anm anm-angle-up-r"></i>
      </span>

      {/*Quick View popup*/}
      <div className="modal fade quick-view-popup" id="content_quickview">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <div
                id="ProductSection-product-template"
                className="product-template__container prstyle1"
              >
                <div className="product-single">
                  {/* Start model close */}
                  <a
                    href="#"
                    data-dismiss="modal"
                    className="model-close-btn pull-right"
                    title="close"
                  >
                    <span className="icon icon anm anm-times-l"></span>
                  </a>
                  {/* End model close */}
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="product-details-img">
                        <div className="pl-20">
                          <img src={cameliaReversibleBig1} alt="" />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="product-single__meta">
                        <h2 className="product-single__title">
                          Product Quick View Popup
                        </h2>
                        <div className="prInfoRow">
                          <div className="product-stock">
                            {" "}
                            <span className="instock ">In Stock</span>{" "}
                            <span className="outstock hide">Unavailable</span>{" "}
                          </div>
                          <div className="product-sku">
                            SKU: <span className="variant-sku">19115-rdxs</span>
                          </div>
                        </div>
                        <p className="product-single__price product-single__price-product-template">
                          <span className="visually-hidden">Regular price</span>
                          <s id="ComparePrice-product-template">
                            <span className="money">$600.00</span>
                          </s>
                          <span className="product-price__price product-price__price-product-template product-price__sale product-price__sale--single">
                            <span id="ProductPrice-product-template">
                              <span className="money">$500.00</span>
                            </span>
                          </span>
                        </p>
                        <div className="product-single__description rte">
                          Belle is a minimalist modern eCommerce Html Template
                          that will give you and your customers a smooth
                          shopping experience which can be used for various
                          kinds of stores such as fashion,...
                        </div>

                        <form
                          method="post"
                          action="http://annimexweb.com/cart/add"
                          id="product_form_10508262282"
                          acceptCharset="UTF-8"
                          className="product-form product-form-product-template hidedropdown"
                          encType="multipart/form-data"
                        >
                          <div
                            className="swatch clearfix swatch-0 option1"
                            data-option-index="0"
                          >
                            <div className="product-form__item">
                              <label className="header">
                                Color: <span className="slVariant">Red</span>
                              </label>
                              <div
                                data-value="Red"
                                className="swatch-element color red available"
                              >
                                <input
                                  className="swatchInput"
                                  id="swatch-0-red"
                                  type="radio"
                                  name="option-0"
                                  value="Red"
                                  onChange={test}
                                />
                                <label
                                  className="swatchLbl color medium rectangle"
                                  htmlFor="swatch-0-red"
                                  style={{
                                    backgroundImage:
                                      "url(" +
                                      ".//assets/images/product-detail-page/variant1-1.jpg" +
                                      ")",
                                  }}
                                  title="Red"
                                ></label>
                              </div>
                              <div
                                data-value="Blue"
                                className="swatch-element color blue available"
                              >
                                <input
                                  className="swatchInput"
                                  id="swatch-0-blue"
                                  type="radio"
                                  name="option-0"
                                  value="Blue"
                                  onChange={test}
                                />
                                <label
                                  className="swatchLbl color medium rectangle"
                                  htmlFor="swatch-0-blue"
                                  style={{
                                    backgroundImage:
                                      "url(" +
                                      ".//assets/images/product-detail-page/variant1-2.jpg" +
                                      ")",
                                  }}
                                  title="Blue"
                                ></label>
                              </div>
                              <div
                                data-value="Green"
                                className="swatch-element color green available"
                              >
                                <input
                                  className="swatchInput"
                                  id="swatch-0-green"
                                  type="radio"
                                  name="option-0"
                                  value="Green"
                                  onChange={test}
                                />
                                <label
                                  className="swatchLbl color medium rectangle"
                                  htmlFor="swatch-0-green"
                                  style={{
                                    backgroundImage:
                                      "url(" +
                                      ".//assets/images/product-detail-page/variant1-3.jpg" +
                                      ")",
                                  }}
                                  title="Green"
                                ></label>
                              </div>
                              <div
                                data-value="Gray"
                                className="swatch-element color gray available"
                              >
                                <input
                                  className="swatchInput"
                                  id="swatch-0-gray"
                                  type="radio"
                                  name="option-0"
                                  value="Gray"
                                  onChange={test}
                                />
                                <label
                                  className="swatchLbl color medium rectangle"
                                  htmlFor="swatch-0-gray"
                                  style={{
                                    backgroundImage:
                                      "url(" +
                                      ".//assets/images/product-detail-page/variant1-4.jpg" +
                                      ")",
                                  }}
                                  title="Gray"
                                ></label>
                              </div>
                            </div>
                          </div>
                          <div
                            className="swatch clearfix swatch-1 option2"
                            data-option-index="1"
                          >
                            <div className="product-form__item">
                              <label className="header">
                                Size: <span className="slVariant">XS</span>
                              </label>
                              <div
                                data-value="XS"
                                className="swatch-element xs available"
                              >
                                <input
                                  className="swatchInput"
                                  id="swatch-1-xs"
                                  type="radio"
                                  name="option-1"
                                  value="XS"
                                  onChange={test}
                                />
                                <label
                                  className="swatchLbl medium rectangle"
                                  htmlFor="swatch-1-xs"
                                  title="XS"
                                >
                                  XS
                                </label>
                              </div>
                              <div
                                data-value="S"
                                className="swatch-element s available"
                              >
                                <input
                                  className="swatchInput"
                                  id="swatch-1-s"
                                  type="radio"
                                  name="option-1"
                                  value="S"
                                  onChange={test}
                                />
                                <label
                                  className="swatchLbl medium rectangle"
                                  htmlFor="swatch-1-s"
                                  title="S"
                                >
                                  S
                                </label>
                              </div>
                              <div
                                data-value="M"
                                className="swatch-element m available"
                              >
                                <input
                                  className="swatchInput"
                                  id="swatch-1-m"
                                  type="radio"
                                  name="option-1"
                                  value="M"
                                  onChange={test}
                                />
                                <label
                                  className="swatchLbl medium rectangle"
                                  htmlFor="swatch-1-m"
                                  title="M"
                                >
                                  M
                                </label>
                              </div>
                              <div
                                data-value="L"
                                className="swatch-element l available"
                              >
                                <input
                                  className="swatchInput"
                                  id="swatch-1-l"
                                  type="radio"
                                  name="option-1"
                                  value="L"
                                  onChange={test}
                                />
                                <label
                                  className="swatchLbl medium rectangle"
                                  htmlFor="swatch-1-l"
                                  title="L"
                                >
                                  L
                                </label>
                              </div>
                            </div>
                          </div>
                          {/* Product Action */}
                          <div className="product-action clearfix">
                            <div className="product-form__item--quantity">
                              <div className="wrapQtyBtn">
                                <div className="qtyField">
                                  <a className="qtyBtn minus" href="#">
                                    <i
                                      className="fa anm anm-minus-r"
                                      aria-hidden="true"
                                    ></i>
                                  </a>
                                  <input
                                    type="text"
                                    id="Quantity"
                                    name="quantity"
                                    value="1"
                                    className="product-form__input qty"
                                    onChange={test}
                                  />
                                  <a className="qtyBtn plus" href="#">
                                    <i
                                      className="fa anm anm-plus-r"
                                      aria-hidden="true"
                                    ></i>
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="product-form__item--submit">
                              <button
                                type="button"
                                name="add"
                                className="btn product-form__cart-submit"
                              >
                                <span>Add to cart</span>
                              </button>
                            </div>
                          </div>
                          {/* End Product Action */}
                        </form>
                        <div className="display-table shareRow">
                          <div className="display-table-cell">
                            <div className="wishlist-btn">
                              <a
                                className="wishlist add-to-wishlist"
                                href="#"
                                title="Add to Wishlist"
                              >
                                <i
                                  className="icon anm anm-heart-l"
                                  aria-hidden="true"
                                ></i>{" "}
                                <span>Add to Wishlist</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*End-product-single*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Popup */}
      <div className="newsletter-wrap" id="popup-container">
        <div id="popup-window">
          <a className="btn closepopup">
            <i className="icon icon anm anm-times-l"></i>
          </a>
          {/* Modal content*/}
          <div className="display-table splash-bg">
            <div className="display-table-cell width40">
              <img
                src={newsletter}
                alt="Join Our Mailing List"
                title="Join Our Mailing List"
              />{" "}
            </div>
            <div className="display-table-cell width60 text-center">
              <div className="newsletter-left">
                <h2>Join Our Mailing List</h2>
                <p>
                  Sign Up for our exclusive email list and be the first to know
                  about new products and special offers
                </p>
                <form action="#" method="post">
                  <div className="input-group">
                    <input
                      type="email"
                      className="input-group__field newsletter__input"
                      name="EMAIL"
                      value=""
                      placeholder="Email address"
                      required=""
                      onChange={test}
                    />
                    <span className="input-group__btn">
                      <button
                        type="submit"
                        className="btn newsletter__submit"
                        name="commit"
                        id="subscribeBtn"
                      >
                        {" "}
                        <span className="newsletter__submit-text--large">
                          Subscribe
                        </span>{" "}
                      </button>
                    </span>{" "}
                  </div>
                </form>
                <ul className="list--inline site-footer__social-icons social-icons">
                  <li>
                    <a className="social-icons__link" href="#" title="Facebook">
                      <i
                        className="fa fa-facebook-official"
                        aria-hidden="true"
                      ></i>
                    </a>
                  </li>
                  <li>
                    <a className="social-icons__link" href="#" title="Twitter">
                      <i className="fa fa-twitter" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      className="social-icons__link"
                      href="#"
                      title="Pinterest"
                    >
                      <i className="fa fa-pinterest" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      className="social-icons__link"
                      href="#"
                      title="Instagram"
                    >
                      <i className="fa fa-instagram" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a className="social-icons__link" href="#" title="YouTube">
                      <i className="fa fa-youtube" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a className="social-icons__link" href="#" title="Vimeo">
                      <i className="fa fa-vimeo" aria-hidden="true"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

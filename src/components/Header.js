import $ from "jquery";
import { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../store/auth-context";
import logo from "../images/jhen_logo.png";

const Header = (props) => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    $(window).scroll(function () {
      stickyHeader();
    });
  }, []);

  const stickyHeader = () => {
    if ($(window).width() > 1199) {
      if ($(window).scrollTop() > 145) {
        $(".header-wrap").addClass("stickyNav animated fadeInDown");
      } else {
        $(".header-wrap").removeClass("stickyNav fadeInDown");
      }
    }
  };

  const toCartDetail = () => {
    history.replace("/Cart");
  };

  const headerType = (props.type === "Home") ? "classicHeader" : "";
  const classes = `header-wrap ${headerType} animated d-flex`;

  return (
    <div className={classes}>
      <div className="container-fluid">
        <div className="row align-items-center">
          {/*Desktop Logo*/}
          <div className="logo col-md-2 col-lg-2 d-none d-lg-block">
            <Link to="/">
              <img
                src={logo}
                alt="Belle Multipurpose Html Template"
                title="Belle Multipurpose Html Template"
              />
            </Link>
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
                  <Link to="/About">
                    About Me <i className="anm anm-angle-down-l"></i>
                  </Link>
                </li>
                <li className="lvl1 parent megamenu">
                  <Link to="/ProductList">
                    Product List <i className="anm anm-angle-down-l"></i>
                  </Link>
                </li>
              </ul>
            </nav>
            {/*End Desktop Menu*/}
          </div>
          {/*Mobile Logo*/}
          <div className="col-8 col-sm-6 col-md-6 col-lg-2 d-block d-lg-none mobile-logo">
            <div className="logo">
              <Link to="/">
                <img
                  src={logo}
                  alt="Belle Multipurpose Html Template"
                  title="Belle Multipurpose Html Template"
                />
              </Link>
            </div>
          </div>
          {/*Mobile Logo*/}
          <div className="col-2 col-sm-3 col-md-3 col-lg-2">
            <div className="site-cart">
              <a
                className="site-header__cart"
                title="Cart"
                onClick={toCartDetail}
              >
                <i className="icon anm anm-bag-l"></i>
                <span
                  id="CartCount"
                  className="site-header__cart-count"
                  data-cart-render="item_count"
                >
                  {authCtx.cart.cartItems.length}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;

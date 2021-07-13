import product_H1 from "../images/product-images/home7-product1.jpg";
import product_H2 from "../images/product-images/home7-product2.jpg";
import product_H3 from "../images/product-images/home7-product3.jpg";
import product_H4 from "../images/product-images/home7-product4.jpg";
import product_H5 from "../images/product-images/home7-product5.jpg";
import product_H6 from "../images/product-images/home7-product6.jpg";

const ThreeColumnProducts = (props) => {
  return (
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
  );
};

export default ThreeColumnProducts;

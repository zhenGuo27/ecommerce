import product_H1 from "../images/product-images/home7-product1.jpg";
import product_H2 from "../images/product-images/home7-product2.jpg";
import product_H3 from "../images/product-images/home7-product3.jpg";
import product_H4 from "../images/product-images/home7-product4.jpg";
import product_H5 from "../images/product-images/home7-product5.jpg";
import product_H6 from "../images/product-images/home7-product6.jpg";

const ThreeColumnProducts = (props) => {
  const products = [
    {
      id: "clothing-1",
      title: "Clothing-1 product",
      img: product_H1,
      price: 173.6,
    },
    {
      id: "clothing-2",
      title: "Clothing-2 product",
      img: product_H2,
      price: 378.0,
    },
    {
      id: "clothing-3",
      title: "Clothing-3 product",
      img: product_H3,
      price: 278.6,
    },
    {
      id: "clothing-4",
      title: "Clothing-4 product",
      img: product_H4,
      price: 173.6,
    },
    {
      id: "clothing-5",
      title: "Clothing-5 product",
      img: product_H5,
      price: 378.0,
    },
    {
      id: "clothing-6",
      title: "Clothing-6 product",
      img: product_H6,
      price: 278.6,
    },
  ];

  const ProductsByIndex = (props) => {
    const filterData = props.data
      .filter((item, index) => {
        return index >= props.inintIndex;
      })
      .slice(0, 3);

    return filterData.map((item, index) => (
      <div className="grid__item" key={`threeColumn${index}`}>
        <div className="mini-list-item">
          <div className="mini-view_image">
            <a className="grid-view-item__link" href="#">
              <img
                className="grid-view-item__image "
                data-src={item.img}
                src={item.img}
                alt=""
              />
            </a>
          </div>
          <div className="details">
            <a className="grid-view-item__title" href="#">
              {item.title}
            </a>
            <div className="grid-view-item__meta">
              <span className="product-price__price">
                <span className="money">${item.price}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="section three-column-pro">
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-6 col-md-4 col-lg-4">
            <div className="section-header text-left">
              <h2 className="h2">Most Popular</h2>
            </div>
            <div className="grid">
              <ProductsByIndex data={products} inintIndex={0} />
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-4">
            <div className="section-header text-left">
              <h2 className="h2">Weekly Top Seller</h2>
            </div>
            <div className="grid">
              <ProductsByIndex data={products} inintIndex={3} />
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-4">
            <div className="section-header text-left">
              <h2 className="h2">Flash Sale</h2>
            </div>
            <div className="grid">
              <ProductsByIndex data={products} inintIndex={0} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeColumnProducts;

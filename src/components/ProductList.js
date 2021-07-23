import "jquery-ui-bundle";
import "jquery-ui-bundle/jquery-ui.min.css";

import { Fragment, useEffect, useState } from "react";
import PriceFilter from "./PriceFilter";
import { getProducts } from "./product-action";
import SizeSwatches from "./SizeSwatches";
import SidebarProducts from "./SidebarProducts";
import SidebarCategories from "./SidebarCategories";
import GridProducts from "./GridProducts";

const ProductList = (props) => {
  const [categories, setCategories] = useState([]);
  const [productData, setProducts] = useState([]);
  const [productSizes, setProductSizes] = useState([]);

  const getDistinctSizeAndColor = (data) => {
    let skus = [];
    for (let i = 0; i < data.products.length; i++) {
      skus = skus.concat(data.products[i].sku);
    }

    const size = [...new Set(skus.map((item) => item.size))];
    setProductSizes(size);
  };

  useEffect(() => {
    document.body.classList.add("template-collection");

    getCategories();
    getProducts(1).then((items) => {
      setProducts(items);
      getDistinctSizeAndColor(items);
    });
  }, []);

  const getCategories = async () => {
    const response = await fetch(
      "https://localhost:44396/Api/values/GetCategories"
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const data = await response.json();
    const reqItems = JSON.parse(data.content);
    const loadedItems = reqItems.slice();

    setCategories(loadedItems);
  };

  return (
    <Fragment>
      {/*Collection Banner*/}
      <div className="collection-header">
        <div className="collection-hero">
          <div className="collection-hero__image">
            <img
              className="blur-up lazyload"
              data-src="assets/images/cat-women2.jpg"
              src="assets/images/cat-women2.jpg"
              alt="Women"
              title="Women"
            />
          </div>
          <div className="collection-hero__title-wrapper">
            <h1 className="collection-hero__title page-width">
              Shop Grid 3 Column
            </h1>
          </div>
        </div>
      </div>
      {/*End Collection Banner*/}

      <div className="container">
        <div className="row">
          {/*Sidebar*/}
          <div className="col-12 col-sm-12 col-md-3 col-lg-3 sidebar filterbar">
            <div className="closeFilter d-block d-md-none d-lg-none">
              <i className="icon icon anm anm-times-l"></i>
            </div>
            <div className="sidebar_tags">
              <SidebarCategories data={categories}/>     
              <PriceFilter />
              <SizeSwatches title="Size" data={productSizes} />
              <SidebarProducts title="Popular Products" data={productData.products}/>
              
              {/*Banner*/}
              <div className="sidebar_widget static-banner">
                <img src="assets/images/side-banner-2.jpg" alt="" />
              </div>
              {/*Banner*/}
              {/*Information*/}
              <div className="sidebar_widget">
                <div className="widget-title">
                  <h2>Information</h2>
                </div>
                <div className="widget-content">
                  <p>
                    Use this text to share information about your brand with
                    your customers. Describe a product, share announcements, or
                    welcome customers to your store.
                  </p>
                </div>
              </div>
              {/*end Information*/}
            </div>
          </div>
          {/*End Sidebar*/}
          {/*Main Content*/}
          <div className="col-12 col-sm-12 col-md-9 col-lg-9 main-col">
            <div className="category-description">
              <h3>Category Description</h3>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing.
              </p>
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words, consectetur, from a Lorem
                Ipsum passage, and going through the cites of the word in
                classical literature, discovered the undoubtable source.
              </p>
            </div>
            <hr />
            <GridProducts />
            <hr className="clear" />
            <div className="pagination">
              <ul>
                <li className="active">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li className="next">
                  <a href="#">
                    <i className="fa fa-caret-right" aria-hidden="true"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/*End Main Content*/}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;

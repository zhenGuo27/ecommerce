import "jquery-ui-bundle";
import "jquery-ui-bundle/jquery-ui.min.css";

import { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PriceFilter from "./PriceFilter";
import { getProducts } from "../actions/product-action";
import SizeSwatches from "./SizeSwatches";
import SidebarProducts from "./SidebarProducts";
import SidebarCategories from "./SidebarCategories";
import GridProducts from "./GridProducts";
import { backendUrl } from "../actions/sharedConst";

const priceMin = 0;
const priceMax = 600;
const initCategory = 0;
const initTag = 0;

const ProductList = (props) => {
  const location = useLocation();
  const queries = new URLSearchParams(location.search)
  const category = queries.get("category");
  const tag = queries.get("tag");
  const inintFilter = {
    category: category !== null ? category : initCategory,
    tag: tag !== null ? tag : initTag,
    priceRange: [priceMin, priceMax],
    sizeRange: ["None","XS", "S", "M", "L", "XL"],
  };

  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [productData, setProducts] = useState([]);
  const [productFilter, setProductFilter] = useState(inintFilter);
  const [priceRange, setPriceRange] = useState([priceMin, priceMax]);
  const [sizeRange, setSizeRange] = useState(inintFilter.sizeRange);
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

    getProducts(1, "", 1, 6).then((items) => {
      setProducts(items);
      getDistinctSizeAndColor(items);
    });
  }, []);

  useEffect(()=> {
    // when url change update product data
    productFilterHandler();

    getCategories().then((items)=> {
      const updatedCategory = items.find(
        (item) => item.id === parseInt(category, 10)
      );
      if (updatedCategory) {
        setCurrentCategory(updatedCategory);
      }else{
        setCurrentCategory(null);
      }
    });
  }, [category, tag]);

  useEffect(()=> {
    productFilterHandler(); 
  }, [sizeRange, priceRange]);

  const productFilterHandler = () => {
    const filter = {
      category: category !== null ? parseInt(category, 10) : initCategory,
      tag: tag !== null ? parseInt(tag, 10) : initTag,
      priceRange: priceRange,
      sizeRange: sizeRange,
    }; 

    setProductFilter(filter);
  };

  const priceOnchangeHandler = (start, end) => {
    let updatedRange = [...priceRange];
    updatedRange[0] = start;
    updatedRange[1] = end;
    setPriceRange(updatedRange);
  };

  const sizeOnchangeHandler = (target) => {
    //if exist , remove , else add target
    let updatedRange = [...sizeRange];
    if (sizeRange.some((item) => item === target)) {
      const index = updatedRange.indexOf(target);
      if (index !== -1) {
        updatedRange.splice(index, 1);
      }
    } else {
      updatedRange.push(target);
    }

    setSizeRange(updatedRange);
  };

  const getCategories = async () => {
    const response = await fetch(
     backendUrl + "/Api/values/GetCategories"
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const data = await response.json();
    const reqItems = JSON.parse(data.content);
    const loadedItems = reqItems.slice();

    setCategories(loadedItems);
    return loadedItems;
  };


  let description = null;

  if(currentCategory) {
    description = <Fragment>
                    <h3>{currentCategory.title}</h3>
                    <p>{currentCategory.desc}</p>
                  </Fragment>;
  }

  return (
    <Fragment>
      {/*Collection Banner*/}
      <div className="collection-header">
        <div className="collection-hero">
          <div className="collection-hero__image">
          </div>
          <div className="collection-hero__title-wrapper">
            <h1 className="collection-hero__title page-width">
              Product List
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
              <SidebarCategories data={categories} />
              <PriceFilter
                priceMin={priceMin}
                priceMax={priceMax}
                change={priceOnchangeHandler}
              />
              <SizeSwatches
                title="Size"
                data={productSizes}
                selected={sizeRange}
                change={sizeOnchangeHandler}
              />
              <hr />
              <SidebarProducts
                title="Popular Products"
                data={productData.products}
              />

              {/*Banner*/}
              <div className="sidebar_widget static-banner">
                <img src={require("../images/ProductList/fashionModel.jpg").default} alt="sidebar image" />
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
              {description}
            </div>
            <hr />
            <GridProducts filter={productFilter} />
          </div>
          {/*End Main Content*/}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;

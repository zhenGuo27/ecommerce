import { useState } from "react";
import { useHistory } from "react-router-dom";
import { getProductByTagId } from "../actions/product-action";

const column1Tag = {
  categoryId: 1,
  tagId: 1
};

const column2Tag = {
  categoryId: 2,
  tagId: 1
};

const column3Tag = {
  categoryId: 3,
  tagId: 1
};

const ThreeColumnProducts = (props) => {
  const history = useHistory();
  const [column1Data, setcolumn1Data] = useState([]);
  const [column2Data, setcolumn2Data] = useState([]);
  const [column3Data, setcolumn3Data] = useState([]);

  useState(()=> {
    getProductByTagId(column1Tag.categoryId, column1Tag.tagId, 3).then((items)=> {
      setcolumn1Data(items); 
    });
  }, [column1Tag]);

  useState(()=> {
    getProductByTagId(column2Tag.categoryId, column2Tag.tagId, 3).then((items)=> {
      setcolumn2Data(items); 
    });
  }, [column1Data]);

  useState(()=> {
    getProductByTagId(column3Tag.categoryId, column3Tag.tagId, 3).then((items)=> {
      setcolumn3Data(items); 
    });
  }, [column2Data]);

  const toProduct = (id) => {
    history.replace("/Product/" + id);
  };

  const ProductsByIndex = (props) => {
    const filterData = props.data
      .filter((item, index) => {
        return index >= props.inintIndex;
      })
      .slice(0, 3);

    return filterData.map((item, index) => (
      <div className="grid__item cursorPointer" key={`threeColumn${index}`} onClick={toProduct.bind(null, item.id)}>
        <div className="mini-list-item">
          <div className="mini-view_image">
            <a className="grid-view-item__link">
              <img
                className="grid-view-item__image "
                data-src={require("../" + item.largeImgs[0].src).default}
                src={require("../" + item.largeImgs[0].src).default}
                alt={item.title}
              />
            </a>
          </div>
          <div className="details">
            <a className="grid-view-item__title">
              {item.title}
            </a>
            <div className="grid-view-item__meta">
              <span className="product-price__price">
                <span className="money">${(item.sku[0].originalPrice * item.sku[0].discount).toFixed(2)}</span>
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
              <ProductsByIndex data={column1Data} inintIndex={0} />
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-4">
            <div className="section-header text-left">
              <h2 className="h2">Weekly Top Seller</h2>
            </div>
            <div className="grid">
              <ProductsByIndex data={column2Data} inintIndex={0} />
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-4">
            <div className="section-header text-left">
              <h2 className="h2">Flash Sale</h2>
            </div>
            <div className="grid">
              <ProductsByIndex data={column3Data} inintIndex={0} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeColumnProducts;

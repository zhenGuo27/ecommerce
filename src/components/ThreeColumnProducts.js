import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getProductByTagId } from "../actions/product-action";
import { backendUrl, hostPath } from "../actions/sharedConst";

const columnTag = [
  {
    categoryId: 1,
    id: 1,
  },
  {
    categoryId: 2,
    id: 1,
  },
  {
    categoryId: 3,
    id: 1,
  }
];

const ThreeColumnProducts = (props) => {
  const history = useHistory();
  const [columnTagInfo, setColumnTagInfo] = useState([]);
  const [column1Data, setcolumn1Data] = useState([]);
  const [column2Data, setcolumn2Data] = useState([]);
  const [column3Data, setcolumn3Data] = useState([]);

  const getTags = async (reqTags) => {
    const response = await fetch(
      backendUrl + "/Api/values/GetMutipleTags?"+ new URLSearchParams({
        tags: JSON.stringify(reqTags) })
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const data = await response.json();
    const reqItems = JSON.parse(data.content);

    return reqItems;
  };

  useEffect(()=> {
    getTags(columnTag).then((items) => {
      console.log("Tags", items);
      setColumnTagInfo(items);
    });
  }, []);

  useEffect(() => {
    getProductByTagId(columnTag[0].categoryId, columnTag[0].id, 3).then(
      (items) => {
        setcolumn1Data(items);
      }
    );
  }, [columnTag[0]]);

  useEffect(() => {
    getProductByTagId(columnTag[1].categoryId, columnTag[1].id, 3).then(
      (items) => {
        setcolumn2Data(items);
      }
    );
  }, [column1Data]);

  useEffect(() => {
    getProductByTagId(columnTag[2].categoryId, columnTag[2].id, 3).then(
      (items) => {
        setcolumn3Data(items);
      }
    );
  }, [column2Data]);


  const toProduct = (id) => {
    history.replace(hostPath +"/Product/" + id);
  };

  const ProductsByIndex = (props) => {
    const filterData = props.data
      .filter((item, index) => {
        return index >= props.inintIndex;
      })
      .slice(0, 3);

    return filterData.map((item, index) => (
      <div
        className="grid__item cursorPointer"
        key={`threeColumn${index}`}
        onClick={toProduct.bind(null, item.id)}
      >
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
            <a className="grid-view-item__title">{item.title}</a>
            <div className="grid-view-item__meta">
              <span className="product-price__price">
                <span className="money">
                  $
                  {(item.sku[0].originalPrice * item.sku[0].discount).toFixed(
                    2
                  )}
                </span>
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
              <h2 className="h2">{columnTagInfo.length!==0 && columnTagInfo[0].title}</h2>
            </div>
            <div className="grid">
              <ProductsByIndex data={column1Data} inintIndex={0} />
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-4">
            <div className="section-header text-left">
            <h2 className="h2">{columnTagInfo.length!==0 && columnTagInfo[1].title}</h2>
            </div>
            <div className="grid">
              <ProductsByIndex data={column2Data} inintIndex={0} />
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-4">
            <div className="section-header text-left">
            <h2 className="h2">{columnTagInfo.length!==0 && columnTagInfo[2].title}</h2>
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

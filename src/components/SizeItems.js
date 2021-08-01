import { Fragment } from "react";
import { useEffect, useState } from "react";
import SizeItem from "./SizeItem";

const SizeItems = (props) => {
  const [productSize, setProductSize] = useState([]);

  useEffect(() => {
    if (Object.keys(props.data).length !== 0) {
      setProductSize([...new Set(props.data.sku.map((item) => item.size))]);
    }
  }, [props.data]);

  return (
    <Fragment>
      {productSize.map((item) => (
        <SizeItem key={item} value={item} selectedSize={props.selectedSize} change={props.change}/>
      ))}
    </Fragment>
  );
};

export default SizeItems;

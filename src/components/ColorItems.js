import { Fragment } from "react";
import { useEffect, useState } from "react";
import ColorItem from "./ColorItem";

const ColorItems = (props) => {
  const [productColors, setProductColors] = useState([]);

  useEffect(() => {
    if (Object.keys(props.data).length !== 0) {
       setProductColors([...new Set(props.data.sku.map((item) => item.color))]);
    }
  }, [props.data]);

  return (
    <Fragment>
      {productColors.map((item) => (
          <ColorItem
            key={item}
            value={item}
            available={props.currentSku.stock !== 0}
            skus={props.data.sku}
            smallImgs={props.data.smallImgs}
            selectedColor={props.selectedColor}
            change={props.change}
          />
        ))}
    </Fragment>
  );
};

export default ColorItems;

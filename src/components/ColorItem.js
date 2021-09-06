const ColorItem = (props) => {
  const available = props.available ? "available" : "";
  const classes = ` swatch-element color ${props.value
    .toString()
    .toLowerCase()} ${available}`;
  const sku = props.skus.filter((item) => item.color === props.value);
  const img = require("../" + props.smallImgs.filter((item) => item.skuId === sku[0].id)[0].src).default;
  const checked = props.value === props.selectedColor;

  return (
    <div
      data-value={props.value}
      className={classes}
      onClick={props.change.bind(null, props.value)}
    >
      <input
        className="swatchInput"
        id={`swatch-0-${props.value.toLowerCase()}`}
        type="radio"
        name="option-0"
        value={props.value}
        defaultChecked={checked}
      />
      <label
        className="swatchLbl color medium rectangle"
        htmlFor={`swatch-0-${props.value.toString().toLowerCase()}`}
        style={{
          backgroundImage: "url(" + img + ")",
        }}
        title={props.value}
      ></label>
    </div>
  );
};

export default ColorItem;

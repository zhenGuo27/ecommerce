const SizeItem = (props) => {
  const checked = props.value === props.selectedSize;

  return (
    <div
      data-value={props.value}
      className={`swatch-element ${props.value.toLowerCase()} available`}
      onClick={props.change.bind(null, props.value)}
    >
      <input
        className="swatchInput"
        id={`swatch-1-${props.value.toLowerCase()}`}
        type="radio"
        name="option-1"
        value={props.value}
        defaultChecked={checked}
      />
      <label
        className="swatchLbl medium rectangle"
        htmlFor={`swatch-1-${props.value.toLowerCase()}`}
        title={props.value}
      >
        {props.value}
      </label>
    </div>
  );
};

export default SizeItem;

const ReteItem = (props) => {
  if (props.index <= props.rate) {
    return <i className="font-13 fa fa-star"></i>;
  } else {
    return <i className="font-13 fa fa-star-o"></i>;
  }
};

const ProductRate = (props) => {
  const rate = [];
  for (let i = 1; i <= 5; i++) {
    rate.push(<ReteItem rate={props.rate} index={i} key={`rateItem${i}`} />);
  }

  return rate;
};

export default ProductRate;

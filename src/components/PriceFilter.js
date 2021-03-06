import $ from "jquery";
import "jquery-ui-bundle";
import "jquery-ui-bundle/jquery-ui.min.css";
import { useEffect } from "react";

const PriceFilter = (props) => {
  useEffect(() => {
    price_slider();
  }, []);

  const price_slider = () => {
    $("#slider-range").slider({
      range: true,
      min: props.priceMin,
      max: props.priceMax,
      values: [props.priceMin, props.priceMax],
      slide: function (event, ui) {
        const amountValue = "$" + ui.values[0] + " - $" + ui.values[1];
        $("#amount").val(amountValue);
        priceFilterInputOnchange(amountValue);
      },
      create: function (event, ui) {
        $("#amount").html($(this).slider("value"));
      },
    });

    setPriceInput(props.priceMin, props.priceMax);
  };

  const setPriceInput = (start, end) => {
    $("#amount").val("$" + start + " - $" + end);
  };

  const priceFilterInputOnchange=(value)=> {
    const valueSplit = value.split("-");
    let priceStart = parseInt(valueSplit[0].replace("$", "").trim(), 10);
    let priceEnd = parseInt(valueSplit[1].replace("$", "").trim(), 10);
    priceStart = priceStart < props.priceMin ? props.priceMin : priceStart;
    priceEnd = priceEnd > props.priceMax ? props.priceMax : priceEnd;

    $("#slider-range").slider("values", [priceStart, priceEnd]);
    setPriceInput(priceStart, priceEnd);

    props.change(priceStart, priceEnd);
  }

  const beforeInputOnchange = (event) => {
    const value = event.target.value;
    if (!value) {
      $("#slider-range").slider("values", [props.priceMin, props.priceMax]);
      setPriceInput(props.priceMin, props.priceMax);
      return;
    }

    priceFilterInputOnchange(value);
  };

  return (
    <div className="sidebar_widget filterBox filter-widget">
      <div className="widget-title">
        <h2>Price</h2>
      </div>
      <form action="#" method="post" className="price-filter">
        <div
          id="slider-range"
          className="ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"
        >
          <div className="ui-slider-range ui-widget-header ui-corner-all"></div>
          <span
            className="ui-slider-handle ui-state-default ui-corner-all"
            tabIndex="0"
          ></span>
          <span
            className="ui-slider-handle ui-state-default ui-corner-all"
            tabIndex="0"
          ></span>
        </div>
        <div className="row">
          <div className="col-6">
            <p className="no-margin">
              <input
                id="amount"
                type="text"
                onBlur={beforeInputOnchange}
                placeholder="$0 - $600"
              />
            </p>
          </div>          
        </div>
      </form>
    </div>
  );
};

export default PriceFilter;

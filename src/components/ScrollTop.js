import $ from "jquery";
import { useEffect } from "react";

const ScrollTop = (props) => {
  useEffect(() => {
    scroll_top();
  }, []);

  const scroll_top = () => {
    $("#site-scroll").on("click", function () {
      $("html, body").animate({ scrollTop: 0 }, 1000);
      return false;
    });
  };

  return (
    <span id="site-scroll">
      <i className="icon anm anm-angle-up-r"></i>
    </span>
  );
};

export default ScrollTop;

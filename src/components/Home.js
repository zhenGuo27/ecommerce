import { Fragment, useEffect } from "react";

import HomeSlider from "../components/HomeSlider";
import FeatureContent_ImgLeft from "../components/FeatureContent_ImgLeft";
import FeatureContent_ImgRight from "../components/FeatureContent_ImgRight";
import HomeProductSlider from "../components/HomeProductSlider";
import ThreeColumnProducts from "../components/ThreeColumnProducts";
import QuickViewPopup from "./QuickViewPopup";

import bnr1 from "../images/collection/home12-category-bnr1.jpg";
import bnr2 from "../images/collection/home12-category-bnr2.jpg";
import bnr3 from "../images/collection/home12-category-bnr3.jpg";

const Home = (props) => {
  useEffect(()=> {
    document.body.classList.add('template-index');
    document.body.classList.add('home12-category');
  }, []);

  return (
    <Fragment>
      <HomeSlider />
      <FeatureContent_ImgLeft
        img={bnr1}
        title="Hot hoodies jackets"
        subTitle="Cover up in style with Hot Jackets now only $50"
        btnText="SHOP $50 Jackets"
      />
      <FeatureContent_ImgRight
        img={bnr2}
        title="Shoes Collection"
        subTitle="Shoes we can't stop wearing!"
        btnText="Shop Now"
      />
      <HomeProductSlider />

      <FeatureContent_ImgLeft
        img={bnr3}
        title="Nuke New Arrivals"
        subTitle="Fresh arrivals are here to take over your closet!"
        btnText="Explore Now"
      />
      <ThreeColumnProducts />
      <QuickViewPopup />
    </Fragment>
  );
};

export default Home;

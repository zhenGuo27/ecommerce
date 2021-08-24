import { Fragment, useEffect } from "react";

import HomeSlider from "../components/HomeSlider";
import FeatureContent_ImgLeft from "../components/FeatureContent_ImgLeft";
import FeatureContent_ImgRight from "../components/FeatureContent_ImgRight";
import ProductSlider from "./ProductSlider";
import ThreeColumnProducts from "../components/ThreeColumnProducts";

import bnr1 from "../images/Home/ReactJs.png";
import bnr2 from "../images/Home/aspNet_C#.png";
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
        title="React JS"
        subTitle="前端使用 ReactJs"
        btnText="More"
      />
      <FeatureContent_ImgRight
        img={bnr2}
        title="ASP.NET MVC5 | C#"
        subTitle="後端使用 ASP.NET MVC5 與 C#"
        btnText="More"
      />
      {/* <ProductSlider title="Shop these looks" subtitle="Shop from hundreds of collections for a fashionable look."/>

      <FeatureContent_ImgLeft
        img={bnr3}
        title="Nuke New Arrivals"
        subTitle="Fresh arrivals are here to take over your closet!"
        btnText="Explore Now"
      /> */}
      <ThreeColumnProducts />
    </Fragment>
  );
};

export default Home;

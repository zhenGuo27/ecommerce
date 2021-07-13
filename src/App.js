import bnr1 from "./images/collection/home12-category-bnr1.jpg";
import bnr3 from "./images/collection/home12-category-bnr3.jpg";

import SearchFormDrawer from "./components/SearchFormDrawer";
import TopHeader from "./components/TopHeader";
import Header from "./components/Header";
import MobileMenu from "./components/MobileMenu";
import HomeSlider from "./components/HomeSlider";
import FeatureContent_ImgLeft from "./components/FeatureContent_ImgLeft";
import FeatureContent_ImgRight from "./components/FeatureContent_ImgRight";
import HomeProductSlider from "./components/HomeProductSlider";
import ThreeColumnProducts from "./components/ThreeColumnProducts";
import Footer from "./components/Footer.js";
import ScrollTop from "./components/ScrollTop";
import QuickViewPopup from "./components/QuickViewPopup";
import NewsletterPopup from "./components/NewsletterPopup";

function App() {
  return (
    <div classNameName="pageWrapper">
      <SearchFormDrawer />
      <TopHeader />
      <Header />
      <MobileMenu />

      {/*Body Content*/}
      <div id="page-content">
        <HomeSlider />
        <FeatureContent_ImgLeft
          img={bnr1}
          title="Hot hoodies jackets"
          subTitle="Cover up in style with Hot Jackets now only $50"
          btnText="SHOP $50 Jackets"
        />
        <FeatureContent_ImgRight />
        <HomeProductSlider />

        <FeatureContent_ImgLeft
          img={bnr3}
          title="Nuke New Arrivals"
          subTitle="Fresh arrivals are here to take over your closet!"
          btnText="Explore Now"
        />
        <ThreeColumnProducts />
      </div>

      <Footer />
      <ScrollTop />
      <QuickViewPopup />
      <NewsletterPopup />  
    </div>
  );
}

export default App;

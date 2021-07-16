import SearchFormDrawer from "./components/SearchFormDrawer";
import TopHeader from "./components/TopHeader";
import Header from "./components/Header";
import MobileMenu from "./components/MobileMenu";
import Footer from "./components/Footer.js";
import ScrollTop from "./components/ScrollTop";
import QuickViewPopup from "./components/QuickViewPopup";
import NewsletterPopup from "./components/NewsletterPopup";

import Home from "./components/Home";
import ProductList from "./components/ProductList";
import Product from "./components/Product";

function App() {
  const headerType = "ProductList";

  return (
    <div classNameName="pageWrapper">
      <SearchFormDrawer />
      <TopHeader />
      <Header type={headerType}/>
      <MobileMenu />

      <div id="page-content">
         {/* <Home /> */}
         {/* <Product /> */}
        <ProductList />
      </div>

      <Footer />
      <ScrollTop />
      <QuickViewPopup />
      <NewsletterPopup />
    </div>
  );
}

export default App;

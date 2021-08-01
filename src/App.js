import SearchFormDrawer from "./components/SearchFormDrawer";
import TopHeader from "./components/TopHeader";
import Header from "./components/Header";
import MobileMenu from "./components/MobileMenu";
import Footer from "./components/Footer.js";
import ScrollTop from "./components/ScrollTop";
import NewsletterPopup from "./components/NewsletterPopup";

import Home from "./components/Home";
import ProductList from "./components/ProductList";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgetPassword from "./components/ForgetPassword";

function App() {
  const headerType = "ProductList";

  return (
    <div className="pageWrapper">
      <SearchFormDrawer />
      <TopHeader />
      <Header type={headerType}/>
      <MobileMenu />

      <div id="page-content">
         {/* <Home /> */}
         {/* <Product id="clothing-1"/> */}
        <ProductList />
        {/* <ForgetPassword /> */}
      </div>

      <Footer />
      <ScrollTop />
      <NewsletterPopup />
    </div>
  );
}

export default App;

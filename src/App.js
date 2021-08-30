import { Route, Switch } from "react-router-dom";

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
import Cart from "./components/Deal/Cart";
import Checkout from "./components/Deal/Checkout";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import CartModal from "./components/Deal/CartModal";
import LoginModal from "./components/Deal/LoginModal";
import About from "./components/About";

function App() {
  const headerType = "ProductList";

  return (
    <div className="pageWrapper">
      <SearchFormDrawer />
      <TopHeader />
      <Header type={headerType} />
      <MobileMenu />

      <div id="page-content">
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/Register">
            <Register />
          </Route>
          <Route path="/ProductList">
             <ProductList />
          </Route>
          <Route path="/Product/:id">
            <Product />
          </Route>
          <Route path="/Cart">
            <Cart />
          </Route>
          <Route path="/Checkout">
            <Checkout />
          </Route>
          <Route path="/About">
            <About />
          </Route>
        </Switch>
      </div>

      <Footer />
      <ScrollTop />
      <NewsletterPopup />
      <CartModal />
      <LoginModal />
    </div>
  );
}

export default App;

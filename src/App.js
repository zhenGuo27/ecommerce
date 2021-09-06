import { Redirect, Route, Switch } from "react-router-dom";

import { hostPath } from "./actions/sharedConst";
import SearchFormDrawer from "./components/SearchFormDrawer";
import TopHeader from "./components/TopHeader";
import Header from "./components/Header";
import MobileMenu from "./components/MobileMenu";
import Footer from "./components/Footer.js";
import ScrollTop from "./components/ScrollTop";
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
import { Fragment } from "react";
import ForgetPassword from "./components/ForgetPassword";

function App() {
  const headerType = "ProductList";

  return (
    <Fragment>
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
            <Route path={hostPath + "/Login"}>
              <Login />
            </Route>
            <Route path={hostPath + "/ForgetPassword"}>
              <ForgetPassword />
            </Route>
            <Route path={hostPath + "/Register"}>
              <Register />
            </Route>
            <Route path={hostPath + "/ProductList"}>
              <ProductList />
            </Route>
            <Route path={hostPath + "/Product/:id"}>
              <Product />
            </Route>
            <Route path={hostPath + "/Cart"}>
              <Cart />
            </Route>
            <Route path={hostPath + "/Checkout"}>
              <Checkout />
            </Route>
            <Route path={hostPath + "/About"}>
              <About />
            </Route>
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </div>

        <ScrollTop />
        <CartModal />
        <LoginModal />
      </div>

      <Footer />
    </Fragment>
  );
}

export default App;

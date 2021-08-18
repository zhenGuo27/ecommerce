import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../store/auth-context";

const TopHeader = () => {  
  const authCtx = useContext(AuthContext);
  
  return (
    <div className="top-header">
      <div className="container-fluid">
        <div className="row">
          <div className="col-10 col-sm-8 col-md-5 col-lg-4">
            <p className="phone-no">
              <i className="anm anm-phone-s"></i> +440 0(111) 044 833
            </p>
          </div>
          <div className="col-sm-4 col-md-4 col-lg-4 d-none d-lg-none d-md-block d-lg-block">
            <div className="text-center">
              <p className="top-header_middle-text">
                Worldwide Express Shipping
              </p>
            </div>
          </div>
          <div className="col-2 col-sm-4 col-md-3 col-lg-4 text-right">
            <span className="user-menu d-block d-lg-none">
              <i className="anm anm-user-al" aria-hidden="true"></i>
            </span>
            <ul className="customer-links list-inline">
              <li>
                {!authCtx.isLoggedIn && <Link to="/Login">Login</Link>}
                {authCtx.isLoggedIn && <a onClick={authCtx.logout}>LogOut</a>}                
              </li>
              <li>
                {!authCtx.isLoggedIn && <Link to="/Register">Create Account</Link>}               
              </li>
              <Link to="/Product/clothing-1">Product clothing-1</Link>
              {/* <li>
                <a href="wishlist.html">Wishlist</a>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;

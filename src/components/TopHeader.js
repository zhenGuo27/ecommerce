import $ from "jquery";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { hostPath } from "../actions/sharedConst";
import AuthContext from "../store/auth-context";

const TopHeader = () => {  
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    userlink_dropdown();
  }, []);

  const userlink_dropdown = () => {
    $(".top-header .user-menu").on("click", function () {
      if ($(window).width() < 990) {
        $(this).next().slideToggle(300);
        $(this).parent().toggleClass("active");
      }
    });
  };
  
  return (
    <div className="top-header">
      <div className="container-fluid">
        <div className="d-flex justify-content-end">
          <span className="user-menu d-block d-lg-none">
            <i className="anm anm-user-al" aria-hidden="true"></i>
            <ul className="customer-links list-inline">
              <li>
                {!authCtx.isLoggedIn && (
                  <Link to={hostPath + "/Login"}>Login</Link>
                )}
                {authCtx.isLoggedIn && <a onClick={authCtx.logout}>LogOut</a>}
              </li>
              <li>
                {!authCtx.isLoggedIn && (
                  <Link to={hostPath + "/Register"}>Create Account</Link>
                )}
              </li>
            </ul>
          </span>
          <ul className="customer-links list-inline">
            <li>
              {!authCtx.isLoggedIn && (
                <Link to={hostPath + "/Login"}>Login</Link>
              )}
              {authCtx.isLoggedIn && <a onClick={authCtx.logout}>LogOut</a>}
            </li>
            <li>
              {!authCtx.isLoggedIn && (
                <Link to={hostPath + "/Register"}>Create Account</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;

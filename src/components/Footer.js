import $ from "jquery";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { hostPath } from "../actions/sharedConst";
import { checkEmail } from "../actions/user-action";

const Footer = (props) => {
const signUpNewsletterRef = useRef();
const [signUpNewsletterMsg, setSignUpNewsletterMsg] = useState("");

  useEffect(() => {
    footer_dropdown();
  }, []);

  const footer_dropdown = () => {
    $(".footer-links .h4").on("click", function () {
      if ($(window).width() < 766) {
        $(this).next().slideToggle();
        $(this).toggleClass("active");
      }
    });
  };

  const signUpNewsletterOnchangeHandler=(event)=> {
    setSignUpNewsletterMsg("");
  }

  const signUpNewsletterHandler = (event) => {
    event.preventDefault();

    if (!checkEmail(signUpNewsletterRef.current.value)) {
      setSignUpNewsletterMsg("Email is not valid");
    } else {
      setSignUpNewsletterMsg("Sign up Newsletter sucessfully !");

      setTimeout(() => {
        setSignUpNewsletterMsg("");
      }, 3000);
    }
  };

  return (
    <footer id="footer">
        <div className="newsletter-section">
            <div className="container">
                <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-7 w-100 d-flex justify-content-start align-items-center">
                            <div className="display-table">
                                <div className="display-table-cell footer-newsletter">
                                    <div className="section-header text-center">
                                        <label className="h2"><span>sign up for </span>newsletter</label>
                                    </div>
                                    <form method="post" onSubmit={signUpNewsletterHandler}>
                                        <div className="input-group">
                                            <input type="email" className="input-group__field newsletter__input" name="EMAIL" placeholder="Email address" required="" ref={signUpNewsletterRef} onChange={signUpNewsletterOnchangeHandler}/>
                                            <span className="input-group__btn">
                                                <button type="submit" className="btn newsletter__submit" name="commit" id="Subscribe"><span className="newsletter__submit-text--large">Subscribe</span></button>
                                            </span>
                                            {signUpNewsletterMsg.trim().length !== 0 && <p className="text-danger ml-4">{signUpNewsletterMsg}</p>}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-12 col-sm-12 col-md-12 col-lg-5 d-flex justify-content-end align-items-center">
                            <div className="footer-social">
                                <ul className="list--inline site-footer__social-icons social-icons">
                                    <li><a className="social-icons__link" href="#" target="_blank" title="Belle Multipurpose Bootstrap 4 Template on Facebook"><i className="icon icon-facebook"></i></a></li>
                                    <li><a className="social-icons__link" href="#" target="_blank" title="Belle Multipurpose Bootstrap 4 Template on Twitter"><i className="icon icon-twitter"></i> <span className="icon__fallback-text">Twitter</span></a></li>
                                    <li><a className="social-icons__link" href="#" target="_blank" title="Belle Multipurpose Bootstrap 4 Template on Pinterest"><i className="icon icon-pinterest"></i> <span className="icon__fallback-text">Pinterest</span></a></li>
                                    <li><a className="social-icons__link" href="#" target="_blank" title="Belle Multipurpose Bootstrap 4 Template on Instagram"><i className="icon icon-instagram"></i> <span className="icon__fallback-text">Instagram</span></a></li>
                                    <li><a className="social-icons__link" href="#" target="_blank" title="Belle Multipurpose Bootstrap 4 Template on Tumblr"><i className="icon icon-tumblr-alt"></i> <span className="icon__fallback-text">Tumblr</span></a></li>
                                    <li><a className="social-icons__link" href="#" target="_blank" title="Belle Multipurpose Bootstrap 4 Template on YouTube"><i className="icon icon-youtube"></i> <span className="icon__fallback-text">YouTube</span></a></li>
                                    <li><a className="social-icons__link" href="#" target="_blank" title="Belle Multipurpose Bootstrap 4 Template on Vimeo"><i className="icon icon-vimeo-alt"></i> <span className="icon__fallback-text">Vimeo</span></a></li>
                                </ul>
                            </div>
                        </div> */}
                    </div>
            </div>    
        </div>
        <div className="site-footer">
        	<div className="container">
     			{/*Footer Links*/}
            	<div className="footer-top">
                	<div className="row">
                    	<div className="col-12 col-sm-12 col-md-6 col-lg-6 footer-links">
                        	<h4 className="h4">Quick Shop</h4>
                            <ul>
                            	<li><Link to={{pathname: hostPath + "/ProductList", search: "?category=1&tag=1"}}>Web Development</Link></li>
                                <li><Link to={{pathname: hostPath + "/ProductList", search: "?category=2&tag=1"}}>其他</Link></li>
                                <li><Link to={{pathname: hostPath + "/ProductList", search: "?category=3&tag=1"}}>軟技能</Link></li>
                            </ul>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 footer-links">
                        	<h4 className="h4">Informations</h4>
                            <ul>
                            	<li><Link to={hostPath + "/About"}>About Me</Link></li>                           
                            </ul>
                        </div>                      
                    </div>
                </div>
                {/*End Footer Links*/}
                <hr />
                <div className="footer-bottom">
                	<div className="row">
                    	{/*Footer Copyright*/}
	                	<div className="col-12 col-sm-12 col-md-6 col-lg-6 order-1 order-md-0 order-lg-0 order-sm-1 copyright text-sm-center text-md-left text-lg-left"><span></span> <Link to="/">JHEN</Link></div>
                        {/*End Footer Copyright*/}
                    </div>
                </div>
            </div>
        </div>
    </footer>
  );
};

export default Footer;

import newsletter from "../images/newsletter-img.jpg";

const NewsletterPopup = (props) => {
  const inputOnChangeHandler = () => {};

  return (
    <div className="newsletter-wrap" id="popup-container">
      <div id="popup-window">
        <a className="btn closepopup">
          <i className="icon icon anm anm-times-l"></i>
        </a>
        {/* Modal content*/}
        <div className="display-table splash-bg">
          <div className="display-table-cell width40">
            <img
              src={newsletter}
              alt="Join Our Mailing List"
              title="Join Our Mailing List"
            />{" "}
          </div>
          <div className="display-table-cell width60 text-center">
            <div className="newsletter-left">
              <h2>Join Our Mailing List</h2>
              <p>
                Sign Up for our exclusive email list and be the first to know
                about new products and special offers
              </p>
              <form action="#" method="post">
                <div className="input-group">
                  <input
                    type="email"
                    className="input-group__field newsletter__input"
                    name="EMAIL"
                    value=""
                    placeholder="Email address"
                    required=""
                    onChange={inputOnChangeHandler}
                  />
                  <span className="input-group__btn">
                    <button
                      type="submit"
                      className="btn newsletter__submit"
                      name="commit"
                      id="subscribeBtn"
                    >
                      {" "}
                      <span className="newsletter__submit-text--large">
                        Subscribe
                      </span>{" "}
                    </button>
                  </span>{" "}
                </div>
              </form>
              <ul className="list--inline site-footer__social-icons social-icons">
                <li>
                  <a className="social-icons__link" href="#" title="Facebook">
                    <i
                      className="fa fa-facebook-official"
                      aria-hidden="true"
                    ></i>
                  </a>
                </li>
                <li>
                  <a className="social-icons__link" href="#" title="Twitter">
                    <i className="fa fa-twitter" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a className="social-icons__link" href="#" title="Pinterest">
                    <i className="fa fa-pinterest" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a className="social-icons__link" href="#" title="Instagram">
                    <i className="fa fa-instagram" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a className="social-icons__link" href="#" title="YouTube">
                    <i className="fa fa-youtube" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a className="social-icons__link" href="#" title="Vimeo">
                    <i className="fa fa-vimeo" aria-hidden="true"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPopup;

import bnr2 from "../images/collection/home12-category-bnr2.jpg";

const FeatureContent_ImgRight = () => {
  return (
    <div className="section feature-content">
      <div className="container">
        <div className="row">
          <div className="feature-row">
            <div className="col-12 col-sm-12 col-md-6 feature-row__item feature-row__text feature-row__text--right text-right">
              <div className="row-text">
                <h2 className="h2">Shoes Collection</h2>
                <p>Shoes we can't stop wearing!</p>
                <a href="#" className="btn">
                  Shop Now
                </a>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 feature-row__item text-center">
              <img
                className=""
                data-src={bnr2}
                src={bnr2}
                alt="Shoes Collection"
                title="Shoes Collection"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureContent_ImgRight;

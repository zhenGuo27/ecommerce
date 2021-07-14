const FeatureContent_ImgRight = (props) => {
  return (
    <div className="section feature-content">
      <div className="container">
        <div className="row">
          <div className="feature-row">
            <div className="col-12 col-sm-12 col-md-6 feature-row__item feature-row__text feature-row__text--right text-right">
              <div className="row-text">
                <h2 className="h2">{props.title}</h2>
                <p>{props.subTitle}</p>
                <a href="#" className="btn">
                  {props.btnText}
                </a>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 feature-row__item text-center">
              <img
                className=""
                data-src={props.img}
                src={props.img}
                alt={props.title}
                title={props.title}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureContent_ImgRight;

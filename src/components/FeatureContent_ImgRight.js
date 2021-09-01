import { useHistory } from "react-router-dom";
import { hostPath } from "../actions/sharedConst";

const FeatureContent_ImgRight = (props) => {
  const history = useHistory();
  const toAbout =()=> {
    history.replace(hostPath + "/About");
  };

  return (
    <div className="section feature-content">
      <div className="container">
        <div className="row">
          <div className="feature-row">
            <div className="col-12 col-sm-12 col-md-6 feature-row__item feature-row__text feature-row__text--right text-right">
              <div className="row-text">
                <h2 className="h2">{props.title}</h2>
                <p>{props.subTitle}</p>
                <a href="" className="btn cursorPointer" onClick={toAbout}>
                  {props.btnText}
                </a>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 feature-row__item text-center">
              <img
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

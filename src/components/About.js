import { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { hostPath } from "../actions/sharedConst";

const About = (props) => {
  const history = useHistory();
  const toCategoryList = (categoryId, tagId) => {
    history.push(
      hostPath + "/ProductList?category=" + categoryId + "&tag=" + tagId
    );
  };


  return (
    <Fragment>
      <div className="page section-header text-center">
        <div className="page-title">
          <div className="wrapper">
            <h1 className="page-width">About Me</h1>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 main-col">
            <div className="text-center mb-4">
              <p>這個購物網站由前端 ReactJs 並串接後端 ASP.NET MVC 的 API 所組成</p>
              <p>我把過往工作中學到的技術與目前自學的 ReactJs 以及其他個人特質等，當作是商品放在網站中，在每個商品中闡述我個人的想法。</p>
              <p>我是一名網頁工程師，一直抱持著開放與謙虛的心態學習。</p>
              <h3 className="cursorPointer" style={{color: "#ff9500"}} onClick={toCategoryList.bind(null, 1,1)}>web development</h3>
              <ul style={{"listStyleType": "none"}}>
              <li>HTML5 / CSS3 /RWD</li>
              <li>Javascript / jQuery / Ajax</li>
              <li>ReactJs / webpack / npm</li>
              <li>ASP.NET MVC5 / C#</li>
              <li>SEO</li>
              </ul>
              <h3 className="cursorPointer" style={{color: "#ff9500"}} onClick={toCategoryList.bind(null, 2,1)}>其他</h3>
              <ul style={{"listStyleType": "none"}}>
              <li>Git / ToroiseGit</li>
              <li>子彈筆記思考整理術</li>
              <li>原子習慣</li>
              </ul>
              <h3 className="cursorPointer" style={{color: "#ff9500"}} onClick={toCategoryList.bind(null, 3,1)}>軟技能</h3>
              <ul style={{"listStyleType": "none"}}>
              <li>中文 / English</li>
              <li>創造力 / 觀察力</li>
              <li>效率 / 溝通</li>
              <li>耐心</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 mb-12">
            <img
              src={require("../images/About/about.jpg").default}
              alt="about"
            />
          </div>        
        </div>
        <div className="row">
          <div className="col-12">
           <p className="text-center mt-4">我喜歡用這簡單的方式解決問題。</p>
           <p className="text-center mb-4">寫程式的成就感不僅此是將功能做出來，而是真正解決一個問題。</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default About;

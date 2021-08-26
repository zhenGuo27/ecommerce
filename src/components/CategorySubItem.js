import { useHistory } from "react-router-dom";

const CategorySubItem = (props) => {
  const history = useHistory();

  const clickHandler = () => {
    history.push("/ProductList?category=" + props.categoryId + "&tag=" + props.id);
  };

  return (
    <li className="level2">
      <a className="site-nav" onClick={clickHandler}>
        {props.title}
      </a>
    </li>
  );
};

export default CategorySubItem;

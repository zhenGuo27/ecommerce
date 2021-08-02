import $ from "jquery";
import { useState } from "react";
import CategorySubItem from "./CategorySubItem";
import { useHistory } from "react-router-dom";

const CategoryItem = (props) => {
  const history = useHistory();
  const [itemClass, setItemClass] = useState([
    "site-nav",
    props.item.tags.length !== 0 ? "cursorPointer" : "",
  ]);

  const categoryClickHandler = () => {
    if (props.item.tags.length != 0) {
      const updatedClass = [...itemClass];
      if (updatedClass.includes("active")) {
        const targetIndex = updatedClass.indexOf("active");
        updatedClass.splice(targetIndex, 1);
      } else {
        updatedClass.push("active");
      }

      setItemClass(updatedClass);
      $(".sublinks_" + props.index).slideToggle("slow");
    } else {
      history.push("/?category=" + props.item.id);
    }
  };

  const subItems =
    props.item.tags.length !== 0 ? (
      <ul className={`sublinks_${props.index}`}>
        {props.item.tags.map((item) => (
          <CategorySubItem
            title={item.title}
            key={item.id}
            categoryId={props.item.id}
            id={item.id}
          />
        ))}
      </ul>
    ) : null;

  const classes = props.item.tags.length !== 0 ? "level1 sub-level" : "level1";

  return (
    <li className={classes}>
      <a className={itemClass.join(" ")} onClick={categoryClickHandler}>
        {props.item.title}
      </a>
      {subItems}
    </li>
  );
};

export default CategoryItem;
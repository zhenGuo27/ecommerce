import $ from "jquery";
import { useState } from "react";
import CategorySubItem from "./CategorySubItem";

const CategoryItem = (props) => {
  const [itemClass, setItemClass] = useState([
    "site-nav",
    props.item.tags.length !== 0 ? "cursorPointer" : "",
  ]);
  const categoryClickHandler = () => {
    const updatedClass = [...itemClass];
    if (updatedClass.includes("active")) {
      const targetIndex = updatedClass.indexOf("active");
      updatedClass.splice(targetIndex, 1);
    } else {
      updatedClass.push("active");
    }

    setItemClass(updatedClass);
    $(".sublinks_" + props.index).slideToggle("slow");
  };

  const subItems =
    props.item.tags.length !== 0 ? (
      <ul className={`sublinks_${props.index}`}>
        {props.item.tags.map((item) => (
          <CategorySubItem title={item.title} key={item.id} />
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

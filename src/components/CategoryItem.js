import $ from "jquery";
import { useEffect } from "react";
import CategorySubItem from "./CategorySubItem";

const CategoryItem = (props) => {
  let categoryInit = false;

  useEffect(() => {
    if (!categoryInit) {
      categoryInit = true;
      categories_level();
    }
  }, []);

  const categories_level = () => {
    $(".sidebar_categories .sub-level a").on("click", function () {
      console.log("click");
      $(this).toggleClass("active");
      $(this).next(".sublinks").slideToggle("slow");
    });
  };

  const subItems =
    props.item.tags.length !== 0 ? (
      <ul className="sublinks">
        {props.item.tags.map((item) => (
          <CategorySubItem title={item.title} key={item.id} />
        ))}
      </ul>
    ) : null;

  const classes = props.item.tags.length !== 0 ? "level1 sub-level" : "level1";

  return (
    <li className={classes}>
      <a href="#" className="site-nav">
        {props.item.title}
      </a>
      {subItems}
    </li>
  );
};

export default CategoryItem;

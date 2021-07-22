import CategoryItem from "./CategoryItem";

const SidebarCategories = (props) => {
  return (
    <div className="sidebar_widget categories filter-widget">
      <div className="widget-title">
        <h2>Categories</h2>
      </div>
      <div className="widget-content">
        <ul className="sidebar_categories">
          {props.data.map((item, index) => (
            <CategoryItem item={item} key={index} index={index}/>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SidebarCategories;

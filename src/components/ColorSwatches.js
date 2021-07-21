import { useState, useEffect } from "react";

const ColorSwarches = (props) => {
  const baseClass = "swacth-btn";
  const activeClass = "checked";
  const [itemClasses, setItemClasses] = useState([]);

  useEffect(() => {
    const initClasses = [];
    for (let i = 0; i < props.data.length; i++) {
      initClasses.push(i == 0 ? `${baseClass} ${activeClass}` : baseClass);
    }
    setItemClasses(initClasses);
  }, [props.data]);

  const itemClickHandler = (index) => {
    const checked = itemClasses[index].indexOf(activeClass) !== -1; 
    const updatedItemClasses = [...itemClasses];
    let splitClasses = updatedItemClasses[index].split(" ");
    if (checked) {
      const targetIndex = splitClasses.indexOf(activeClass);
      splitClasses.splice(targetIndex, 1);
    } else {
      splitClasses.push(activeClass);
    }
    updatedItemClasses[index] = splitClasses.join(" ");
    setItemClasses(updatedItemClasses);
  };

  return (
    <div className="sidebar_widget filterBox filter-widget">
      <div className="widget-title">
        <h2>{props.title}</h2>
      </div>
      <div className="filter-color swacth-list clearfix">
        {props.data.map((item, index) => {
          const colorClasses = itemClasses[index] + " " + item.toLowerCase();
          return <span className={colorClasses} key={item} onClick={itemClickHandler.bind(null, index)}></span>;
        })}
      </div>
    </div>
  );
};

export default ColorSwarches;

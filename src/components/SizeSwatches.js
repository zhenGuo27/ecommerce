import { useEffect, useState } from "react";

const SizeSwatches = (props) => {
  const baseClass = "swacth-btn";
  const activeClass = "swacth-btn checked";
  const [itemClasses, setItemClasses] = useState([]);

  useEffect(() => {
    const initClasses = [];
    for (let i = 0; i < props.data.length; i++) {
      initClasses.push(
        props.selected.some((item) => item === props.data[i])
          ? activeClass
          : baseClass
      );
    }
    setItemClasses(initClasses);
  }, [props.data]);

  const itemClickHandler = (index) => {
    const checked = itemClasses[index] === activeClass;
    const updatedItemClasses = [...itemClasses];
    if (checked) {
      updatedItemClasses[index] = baseClass;
    } else {
      updatedItemClasses[index] = activeClass;
    }
    setItemClasses(updatedItemClasses);
    props.change(props.data[index]);
  };

  return (
    <div className="sidebar_widget filterBox filter-widget size-swacthes">
      <div className="widget-title">
        <h2>{props.title}</h2>
      </div>
      <div className="filter-color swacth-list">
        <ul>
          {props.data.map((item, index) => {
            return (
              <li key={item}>
                <span
                  className={itemClasses[index]}
                  onClick={itemClickHandler.bind(null, index)}
                >
                  {item}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SizeSwatches;

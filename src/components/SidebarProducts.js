const SidebarProducts = (props) => {
  return (
    <div className="sidebar_widget">
      <div className="widget-title">
        <h2>{props.title}</h2>
      </div>
      <div className="widget-content">
        <div className="list list-sidebar-products">
          <div className="grid">
            {props.data &&
              props.data.map((item) => {
                return (
                  <div className="grid__item" key={item.id}>
                    <div className="mini-list-item">
                      <div className="mini-view_image">
                        <a className="grid-view-item__link" href="#">
                          <img
                            className="grid-view-item__image"
                            src={item.largeImgs[0].src}
                            alt={item.title}
                          />
                        </a>
                      </div>
                      <div className="details">
                        <a className="grid-view-item__title" href="#">
                          {item.title}
                        </a>
                        <div className="grid-view-item__meta">
                          <span className="product-price__price">
                            <span className="money">
                              $
                              {(
                                item.sku[0].originalPrice * item.sku[0].discount
                              ).toFixed(2)}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarProducts;

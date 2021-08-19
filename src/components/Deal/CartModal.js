import $ from "jquery";

const CartModal = () => {
  const cartModalHandler = () => {
    $("#cartModal").modal("hide");
  };

  return (
    <div
      id="cartModal"
      className="modal"
      tabIndex="-1"
      role="dialog"
      data-backdrop="static"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Cart</h5>
          </div>
          <div className="modal-body">
            <p>Add the item sucessfully !!!</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={cartModalHandler}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;

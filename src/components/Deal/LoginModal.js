import $ from "jquery";
import "bootstrap";

const LoginModal = () => {
  const modalHandler = () => {
    $("#loginModal").modal("hide");
  };

  return (
    <div
      id="loginModal"
      className="modal"
      tabIndex="-1"
      role="dialog"
      data-backdrop="static"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Login</h5>
          </div>
          <div className="modal-body">
            <p>Please log in</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={modalHandler}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

import userEvent from "@testing-library/user-event";
import { Fragment, useContext, useRef } from "react";
import { backendUrl } from "../actions/sharedConst";
import AuthContext from "../store/auth-context";

const ForgetPassword = (props) => {
  const authCtx = useContext(AuthContext);
  const emailRef = useRef();
  const newPwRef = useRef();
  const confirmPwRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();

    if (newPwRef.current.value.trim() !== confirmPwRef.current.value.trim()) {
      return false;
    }

    const response = await fetch(backendUrl + "/Api/values/UpdateUserInfo", {
      method: "POST",
      body: JSON.stringify({
        uid: authCtx.uid,
        //email: emailRef.current.value,
        newPassword: newPwRef.current.value.trim(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
  
    const data = await response.json();
  };

  return (
    <Fragment>
      {/*Page Title*/}
      <div class="page section-header text-center">
        <div class="page-title">
          <div class="wrapper">
            <h1 class="page-width">Reset Password</h1>
          </div>
        </div>
      </div>
      {/*End Page Title*/}

      <div class="container">
        <div class="row">
          <div class="col-12 col-sm-12 col-md-6 col-lg-6 main-col offset-md-3">
            <div class="mb-4">
              <form
                method="post"
                action="#"
                id="CustomerLoginForm"
                accept-charset="UTF-8"
                class="contact-form"
                onSubmit={submitHandler}
              >
                <div class="row">
                  <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="form-group">
                      <label for="CustomerEmail">Email</label>
                      <input
                        type="email"
                        name="customer[email]"
                        placeholder=""
                        id="CustomerEmail"
                        class=""
                        autocorrect="off"
                        autocapitalize="off"
                        autofocus=""
                        ref={emailRef}
                      />
                    </div>
                  </div>
                  <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="form-group">
                      <label for="newPassword">New Password</label>
                      <input
                        type="password"
                        name="customer[new_password]"
                        placeholder=""
                        id="newPassword"
                        ref={newPwRef}
                      />
                    </div>
                  </div>
                  <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="form-group">
                      <label for="newPasswordConfirm">
                        New Password Confirm
                      </label>
                      <input
                        type="password"
                        name="customer[new_password_confirm]"
                        placeholder=""
                        id="newPasswordConfirm"
                        ref={confirmPwRef}
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="text-center col-12 col-sm-12 col-md-12 col-lg-12">
                    <input type="submit" class="btn mb-3" value="Submit" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgetPassword;

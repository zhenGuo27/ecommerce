import { Fragment } from "react";

const ForgetPassword = (props) => {
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

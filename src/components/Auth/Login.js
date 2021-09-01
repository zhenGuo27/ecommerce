import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { backendUrl, hostPath } from "../../actions/sharedConst";

const Login = (props) => {
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [submitMsg, setSubmitMsg] = useState("");
  const authCtx = useContext(AuthContext);

  const submitHandler = async (event) => {
    event.preventDefault();

    const response = await fetch(backendUrl + "/Api/values/SignIn", {
      method: "POST",
      body: JSON.stringify({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("post response", response);
  
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
  
    const data = await response.json();
    if (data.returnCode == -1) {
      setSubmitMsg(data.content);
    } else {
      const responseData = JSON.parse(data.content);
      console.log("responseData", responseData);

      const expirationTime = new Date(
        new Date().getTime() + responseData.expiration * 1000
      );
      authCtx.login(responseData.uid, responseData.token, expirationTime);
      setSubmitMsg("Successfully !!!");
      history.replace(hostPath);
    }
  };

  const toRegister = () => {
    history.replace(hostPath + "/Register");
  };

  return (
    <Fragment>
      {/*Page Title*/}
      <div className="page section-header text-center">
        <div className="page-title">
          <div className="wrapper">
            <h1 className="page-width">Login</h1>
          </div>
        </div>
      </div>
      {/*End Page Title*/}

      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-6 col-lg-6 main-col offset-md-3">
            <div className="mb-4">
              <form
                method="post"
                action="#"
                id="CustomerLoginForm"
                acceptCharset="UTF-8"
                className="contact-form"
                onSubmit={submitHandler}
              >
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="form-group">
                      <label htmlFor="CustomerEmail">Email</label>
                      <input
                        type="email"
                        name="customer[email]"
                        placeholder=""
                        id="CustomerEmail"
                        className=""
                        autoCorrect="off"
                        autoCapitalize="off"
                        autoFocus=""
                        ref={emailRef}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="form-group">
                      <label htmlFor="CustomerPassword">Password</label>
                      <input
                        type="password"
                        name="customer[password]"
                        placeholder=""
                        id="CustomerPassword"
                        ref={passwordRef}
                      />
                    </div>
                  </div>
                </div>
                {submitMsg && <p className="text-danger">{submitMsg}</p>}
                <div className="row">
                  <div className="text-center col-12 col-sm-12 col-md-12 col-lg-12">
                    <input type="submit" className="btn mb-3" value="Sign In" />
                    <p className="mb-4">
                      <a onClick={toRegister} className="cursorPointer" id="customer_register_link">
                        Create account
                      </a>
                    </p>
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

export default Login;

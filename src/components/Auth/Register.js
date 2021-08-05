import { Fragment, useRef, useState } from "react";

const Register = (props) => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [submitMsg, setSubmitMsg] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();

    const response = await fetch("https://localhost:44396/Api/values/SignUp", {
      method: "POST",
      body: JSON.stringify({
        email: emailRef.current.value,
        password: passwordRef.current.value,
        name: firstNameRef.current.value + lastNameRef.current.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
  
    const data = await response.json();
    if (data.returnCode == -1) {
      setSubmitMsg(data.content);
    } else {
      setSubmitMsg("Successfully !!!");
    }
  };

  return (
    <Fragment>
      {/*Page Title*/}
      <div className="page section-header text-center">
        <div className="page-title">
          <div className="wrapper">
            <h1 className="page-width">Create an Account</h1>
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
                      <label htmlFor="FirstName">First Name</label>
                      <input
                        type="text"
                        name="customer[first_name]"
                        placeholder=""
                        id="FirstName"
                        ref={firstNameRef}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="form-group">
                      <label htmlFor="LastName">Last Name</label>
                      <input
                        type="text"
                        name="customer[last_name]"
                        placeholder=""
                        id="LastName"
                        ref={lastNameRef}
                      />
                    </div>
                  </div>
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
                    <input type="submit" className="btn mb-3" value="Create" />
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

export default Register;

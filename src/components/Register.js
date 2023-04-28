import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, TextField } from "@mui/material";
import { RegisterationSchema } from "../constants/validationSchema";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userRegistration } from "../redux/actions/UserActions";
import { toast } from "react-hot-toast";

const Register = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (values, { resetForm }) => {
    const userArr = users.filter((user) => user.email === values.email);
    console.log("same email id", userArr);

    if (userArr.length === 0) {
      dispatch(userRegistration(users, values));
      resetForm({ values: "" });
      toast.success("user regiteration successfully");
      navigate("/login");
    } else {
      toast.error("same email id is already registered");
    }
  };

  return (
    <>
      <section className="mt-5">
        <h1>Register</h1>
        <div className="container" style={{ maxWidth: "900px" }}>
          <Formik
            initialValues={{
              email: "",
              password: "",
              confirmPassword: "",
              firstName: "",
              lastName: "",
              mobile: "",
            }}
            validationSchema={RegisterationSchema}
            onSubmit={onSubmit}
          >
            {({ touched, errors, isSubmitting, values }) => (
              <Form
                className="form"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Field
                  sx={{ marginTop: "3rem" }}
                  as={TextField}
                  type="text"
                  name="firstName"
                  label="First Name"
                  autoComplete="off"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage
                  name="firstName"
                  className="error"
                  component="div"
                />
                <Field
                  sx={{ marginTop: "10px" }}
                  as={TextField}
                  type="text"
                  name="lastName"
                  label="Last Name"
                  autoComplete="off"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage
                  name="lastName"
                  className="error"
                  component="div"
                />
                <Field
                  sx={{ marginTop: "10px" }}
                  as={TextField}
                  type="email"
                  name="email"
                  label="Email"
                  autoComplete="off"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="email" className="error" component="div" />
                <Field
                  sx={{ marginTop: "10px" }}
                  as={TextField}
                  type="password"
                  name="password"
                  autoComplete="off"
                  label="Password"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage
                  name="password"
                  className="error"
                  component="div"
                />

                <Field
                  sx={{ marginTop: "10px" }}
                  as={TextField}
                  type="password"
                  name="confirmPassword"
                  label="Confirm Password"
                  autoComplete="off"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage
                  name="confirmPassword"
                  className="error"
                  component="div"
                />
                <Field
                  sx={{ marginTop: "10px" }}
                  as={TextField}
                  type="text"
                  name="mobile"
                  label="Mobile No."
                  autoComplete="off"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="mobile" className="error" component="div" />
                <Button
                  sx={{ marginTop: "10px" }}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Register
                </Button>

                <p>
                  Already have an account?
                  <Link to={"/login"}>Login</Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </>
  );
};

export default Register;

import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { Button, TextField } from "@mui/material";
import { LoginSchema } from "../constants/validationSchema";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogIn } from "../redux/actions/UserActions";
import { toast } from "react-hot-toast";
import bcrypt from "bcryptjs";

const Login = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const user = users.find((item) => item.email === values.email);
    console.log(user);
    const getHashedPassword = user.password;

    if (!user) {
      toast.error("Email is not in use");
      return;
    }

    bcrypt.compare(values.password, getHashedPassword, function (err, isMatch) {
      if (err) {
        toast.error("email does not match");
      } else if (!isMatch) {
        toast.error("Password not match");
      } else {
        dispatch(userLogIn(users, values));
        navigate("/products");
        toast.success("Login successfully");
      }
    });
  };

  return (
    <section className="mt-5">
      <h1>Login</h1>
      <div className="container" style={{ maxWidth: "900px" }}>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          <Form
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
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
              label="Password"
              autoComplete="off"
              variant="outlined"
              fullWidth
            />
            <ErrorMessage name="password" className="error" component="div" />
            <Button
              sx={{ marginTop: "10px" }}
              type="submit"
              variant="contained"
              color="primary"
            >
              Login
            </Button>
            <p>
              Don't have an account?
              <Link to={"/"}>register</Link>
            </p>
          </Form>
        </Formik>
      </div>
    </section>
  );
};

export default Login;

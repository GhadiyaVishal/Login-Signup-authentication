import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, TextField } from "@mui/material";
import { ChangePasswordSchema } from "../constants/validationSchema";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../redux/actions/UserActions";
import bcrypt from "bcryptjs";
import { toast } from "react-hot-toast";

const UpdatePassword = () => {
  const users = useSelector((state) => state.users);
  const currUser = useSelector((state) => state.logInUser);
  console.log("dugasudga", currUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const getPassword = currUser.password;
    console.log(getPassword);
    const currMatch = await bcrypt.compare(values.currPass, getPassword);
    if (currMatch) {
      const newPassMatch = await bcrypt.compare(values.newPass, getPassword);
      if (newPassMatch) {
        toast.error("Password is same as previous");
      } else {
        dispatch(changePassword(users, currUser.id, values));
        navigate("/products");
        toast.success("Password updated successfuly");
      }
    } else {
      toast.error("Current password is incorrect");
    }
  };

  return (
    <>
      <section className="mt-5">
        <h1>Change password</h1>
        <div className="container" style={{ maxWidth: "900px" }}>
          <div className="row">
            <div className="col-lg-12">
              <Formik
                // enableReinitialize={true}
                initialValues={{
                  currPass: "",
                  newPass: "",
                  confirmPassword: "",
                }}
                validationSchema={ChangePasswordSchema}
                onSubmit={onSubmit}
              >
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
                    sx={{ marginTop: "10px" }}
                    as={TextField}
                    type="password"
                    name="currPass"
                    label="Current Password"
                    autoComplete="off"
                    variant="outlined"
                    fullWidth
                  />
                  <ErrorMessage
                    name="currPass"
                    className="error"
                    component="div"
                  />
                  <Field
                    sx={{ marginTop: "10px" }}
                    as={TextField}
                    type="password"
                    name="newPass"
                    label="New Password"
                    autoComplete="off"
                    variant="outlined"
                    fullWidth
                  />
                  <ErrorMessage
                    name="newPass"
                    className="error"
                    component="div"
                  />
                  <Field
                    sx={{ marginTop: "10px" }}
                    as={TextField}
                    type="password"
                    name="confirmPassword"
                    label="Confirm New Password"
                    autoComplete="off"
                    variant="outlined"
                    fullWidth
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    className="error"
                    component="div"
                  />

                  <Button
                    sx={{ marginTop: "10px" }}
                    type="submit"
                    variant="contained"
                    color="primary"
                    // disabled={isSubmitting}
                  >
                    submit
                  </Button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdatePassword;

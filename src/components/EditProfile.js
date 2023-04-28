import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, TextField } from "@mui/material";
import { EditProfileSchema } from "../constants/validationSchema";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { editUserProfile } from "../redux/actions/UserActions";
import { toast } from "react-hot-toast";

const EditProfile = () => {
  const users = useSelector((state) => state.users);
  const currUser = useSelector((state) => state.logInUser);
  console.log("currUser: ", currUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (values) => {
    const userWithSameEmail = users.filter(
      (user) => user.email === values.email
    );

    if (values.email !== currUser.email) {
      if (userWithSameEmail.length === 0) {
        dispatch(editUserProfile(users, values));
        toast.success("Details Updated Successfully...!!");
        navigate("/products");
      }
    } else {
      toast.error("Email is Already exists");
    }
  };

  return (
    <>
      <section>
        <h1>Edit Your Profile</h1>
        <div className="container" style={{ maxWidth: "900px" }}>
          <div className="row">
            <div className="col-lg-12">
              <Formik
                enableReinitialize={true}
                initialValues={{
                  ...currUser,
                }}
                validationSchema={EditProfileSchema}
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
                  <ErrorMessage
                    name="email"
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
                  <ErrorMessage
                    name="mobile"
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

                  <p>
                    Already have an account?
                    <Link to={"/login"}>Login</Link>
                  </p>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditProfile;

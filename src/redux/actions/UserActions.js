import {
  CHANGE_PASSWORD,
  EDIT_USER_PROFILE,
  GET_ALL_USERS,
  LOGOUT_USER,
  LOG_IN,
  REGISTER,
} from "../../constants/constant";
import { v4 as uuid } from "uuid";
import bcrypt from "bcryptjs";
import { toast } from "react-hot-toast";

export const GetAllUserData = () => {
  let usersData = JSON.parse(localStorage.getItem("users"));
  let authUser = JSON.parse(localStorage.getItem("authuser"));
  if (!usersData) {
    localStorage.setItem("users", JSON.stringify([]));
    usersData = [];
  }
  if (!authUser) {
    localStorage.setItem("authuser", JSON.stringify({ auth: false, user: {} }));
    authUser = {
      auth: false,
      user: {},
    };
  }
  return {
    type: GET_ALL_USERS,
    payload: {
      userData: usersData,
      logInUser: authUser.user,
      auth: authUser.auth,
    },
  };
};

export const userRegistration = (users, data) => {
  const id = uuid();
  const hashedPassword = bcrypt.hashSync(data.password, 10);

  let newUser = { ...data, id, password: hashedPassword };
  delete newUser.confirmPassword;

  let newData = [...users, { ...newUser }];
  localStorage.setItem("users", JSON.stringify(newData));
  localStorage.setItem(
    "authuser",
    JSON.stringify({ auth: true, user: { ...newUser } })
  );
  return {
    type: REGISTER,
    payload: {
      users: newData,
      currUser: newUser,
      auth: true,
    },
  };
};

export const userLogIn = (users, data) => {
  const loginData = users.filter((item) => item.email === data.email);

  localStorage.setItem(
    "authuser",
    JSON.stringify({ auth: true, user: { ...loginData[0] } })
  );

  return {
    type: LOG_IN,
    payload: {
      logInUser: { ...loginData[0] },
      auth: true,
    },
  };
};

export const editUserProfile = (users, values) => {
  const arr = users.map((data) => {
    return data.id === values.id ? { ...values } : data;
  });
  console.log("Arr:", arr);

  const updatedAuthUser = { auth: true, user: { ...values } };
  localStorage.setItem("users", JSON.stringify(arr));
  localStorage.setItem("authuser", JSON.stringify(updatedAuthUser));

  return {
    type: EDIT_USER_PROFILE,
    payload: {
      users: arr,
      currUser: values,
    },
  };
};

export const changePassword = (users, id, values) => {
  const hashedChangePassword = bcrypt.hashSync(values.newPass, 10);
  let updatePass = {};
  const arr = users.map((data) => {
    if (data.id === id) {
      updatePass = { ...data, password: hashedChangePassword };
      return updatePass;
    } else {
      return data;
    }
  });
  localStorage.setItem("users", JSON.stringify([...arr]));
  localStorage.setItem(
    "authuser",
    JSON.stringify({ auth: true, user: { ...updatePass } })
  );
  return {
    type: CHANGE_PASSWORD,
    payload: {
      users: arr,
      currUser: { ...updatePass },
      auth: true,
    },
  };
};

export const logoutUser = () => {
  localStorage.setItem("authuser", JSON.stringify({ auth: false, user: {} }));
  toast.success("Logout successfully");
  return {
    type: LOGOUT_USER,
    payload: {},
  };
};

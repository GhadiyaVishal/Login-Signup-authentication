import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import EditProfile from "./components/EditProfile";
import Login from "./components/Login";
import ProductList from "./components/ProductList";
import Register from "./components/Register";
import SingleProduct from "./components/SingleProduct";
import UpdatePassword from "./components/UpdatePassword";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import { GetAllUserData } from "./redux/actions/UserActions";

function App() {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(GetAllUserData());
  }, [dispatch]);

  return (
    <div className="App">
      <Toaster position="top-right" reverseOrder={false} />

      <Router>
        <Routes>
          <Route exact path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/editUser"
            element={
              <ProtectedRoute isAuth={authUser}>
                <EditProfile />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/changePassword"
            element={
              <ProtectedRoute isAuth={authUser}>
                <UpdatePassword />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/products"
            element={
              <ProtectedRoute isAuth={authUser}>
                <ProductList />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/products/:id"
            element={
              <ProtectedRoute isAuth={authUser}>
                <SingleProduct />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

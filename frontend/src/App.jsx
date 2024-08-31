import "./App.css";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "./actions/userActions.js";
import WebFont from "webfontloader";
import Home from "./components/Home/Home.jsx";
import Profile from "./components/User/Profile.jsx";
import Search from "./components/Product/Search.jsx";
import Products from "./components/Product/Products.jsx";
import Header from "./components/layout/Header/Header.jsx";
import Footer from "./components/layout/Footer/Footer.jsx";
import LoginSignUp from "./components/User/LoginSignUp.jsx";
import ResetPassword from "./components/User/ResetPassword.jsx";
import UpdateProfile from "./components/User/UpdateProfile.jsx";
import ForgotPassword from "./components/User/ForgotPassword.jsx";
import UpdatePassword from "./components/User/UpdatePassword.jsx";
import ProductDetails from "./components/Product/ProductDetails.jsx";
import UserOptions from "./components/layout/Header/UserOptions.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Shipping from "./components/Cart/Shipping.jsx";
import ConfirmOrder from "./components/Cart/ConfirmOrder.jsx";
import OrderSuccess from "./components/Cart/OrderSuccess.jsx";
import MyOrders from "./components/Order/MyOrders.jsx";
import OrderDetails from "./components/Order/OrderDetails.jsx";
import Dashboard from "./components/Admin/Dashboard.jsx";
import ProductList from "./components/Admin/ProductList.jsx";
import NewProduct from "./components/Admin/NewProduct.jsx";
import UpdateProduct from "./components/Admin/UpdateProduct.jsx";
import OrderList from "./components/Admin/OrderList.jsx";
import ProcessOrder from "./components/Admin/ProcessOrder.jsx";
import UsersList from "./components/Admin/UsersList.jsx";
import UpdateUser from "./components/Admin/UpdateUser.jsx";
import ProductReviews from "./components/Admin/ProductReviews.jsx";
import CreateCategory from "./components/Admin/CreateCategory.jsx";
import CategoryList from "./components/Admin/CategoryList.jsx";
import UpdateCategory from "./components/Admin/UpdateCategory.jsx";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    if (isAuthenticated === true) {
      dispatch(loadUser());
    }
  }, []);

  return (
    <>
      <Router>
        <Header />
        {/* {isAuthenticated && <UserOptions user={user} />} */}
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<LoginSignUp />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/me/update"
            element={
              <ProtectedRoute>
                <UpdateProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/password/update"
            element={
              <ProtectedRoute>
                <UpdatePassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shipping"
            element={
              <ProtectedRoute>
                <Shipping />
              </ProtectedRoute>
            }
          />
          <Route
            path="/success"
            element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order/:id"
            element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order/confirm"
            element={
              <ProtectedRoute>
                <ConfirmOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute isAdmin={true}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute isAdmin={true}>
                <ProductList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/product/new"
            element={
              <ProtectedRoute isAdmin={true}>
                <NewProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/product/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <UpdateProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute isAdmin={true}>
                <OrderList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/order/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <ProcessOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute isAdmin={true}>
                <UsersList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/user/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <UpdateUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reviews"
            element={
              <ProtectedRoute isAdmin={true}>
                <ProductReviews />
              </ProtectedRoute>
            }
          />
          {/* Route for creating a new category */}
          <Route
            path="/admin/category/new"
            element={
              <ProtectedRoute isAdmin={true}>
                <CreateCategory />
              </ProtectedRoute>
            }
          />

          {/* Route for viewing all categories */}
          <Route
            path="/admin/categories"
            element={
              <ProtectedRoute isAdmin={true}>
                <CategoryList />
              </ProtectedRoute>
            }
          />

          {/* Route for updating and deleting a category */}
          <Route
            path="/admin/category/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <UpdateCategory />
              </ProtectedRoute>
            }
          />
        </Routes>
        {/* <Footer /> */}
      </Router>
    </>
  );
}

export default App;

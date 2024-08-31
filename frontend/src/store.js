import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productReducer,
  productDetailsReducer,
  newReviewReducer,
  newProductReducer,
  productSReducres,
  productReviewsReducer,
  reviewReducer,
} from "./reducers/productReducers";

import {
  userReducers,
  profileReducer,
  forgotPasswordReducer,
  allUsersReducer,
  userDetailsReducer,
} from "./reducers/userReducers";

import { cartReducer } from "./reducers/cartRedures";
import {
  newOrderReducer,
  myOrdersReducer,
  orderDetailsReducer,
  allOrdersReducer,
  orderReducer,
} from "./reducers/orderReducer";
import { otpReducer } from "./reducers/otpReducers";

import {
  categoriesReducer,
  newCategoryReducer,
  categoryReducer,
  categoryDetailsReducer,
} from "./reducers/categoryReducers";

const reducer = combineReducers({
  products: productSReducres,
  productDetails: productDetailsReducer,
  user: userReducers,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  product: productReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,
  otp: otpReducer,
  newCategory: newCategoryReducer,
  editCategory: categoryReducer,
  allCategory: categoriesReducer,
  categoryDetails: categoryDetailsReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

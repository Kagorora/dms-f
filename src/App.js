import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/reusable/Header/Header";
import Footer from "./components/reusable/Footer/Footer";
import Buyer from "./components/buyer/Buyer";
import ProductDetails from "./components/productDetails/ProductDetails";
import Cart from "./components/cart/Cart.js";
import Login from "./components/login/Login.js";
import Register from "./components/register/Register.js";
import Profile from "./components/profile/Profile.js";
import Shipping from "./components/shipping/Shipping.js";
import Payment from "./components/paymentMethod/PaymentMethod.js";
import PlaceOrder from "./components/placeOrder/PlaceOrder.js";
import Order from "./components/order/Order.js";
import MyOrders from "./components/myOrders/MyOrders.js";
import Users from "./components/admin/Users.js";
import EditUserInfo from "./components/admin/EditUser.js";
import Products from "./components/admin/Products.js";

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/admin/products' component={Products} />
          <Route path='/admin/users' component={Users} />
          <Route path='/admin/user/:id/edit' component={EditUserInfo} />
          <Route path='/MyOrders' component={MyOrders} />
          <Route path='/order/:id' component={Order} />
          <Route path='/placeOrder' component={PlaceOrder} />
          <Route path='/payment' component={Payment} />
          <Route path='/shipping' component={Shipping} />
          <Route path='/profile' component={Profile} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} exact />
          <Route path='/product/:id' component={ProductDetails} />
          <Route path='/cart/:id?' component={Cart} />
          <Route path='/' component={Buyer} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;

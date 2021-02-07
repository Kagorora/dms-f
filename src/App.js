import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/reusable/Header/Header';
import Footer from './components/reusable/Footer/Footer';
import Buyer from './components/buyer/Buyer';
import ProductDetails from './components/productDetails/ProductDetails';
import Cart from './components/cart/Cart.js';
import Login from './components/login/Login.js';
import Register from './components/register/Register.js'
import Profile from './components/profile/Profile.js';
import Shipping from './components/shipping/Shipping.js';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/shipping' component={Shipping} />
          <Route path='/profile' component={Profile} /> 
          <Route path='/register' component={Register}/>
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

import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/reusable/Header/Header";
import Footer from "./components/reusable/Footer/Footer";
import Buyer from "./components/buyer/Buyer";
import ProductDetails from "./components/productDetails/ProductDetails";

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={Buyer} exact />
          <Route path='/product/:id' component={ProductDetails} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;

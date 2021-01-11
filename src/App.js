import React from "react";
import { Container } from "react-bootstrap";
import Header from "./components/reusable/Header/Header";
import Footer from "./components/reusable/Footer/Footer";
import Buyer from "./components/buyer/Buyer";

const App = () => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <Buyer />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;

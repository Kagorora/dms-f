import React from "react";
import Header from "./components/reusable/Header/Header";
import Footer from "./components/reusable/Footer/Footer";
import { Container } from "react-bootstrap";

const App = () => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <h1>DMS</h1>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;

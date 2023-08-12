import React from "react";
import Container from "react-bootstrap/esm/Container";
import Header from "./Header";
import Footer from "./Footer";
import Cards from "../Components/Cards";

const Home = () => {
  return (
    <>
      <Header />
      <section id="cardsSection">
        <Container>
          <Cards />
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default Home;

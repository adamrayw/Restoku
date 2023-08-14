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
        <div className="head text-center text-black">
          <h2>Welcome Guests</h2>
          <h3>please choose the restaurant you are interested in</h3>
        </div>
        <Container>
          <Cards />
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default Home;

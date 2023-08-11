import React from "react";
import Container from "react-bootstrap/esm/Container";
import RestaurantList from "../Components/Cards";

const Home = () => {
  return (
    <section id="cardsSection">
      <Container>
        <RestaurantList />
      </Container>
    </section>
  );
};

export default Home;

import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import CardDetail from "../Components/CardDetail";

const DetailPage = () => {
  return (
    <>
      <Header />
      <section id="cardDetailSection">
        <div className="container">
          <CardDetail />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default DetailPage;

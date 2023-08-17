import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { getListRestaurants } from "../CONFIG/ApiConsume";

const mediumResolution = `https://restaurant-api.dicoding.dev/images/medium/`;

function Cards() {
  const [restaurants, setRestaurants] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  function truncateDescription(description, wordCount) {
    const words = description.split(" ");
    return words.length <= wordCount
      ? description
      : words.slice(0, wordCount).join(" ") + "...";
  }

  function RestaurantCard({ restaurant }) {
    const truncatedDescription = truncateDescription(
      restaurant.description,
      30
    );
    return (
      <Card className="rounded-3">
        <Card.Img
          className="cardimg"
          variant="top"
          src={`${mediumResolution}${restaurant.pictureId}`}
          alt={restaurant.name}
        />
        <Card.Body className="cards text-black">
          <Link className="cardLink" to={`/detail/${restaurant.id}`}>
            <Card.Title>{restaurant.name}</Card.Title>
          </Link>
          <div className="cityNrating d-flex justify-content-between">
            <h5 className="city">Kota: {restaurant.city}</h5>
            <h5 className="rating">Rating: {restaurant.rating}</h5>
          </div>
          <Card.Text>{truncatedDescription}</Card.Text>
        </Card.Body>
      </Card>
    );
  }

  useEffect(() => {
    async function fetchData() {
      const restaurantData = await getListRestaurants();
      setRestaurants(restaurantData);
    }
    fetchData();
  }, []);

  const filteredRestaurants = searchKeyword
    ? res.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchKeyword.toLowerCase())
      )
    : restaurants;

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Cari nama restoran..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </div>
      <Row>
        {filteredRestaurants.length === 0 ? (
          <p className="no-results">Tidak ada restoran yang ditemukan.</p>
        ) : (
          filteredRestaurants.map((restaurant) => (
            <Col key={restaurant.id} lg={4} md={6} sm={12} className="my-3">
              <RestaurantCard restaurant={restaurant} />
            </Col>
          ))
        )}
      </Row>
    </div>
  );
}

export default Cards;

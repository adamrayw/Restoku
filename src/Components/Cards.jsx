import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

const apiList = `https://restaurant-api.dicoding.dev/list`;
const mediumResolution = `https://restaurant-api.dicoding.dev/images/medium/`;

async function listRestaurant() {
  const res = await fetch(apiList);
  const data = await res.json();
  return data.restaurants;
}

function truncateDescription(description, wordCount) {
  const words = description.split(" ");
  if (words.length <= wordCount) {
    return description;
  }
  return words.slice(0, wordCount).join(" ") + "...";
}

function RestaurantCard({ restaurant }) {
  const truncatedDescription = truncateDescription(restaurant.description, 30);
  return (
    <Card>
      <Card.Img
        className="cardimg"
        variant="top"
        src={`${mediumResolution}${restaurant.pictureId}`}
        alt={restaurant.name}
      />
      <Card.Body>
        <Card.Title>{restaurant.name}</Card.Title>
        <div className="cityNrating d-flex justify-content-between">
          <h5 className="city">Kota: {restaurant.city}</h5>
          <h5 className="rating">Rating: {restaurant.rating}</h5>
        </div>
        <Card.Text>{truncatedDescription}</Card.Text>
        <Button variant="primary">View Details</Button>
      </Card.Body>
    </Card>
  );
}

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const restaurantData = await listRestaurant();
      setRestaurants(restaurantData);
    }
    fetchData();
  }, []);

  return (
    <Row>
      {restaurants.map((restaurant) => (
        <Col key={restaurant.id} lg={4} md={6} sm={12} className="my-3">
          <RestaurantCard restaurant={restaurant} />
        </Col>
      ))}
    </Row>
  );
}

export default RestaurantList;

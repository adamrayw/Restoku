// RestaurantDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";

const mediumResolution = "https://restaurant-api.dicoding.dev/images/medium/";

function CardDetail() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    async function fetchRestaurant() {
      const response = await fetch(
        `https://restaurant-api.dicoding.dev/detail/${id}`
      );
      const data = await response.json();
      setRestaurant(data.restaurant);
    }
    fetchRestaurant();
  }, [id]);

  if (!restaurant) {
    return <p>Loading...</p>;
  }

  return (
    <Card>
      <Card.Img
        variant="top"
        src={`${mediumResolution}${restaurant.pictureId}`}
        alt={restaurant.name}
      />
      <Card.Body>
        <Card.Title>{restaurant.name}</Card.Title>
        <h5>Kota: {restaurant.city}</h5>
        <h5>Rating: {restaurant.rating}</h5>
        <p>{restaurant.description}</p>
      </Card.Body>
    </Card>
  );
}

export default CardDetail;

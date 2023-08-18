// RestaurantDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { AiOutlineStar } from "react-icons/ai";
import { BsBookmarkStar, BsBookmarkStarFill } from "react-icons/bs";
import { getDetailRestaurant } from "../CONFIG/ApiConsume";

const mediumResolution = "https://restaurant-api.dicoding.dev/images/medium/";

function CardDetail() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [isBookmarkFilled, setIsBookmarkFilled] = useState(false);

  useEffect(() => {
    async function fetchRestaurant() {
      try {
        const restaurantData = await getDetailRestaurant(id);
        setRestaurant(restaurantData);
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
      }
    }
    fetchRestaurant();
  }, [id]);

  if (!restaurant) {
    return (
      <div className="text-center">
        <h1>Mohon Tunggu...</h1>;
      </div>
    );
  }

  const handleStarClick = () => {
    setIsBookmarkFilled(!isBookmarkFilled);
  };

  return (
    <Card className="rounded-3">
      {isBookmarkFilled ? (
        <BsBookmarkStarFill
          id="bookmarkFill"
          className="bookmarkPosition position-absolute end-0 text-black"
          size={50}
          onClick={handleStarClick}
        />
      ) : (
        <BsBookmarkStar
          id="bookmark"
          className="bookmarkPosition position-absolute end-0 text-black"
          size={50}
          onClick={handleStarClick}
        />
      )}
      <Card.Img
        variant="top"
        src={`${mediumResolution}${restaurant.pictureId}`}
        alt={restaurant.name}
      />
      <Card.Body className="cards">
        <Card.Title id="cardTitle">{restaurant.name}</Card.Title>
        <div className="kategori d-flex">
          <h5>Kategori: {restaurant.categories[0].name}</h5>
        </div>
        <div className="kotaDanRating">
          <h5>Kota: {restaurant.city}</h5>
          <h5>Address: {restaurant.address}</h5>
          <h5>
            Rating: {restaurant.rating} <AiOutlineStar />
          </h5>
        </div>
        <p>{restaurant.description}</p>
        <div className="menu d-flex justify-content-around my-3 rounded-3">
          <ul className="food">
            <div className="tengah">
              <h5>Makanan</h5>
            </div>
            {restaurant.menus.foods.map((food, index) => (
              <li key={index}>{food.name}</li>
            ))}
          </ul>
          <ul className="drinks">
            <div className="tengah">
              <h5>Minuman</h5>
            </div>
            {restaurant.menus.drinks.map((drink, index) => (
              <li key={index}>{drink.name}</li>
            ))}
          </ul>
        </div>
        <div className="review rounded-3">
          <div className="tengah text-center">
            <h5>Review</h5>
          </div>
          <p>nama: {restaurant.customerReviews[0].name}</p>
          <p>review: {restaurant.customerReviews[0].review}</p>
          <p>tanggal review: {restaurant.customerReviews[0].date}</p>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CardDetail;

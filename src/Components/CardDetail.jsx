/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { AiOutlineStar } from "react-icons/ai";
import { BsBookmarkStar, BsBookmarkStarFill } from "react-icons/bs";
import { getDetailRestaurant, postToApi } from "../CONFIG/ApiConsume";

const mediumResolution = "https://restaurant-api.dicoding.dev/images/medium/";

function CardDetail() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [isBookmarkFilled, setIsBookmarkFilled] = useState(false);
  const [review, setReview] = useState({
    name: "",
    review: "",
  });

  async function fetchRestaurant() {
    try {
      const restaurantData = await getDetailRestaurant(id);
      setRestaurant(restaurantData);
    } catch (error) {
      console.error("Error fetching restaurant details:", error);
    }
  }

  useEffect(() => {
    fetchRestaurant();
  }, [id]);

  const handleStarClick = () => {
    setIsBookmarkFilled(!isBookmarkFilled);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    // buat review object
    const reviewData = {
      id: id,
      name: review.name,
      review: review.review,
    };

    // import POST dari api consume
    const result = await postToApi(reviewData);

    if (result.success) {
      console.log("sukses");
      // update restaurant data
      fetchRestaurant();
      setReview({ name: "", review: "" }); // clear
    } else {
      console.error("gagal:", result.error);
    }
  };

  if (!restaurant) {
    return (
      <div className="text-center">
        <h1>Mohon Tunggu...</h1>
      </div>
    );
  }

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

        {/* Review Form */}
        <form onSubmit={handleReviewSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Your Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={review.name}
              onChange={(e) => setReview({ ...review, name: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="review" className="form-label">
              Your Review
            </label>
            <textarea
              className="form-control"
              id="review"
              name="review"
              rows="4"
              value={review.review}
              onChange={(e) => setReview({ ...review, review: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit Review
          </button>
        </form>
        {/* Display review */}
        <div className="review rounded-3 my-3">
          <div className="tengah text-center">
            <h5>Reviews</h5>
          </div>
          <Container>
            <Row>
              {restaurant.customerReviews.map((customerReview, index) => (
                <Col
                  key={index}
                  xs={12}
                  md={6}
                  lg={6}
                  className="justify-content-center my-5"
                >
                  <div>
                    <p>Name: {customerReview.name}</p>
                    <p>Review: {customerReview.review}</p>
                    <p>Date: {customerReview.date}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CardDetail;

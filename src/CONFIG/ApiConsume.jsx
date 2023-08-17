// const apiRestaurantList = `https://restaurant-api.dicoding.dev/list`;
// const apiRestaurantDetail = `https://restaurant-api.dicoding.dev/detail/`;

// async function getListRestaurants() {
//   const response = await fetch(apiRestaurantList);
//   const data = await response.json();
//   return data.restaurants;
// }

// async function getDetailRestaurant(id) {
//   const response = await fetch(`${apiRestaurantDetail}${id}`);
//   const data = await response.json();
//   return data.restaurant;
// }

// export { getListRestaurants, getDetailRestaurant };

// api.js
const baseUrl = "https://restaurant-api.dicoding.dev";

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function getListRestaurants() {
  const apiRestaurantList = `${baseUrl}/list`;
  const data = await fetchData(apiRestaurantList);
  return data.restaurants;
}

async function getDetailRestaurant(id) {
  const apiRestaurantDetail = `${baseUrl}/detail/${id}`;
  const data = await fetchData(apiRestaurantDetail);
  return data.restaurant;
}

export { getListRestaurants, getDetailRestaurant };

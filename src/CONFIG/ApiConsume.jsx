const baseUrl = "https://restaurant-api.dicoding.dev";

async function getListRestaurants() {
  const response = await fetch(`${baseUrl}/list`);
  const data = await response.json();
  return data.restaurants;
}

async function getDetailRestaurant(id) {
  const response = await fetch(`${baseUrl}/detail/${id}`);
  const data = await response.json();
  return data.restaurant;
}

export { getListRestaurants, getDetailRestaurant };

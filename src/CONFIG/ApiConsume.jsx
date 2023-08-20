const baseUrl = "https://restaurant-api.dicoding.dev";

async function postToApi(data) {
  try {
    const response = await fetch(`${baseUrl}/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!responseData.error) {
      return { success: true, data: responseData };
    } else {
      return { success: false, error: responseData.message };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}

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

export { postToApi, getListRestaurants, getDetailRestaurant };

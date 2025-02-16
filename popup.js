document.getElementById("new-suggestion").addEventListener("click", () => {
    fetchRestaurant();
});

document.getElementById("search").addEventListener("change", (event) => {
    let searchType = event.target.value;
    fetchRestaurant(searchType);
});

document.getElementById("new-suggestion").addEventListener("click", () => {
    window.location.href = "spin-the-wheel.html";
});

function fetchRestaurant(type = "trending") {
    let location = "San Francisco"; // Default location
    let query = type === "cuisine" ? "tacos" : "food";

    chrome.runtime.sendMessage(
        { action: "fetchRestaurants", location, term: query },
        (response) => {
            if (response.success) {
                displayRestaurant(response.data.businesses[0]); // Show the first trending restaurant
            } else {
                alert("Failed to fetch restaurants.");
            }
        }
    );
}

function displayRestaurant(restaurant) {
    if (!restaurant) return;

    let restaurantCard = document.querySelector(".restaurant-card");
    restaurantCard.innerHTML = `
        <img src="${restaurant.image_url}" alt="${restaurant.name}">
        <div class="info">
            <h3>${restaurant.name}</h3>
            <span class="rating">⭐ ${restaurant.rating}/5</span>
        </div>
    `;
}

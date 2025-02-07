// Check if the user is searching for restaurants on Google
if (window.location.href.includes("google.com/search?q=")) {
    let searchQuery = new URLSearchParams(window.location.search).get("q");

    if (searchQuery.toLowerCase().includes("best") || searchQuery.toLowerCase().includes("restaurants")) {
        let foodieButton = document.createElement("button");
        foodieButton.innerText = "🔍 Find Restaurants on Foodie Finder";
        foodieButton.style.position = "fixed";
        foodieButton.style.bottom = "20px";
        foodieButton.style.right = "20px";
        foodieButton.style.background = "#ff5733";
        foodieButton.style.color = "#fff";
        foodieButton.style.padding = "10px";
        foodieButton.style.border = "none";
        foodieButton.style.cursor = "pointer";
        foodieButton.style.zIndex = "1000";

        foodieButton.addEventListener("click", () => {
            chrome.runtime.sendMessage({ action: "fetchRestaurants", location: searchQuery, term: "food" }, (response) => {
                if (response.success) {
                    alert("Restaurants found! Open the extension popup for details.");
                } else {
                    alert("Failed to fetch restaurants.");
                }
            });
        });

        document.body.appendChild(foodieButton);
    }
}

function addFoodieButtons() {
    let restaurantLinks = document.querySelectorAll("a[href*='/biz/'], a[href*='/Restaurant_Review-']");

    restaurantLinks.forEach(link => {
        if (!link.dataset.foodieAdded) {
            let button = document.createElement("button");
            button.innerText = "🍽 Find on Foodie Finder";
            button.style.marginLeft = "10px";
            button.style.padding = "5px";
            button.style.background = "#ff5733";
            button.style.color = "#fff";
            button.style.border = "none";
            button.style.cursor = "pointer";
            button.addEventListener("click", (event) => {
                event.preventDefault();
                let restaurantName = link.innerText;
                chrome.runtime.sendMessage({ action: "fetchRestaurants", location: restaurantName, term: "food" });
                alert(`Searching for ${restaurantName} on Foodie Finder...`);
            });

            link.parentNode.appendChild(button);
            link.dataset.foodieAdded = "true"; // Prevent duplicate buttons
        }
    });
}

// Run on Yelp & TripAdvisor
if (window.location.href.includes("yelp.com") || window.location.href.includes("tripadvisor.com")) {
    setTimeout(addFoodieButtons, 3000);
}

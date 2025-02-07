document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.sync.get(["defaultLocation", "cuisineType", "maxResults"], (data) => {
        if (data.defaultLocation) {
            document.getElementById("location").value = data.defaultLocation;
        }

        document.getElementById("search").addEventListener("click", () => {
            const location = document.getElementById("location").value || data.defaultLocation;
            const term = data.cuisineType || "food";
            const maxResults = data.maxResults || 5;

            if (!location) {
                alert("Please enter a location!");
                return;
            }

            chrome.runtime.sendMessage(
                { action: "fetchRestaurants", location, term, maxResults },
                (response) => {
                    if (response.success) {
                        displayResults(response.data.businesses);
                    } else {
                        alert("Failed to fetch restaurants. Please try again.");
                    }
                }
            );
        });
    });
});

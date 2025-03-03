document.addEventListener("DOMContentLoaded", function () {
    const restaurantsList = document.getElementById("trending-restaurants");
    const barsList = document.getElementById("trending-bars");

    chrome.storage.sync.get("profile", function (data) {
        if (data.profile && data.profile.location) {
            fetchTrendingPlaces(data.profile.location, "restaurant", restaurantsList);
            fetchTrendingPlaces(data.profile.location, "bar", barsList);
        } else {
            alert("Please set your location in the Profile page.");
        }
    });

    function fetchTrendingPlaces(location, type, listElement) {
        const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=${type}&location=${location}&sort_by=rating&limit=5`;

        fetch(yelpUrl, {
            headers: {
                Authorization: `Bearer YOUR_YELP_API_KEY`,
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(`Trending ${type}s API Response:`, data);
            if (data.businesses && data.businesses.length > 0) {
                displayTrendingResults(data.businesses, listElement);
            } else {
                listElement.innerHTML = `<p>No trending ${type}s found.</p>`;
            }
        })
        .catch(error => {
            console.error(`Error fetching trending ${type}s:`, error);
            listElement.innerHTML = `<p>Error retrieving data. Try again later.</p>`;
        });
    }

    function displayTrendingResults(results, listElement) {
        listElement.innerHTML = "";
        results.forEach(place => {
            const li = document.createElement("li");
            li.innerHTML = `<h3>${place.name}</h3><p>${place.location.address1}</p><p>Rating: ${place.rating}⭐</p>`;
            listElement.appendChild(li);
        });
    }
});

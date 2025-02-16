chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "fetchRestaurants") {
        fetchRestaurants(request.location, request.term, sendResponse);
        return true;
    }
});

function fetchRestaurants(location, term, callback) {
    const YELP_API_KEY = "YOUR_YELP_API_KEY"; // Replace with your actual Yelp API key
    const url = `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&limit=1`;

    fetch(url, {
        headers: {
            Authorization: `Bearer ${YELP_API_KEY}`,
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => callback({ success: true, data }))
    .catch(error => callback({ success: false, error }));
}

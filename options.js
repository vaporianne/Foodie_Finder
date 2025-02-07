document.addEventListener("DOMContentLoaded", () => {
    // Load saved settings
    chrome.storage.sync.get(["defaultLocation", "cuisineType", "maxResults"], (data) => {
        if (data.defaultLocation) {
            document.getElementById("default-location").value = data.defaultLocation;
        }
        if (data.cuisineType) {
            document.getElementById("cuisine-type").value = data.cuisineType;
        }
        if (data.maxResults) {
            document.getElementById("max-results").value = data.maxResults;
        }
    });

    // Save settings when button is clicked
    document.getElementById("save").addEventListener("click", () => {
        const defaultLocation = document.getElementById("default-location").value;
        const cuisineType = document.getElementById("cuisine-type").value;
        const maxResults = document.getElementById("max-results").value;

        chrome.storage.sync.set(
            {
                defaultLocation,
                cuisineType,
                maxResults
            },
            () => {
                document.getElementById("status").textContent = "Settings saved!";
                setTimeout(() => {
                    document.getElementById("status").textContent = "";
                }, 2000);
            }
        );
    });
});

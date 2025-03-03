document.addEventListener("DOMContentLoaded", function () {
    const restaurantCheckbox = document.getElementById("restaurant-challenge");
    const barCheckbox = document.getElementById("bar-challenge");
    const forkCountElement = document.getElementById("fork-count");
    const challengeCompletedKey = `challengeCompleted-${new Date().getFullYear()}-${new Date().getMonth()}`; // Unique key per month
    
    // Load saved forks count and challenge status
    chrome.storage.sync.get(["forks", challengeCompletedKey], function (data) {
        forkCountElement.textContent = data.forks || 0;
        if (data[challengeCompletedKey]) {
            restaurantCheckbox.disabled = true;
            barCheckbox.disabled = true;
        }
    });
    
    function updateForkCount() {
        chrome.storage.sync.get(["forks", challengeCompletedKey], function (data) {
            let forks = data.forks || 0;
            if (!data[challengeCompletedKey]) {
                forks += 1;
                chrome.storage.sync.set({ "forks": forks }, function () {
                    forkCountElement.textContent = forks;
                    alert("Fork added! 🍴");
                });
            }
            if (restaurantCheckbox.checked && barCheckbox.checked) {
                chrome.storage.sync.set({ [challengeCompletedKey]: true }, function () {
                    restaurantCheckbox.disabled = true;
                    barCheckbox.disabled = true;
                    alert("Challenge completed! No more forks for this month! 🎉");
                });
            }
        });
    }
    
    restaurantCheckbox.addEventListener("change", updateForkCount);
    barCheckbox.addEventListener("change", updateForkCount);
});
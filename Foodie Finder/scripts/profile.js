document.addEventListener("DOMContentLoaded", function () {
    const locationInput = document.getElementById("location");
    const allergiesInput = document.getElementById("allergies");
    const childFriendlyInput = document.getElementById("child-friendly");
    const saveButton = document.getElementById("save-profile");
    const savedLocation = document.getElementById("saved-location");
    const savedAllergies = document.getElementById("saved-allergies");
    const savedChildFriendly = document.getElementById("saved-child-friendly");
    
    // Load saved profile settings
    chrome.storage.sync.get(["location", "allergies", "childFriendly"], function (data) {
        savedLocation.textContent = data.location || "Not set";
        savedAllergies.textContent = data.allergies || "None";
        savedChildFriendly.textContent = data.childFriendly === "true" ? "Yes" : "No";
    });
    
    saveButton.addEventListener("click", function () {
        const profileData = {
            location: locationInput.value.trim(),
            allergies: allergiesInput.value.trim(),
            childFriendly: childFriendlyInput.value
        };
        
        chrome.storage.sync.set(profileData, function () {
            savedLocation.textContent = profileData.location || "Not set";
            savedAllergies.textContent = profileData.allergies || "None";
            savedChildFriendly.textContent = profileData.childFriendly === "true" ? "Yes" : "No";
            alert("Profile saved successfully! ✅");
        });
    });
});
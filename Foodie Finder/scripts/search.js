document.addEventListener("DOMContentLoaded", function () {
    const searchBtn = document.querySelector("#search-page button");
    const criteriaInput = document.querySelector("#search-page input"); // Use existing input box
    
    const resultsDisplay = document.createElement("p");
    const criteriaBreakdown = document.createElement("p");
    document.getElementById("search-page").appendChild(resultsDisplay);
    document.getElementById("search-page").appendChild(criteriaBreakdown);
    
    searchBtn.addEventListener("click", function () {
        console.log("Analyzing open Yelp/Google Maps page...");
        
        chrome.storage.sync.get(["allergies", "childFriendly"], function (profileData) {
            let userCriteria = criteriaInput.value ? criteriaInput.value.split(",").map(term => term.trim().toLowerCase()).filter(term => term) : [];
            
            let profileCriteria = [];
            if (profileData.allergies) profileCriteria.push(...profileData.allergies.toLowerCase().split(",").map(term => term.trim()));
            if (profileData.childFriendly === "true") profileCriteria.push("child-friendly");
            
            let combinedCriteria = [...userCriteria, ...profileCriteria];
            if (combinedCriteria.length === 0) {
                alert("No criteria defined. Please enter search criteria or set profile preferences.");
                return;
            }
            
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    function: analyzePage,
                    args: [combinedCriteria]
                }, (results) => {
                    if (results && results[0] && results[0].result) {
                        resultsDisplay.textContent = `Match Score: ${results[0].result.matchScore}%`;
                        criteriaBreakdown.innerHTML = `<strong>Matched Criteria:</strong> ${results[0].result.matched.join(", ") || "None"} <br><strong>Unmatched Criteria:</strong> ${results[0].result.unmatched.join(", ") || "None"}`;
                        alert(`Match Score: ${results[0].result.matchScore}%\nMatched: ${results[0].result.matched.join(", ")}\nUnmatched: ${results[0].result.unmatched.join(", ")}`);
                    } else {
                        resultsDisplay.textContent = "Could not determine match score.";
                        criteriaBreakdown.textContent = "No criteria breakdown available.";
                        alert("Could not determine match score.");
                    }
                });
            });
        });
    });
});

function analyzePage(criteria) {
    let pageText = document.body.innerText.toLowerCase();
    let matched = criteria.filter(term => pageText.includes(term));
    let unmatched = criteria.filter(term => !pageText.includes(term));
    let matchScore = criteria.length > 0 ? (matched.length / criteria.length) * 100 : 0;
    return { matchScore: Math.round(matchScore), matched, unmatched };
}
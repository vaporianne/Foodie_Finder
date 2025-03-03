document.addEventListener("DOMContentLoaded", function () {
    console.log("Reservations script loaded!");

    const openTableBtn = document.querySelector(".opentable-btn");
    const resyBtn = document.querySelector(".resy-btn");

    if (openTableBtn) {
        openTableBtn.addEventListener("click", function () {
            console.log("Redirecting to OpenTable");
            chrome.tabs.create({ url: "https://www.opentable.com/user/dining-dashboard" });
        });
    } else {
        console.error("OpenTable button not found");
    }

    if (resyBtn) {
        resyBtn.addEventListener("click", function () {
            console.log("Redirecting to Resy");
            chrome.tabs.create({ url: "https://www.resy.com/account/reservations-and-notify" });
        });
    } else {
        console.error("Resy button not found");
    }
});
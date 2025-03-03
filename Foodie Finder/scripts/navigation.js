document.addEventListener("DOMContentLoaded", function () {
    console.log("Navigation script loaded!");

    function showPage(pageId) {
        const pages = document.querySelectorAll("div");
        pages.forEach(page => {
            if (page.id === pageId) {
                page.style.display = "block";
            } else {
                page.style.display = "none";
            }
        });
    }

    document.querySelectorAll(".nav-btn").forEach(button => {
        button.addEventListener("click", function () {
            const targetPage = this.getAttribute("data-target");
            console.log(`Navigating to: ${targetPage}`);
            if (document.getElementById(targetPage)) {
                showPage(targetPage);
            } else {
                console.error(`Page ID '${targetPage}' not found`);
            }
        });
    });

    if (document.getElementById("home-page")) {
        showPage("home-page");
    } else {
        console.error("Home page element not found");
    }
});
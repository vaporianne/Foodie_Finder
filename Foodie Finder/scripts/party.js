document.addEventListener("DOMContentLoaded", function () {
    const occasionInput = document.getElementById("occasion");
    const restaurantInput = document.getElementById("restaurant");
    const timeInput = document.getElementById("time");
    const inviteOutput = document.getElementById("invite-output");
    const generateButton = document.getElementById("generate-invite");
    const copyButton = document.getElementById("copy-invite");
    
    generateButton.addEventListener("click", function () {
        const occasion = occasionInput.value.trim() || "a fun gathering";
        const restaurant = restaurantInput.value.trim() || "a great restaurant";
        const time = timeInput.value.trim() || "TBD";
        
        const invitation = `🎉 You're invited to *${occasion}*! 🍽️ We are meeting at *${restaurant}* at *${time}*. Let's enjoy great food together! 🎊\n\nPowered by Foodie Finder.`;
        inviteOutput.value = invitation;
    });
    
    copyButton.addEventListener("click", function () {
        inviteOutput.select();
        document.execCommand("copy");
        alert("Invitation copied to clipboard! 🎉");
    });
});
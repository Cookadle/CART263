document.addEventListener("DOMContentLoaded", () => {
    const enterAppBtn = document.getElementById("enter-app");

    if (!enterAppBtn) {
        console.error("Enter button not found!");
        return;
    }

    enterAppBtn.addEventListener("click", () => {
        //Redirect to the main to-do page
        window.location.href = "index.html";
    });

    console.log("Landing page JS loaded successfully");
});
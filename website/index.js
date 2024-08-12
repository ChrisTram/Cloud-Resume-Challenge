document.addEventListener("DOMContentLoaded", function() {
    const counter = document.querySelector("#counter-number");
    updateCounter(counter);
});

async function updateCounter(counter) {
    try {

        let response = await fetch("https://e33a82xy31.execute-api.eu-central-1.amazonaws.com/Prod/count");
        let data = await response.json();
        if (counter) {
            counter.innerHTML = `Number of Views: ${data}`;
        } else {
            console.error("Unexpected data format:", data);
            counter.innerHTML = "Error fetching data.";
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        if (counter) {
            counter.innerHTML = "Error fetching data.";
        }
    }
}

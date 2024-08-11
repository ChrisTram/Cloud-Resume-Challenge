document.addEventListener("DOMContentLoaded", function() {
    const counter = document.querySelector("#counter-number");
    updateCounter(counter);
});

async function updateCounter(counter) {
    let response = await fetch("https://72sp4ycyn62u2rivmlg764dpi40aprvh.lambda-url.eu-central-1.on.aws/");
    let data = await response.json();
    if (counter) {
        counter.innerHTML = `Number of Views: ${data}`;
    }
}

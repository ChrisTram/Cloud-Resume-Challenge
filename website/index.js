document.addEventListener("DOMContentLoaded", function() {
    const counter = document.querySelector("#counter-number");
    updateCounter(counter);

    const form = document.getElementById('contact-form');
    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent default form submission

        // Gather form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        console.log(data)

        try {
            // Send data to API Gateway
            let response = await fetch("https://e33a82xy31.execute-api.eu-central-1.amazonaws.com/Prod/contact", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            // Check if the response is okay
            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }

            // Parse JSON response
            let result = await response.json();

            // Display success message
            document.getElementById('response-message').innerText = result.message || 'Message sent successfully!';
        } catch (error) {
            console.error("Error:", error);
            document.getElementById('response-message').innerText = 'Failed to send message.';
        }
    });
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

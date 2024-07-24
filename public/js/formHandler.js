document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('walkForm').addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        const title = document.getElementById('title').value;
        const distance = document.getElementById('distance').value;
        const difficulty = document.getElementById('difficulty').value;
        const location = document.getElementById('location').value;

        try {
            // Fetch coordinates from the server-side API
            const response = await fetch('/geocode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ location })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Geocode API Response:', data); // Log the response from the geocode API

            if (data.coordinates) {
                // Ensure coordinates are formatted as an array of numbers
                const coordinates = [data.coordinates.lat, data.coordinates.lon];
                console.log('Formatted Coordinates:', coordinates);

                // Create FormData object
                const formData = new FormData();
                formData.append('title', title);
                formData.append('distance', distance);
                formData.append('difficulty', difficulty);
                formData.append('location', location);
                formData.append('coordinates', JSON.stringify({ lat: coordinates[0], lon: coordinates[1] })); // Ensure this is a string representation
                formData.append('image', document.getElementById('image').files[0]);

                // Log FormData entries
                console.log('FormData Entries:');
                for (let [key, value] of formData.entries()) {
                    console.log(`${key}:`, value);
                }

                // Send the FormData to the server
                const saveResponse = await fetch('/new', {
                    method: 'POST',
                    body: formData
                });

                if (!saveResponse.ok) {
                    throw new Error(`HTTP error! status: ${saveResponse.status}`);
                }

                const saveResult = await saveResponse.json();
                console.log('Save Response:', saveResult); // Log the response from saving the walk

                if (saveResult.success) {
                    window.location.href = '/walks'; // Redirect to /walks on success
                } else {
                    alert('Failed to add walk.');
                }
            } else {
                alert('Failed to fetch coordinates for the location.');
            }
        } catch (error) {
            console.error('Error:', error);
            // alert('An error occurred. Please try again.'); this line causes the popup
            document.getElementById('error-message').textContent = 'An error occurred. Please try again.';
            document.getElementById('error-message').textContent = ''; // Clear the message
        }
    });
});

// Eximius Main Application JS
console.log('Eximius app.js loaded.');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed. Fetching user count from API...');
    
    // Fetch data from the API server (Port 5000)
    fetch('http://127.0.0.0.1:5000/api/items')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const countDisplay = document.getElementById('user-count-display');
            if (countDisplay) {
                // Display the user_count retrieved from the database query
                countDisplay.textContent = data.user_count;
            }
            console.log('User count (' + data.user_count + ') fetched and rendered.');
        })
        .catch(error => {
            console.error('Fetch error:', error);
            const countDisplay = document.getElementById('user-count-display');
            if (countDisplay) {
                countDisplay.textContent = 'ERROR';
            }
        });
});

const cityName = 'Chicago'; // Replace so it reads input city.  I did this for testing. 

fetch('http://localhost:3003/search', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ city: cityName }),
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response error');
    }
    return response.json();
  })
  .then(data => {
    console.log('Tracks:', data.searchResults);
  })
  .catch(error => {
    console.error('Error:', error);
  });

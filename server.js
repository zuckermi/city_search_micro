const express = require('express');
const fetch = require('node-fetch');


const app = express();
const port = 3003;

app.use(express.json());

app.post('/search', async (req, res) => {
  const { city } = req.body;

  if (!city) {
    return res.status(400).json({ error: 'City parameter is required' });
  }

  try {
    const apiKey = '07b953ac32c1e1c6b2407464986e0f65';
    const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=track.search&track=${city}&api_key=${apiKey}&format=json`);
    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: 'Error fetching tracks from Last.fm API' });
    }

    const searchResults = data.results.trackmatches.track;
    res.json({ searchResults });
  } catch (error) {
    console.error('Error fetching tracks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Microservice API running at http://localhost:${port}`);
});

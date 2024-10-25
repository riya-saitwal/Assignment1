const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// Your RapidAPI host and key (replace these with your actual API key and host from RapidAPI)
const API_HOST = 'free-cricket-live-score1.p.rapidapi.com';  // Example API host
const API_KEY = 'eb3767b9ecmshe0d7acdf8126ab7p12b807jsn1cfed355062d';                 // Replace with your actual API key

// Set up the route to fetch the live cricket score
app.get('/live-score', async (req, res) => {
  try {
    const response = await axios.get(`https://${API_HOST}/match`, {
      params: { id: '66754aac6c794634996ed39c' },  // Replace 'match_id' with the actual match ID you want to track
      headers: {
        'x-rapidapi-host': 'free-cricket-live-score1.p.rapidapi.com',
        'x-rapidapi-key': 'eb3767b9ecmshe0d7acdf8126ab7p12b807jsn1cfed355062d'
      }
    });

    const matchData = response.data;
    res.json(matchData);
  } catch (error) {
    console.error('Error fetching live cricket score:', error);
    res.status(500).send('Error fetching live cricket score');
  }
});

// Serve an HTML page to display the score
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const express = require('express');
const axios = require('axios');
const admin = require('firebase-admin');

const app = express();
const port = process.env.PORT || 3000;

// Firebase initialization
const serviceAccount = require('./firebase-service-key.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://your-firebase-database-url"
});
const db = admin.firestore();

// API to fetch satellite data
app.get('/satellite-data', async (req, res) => {
    try {
        const response = await axios.get('https://api.nasa.gov/planetary/earth-assets', {
            params: {
                lat: req.query.lat,
                lon: req.query.lon,
                date: req.query.date,
                api_key: 'YOUR_NASA_API_KEY'
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching satellite data' });
    }
});

// Save IoT data to Firebase
app.post('/iot-data', async (req, res) => {
    const data = req.body;
    try {
        await db.collection('environmentalData').add(data);
        res.json({ success: 'Data saved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error saving IoT data' });
    }
});

app.listen(port, () => {
    console.log(Server running on port ${port});
});
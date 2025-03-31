const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

const USERS = { username: 'admin', password: '123456' };

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === USERS.username && password === USERS.password) {
        res.json({ success: true, message: 'Login successful' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

app.get('/sensor-data', (req, res) => {
    const sensorData = {
        temperature: (Math.random() * 10 + 20).toFixed(2),
        humidity: (Math.random() * 20 + 40).toFixed(2)
    };
    res.json(sensorData);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

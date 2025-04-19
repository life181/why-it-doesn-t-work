const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Create a message string
    const messageString = `Received message from ${name} (${email}): ${message}\n`;

    // Define the file path
    const filePath = path.join(__dirname, 'messages.txt');

    // Append message to the file
    fs.appendFile(filePath, messageString, (err) => {
        if (err) {
            console.error('Error writing to file', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.json({ message: 'Your message has been received!' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
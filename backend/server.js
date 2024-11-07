const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const dbConfig = {
    host: 'db', // Ensure this matches the service name in docker-compose.yml
    user: 'root',
    password: 'root',
    database: 'crud_app'
};

const db = mysql.createConnection(dbConfig);

function connectWithRetry() {
    db.connect((err) => {
        if (err) {
            console.error('Database connection failed. Retrying in 5 seconds...', err);
            setTimeout(connectWithRetry, 5000); // Retry every 5 seconds
        } else {
            console.log('Connected to MySQL database.');
        }
    });
}

connectWithRetry();

// Create
app.post('/items', (req, res) => {
    const { name, description } = req.body;
    db.query('INSERT INTO items (name, description) VALUES (?, ?)', [name, description], (err, result) => {
        if (err) throw err;
        res.send({ id: result.insertId, name, description });
    });
});

// Read
app.get('/items', (req, res) => {
    db.query('SELECT * FROM items', (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Update
app.put('/items/:id', (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    db.query('UPDATE items SET name = ?, description = ? WHERE id = ?', [name, description, id], (err, result) => {
        if (err) throw err;
        res.send({ id, name, description });
    });
});

// Delete
app.delete('/items/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM items WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Item deleted', id });
    });
});

app.listen(5000, () => {
    console.log(`Server running on port 5000`);
});

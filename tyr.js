const express = require('express');
const { connectToDb, getDb } = require('./db');

const app = express();
app.use(express.json());

let db;

// Define API routes
app.get('/api/users', (req, res) => {
    const page = parseInt(req.query.p, 10) || 0; // Convert page to integer
    const salesPerPage = 12;

    // Ensure db is connected
    if (!db) {
        return res.status(500).json({ msg: 'Database not connected' });
    }

    db.collection('sales')
        .find()
        .sort({ id: 1 })
        .skip(page * salesPerPage)
        .limit(salesPerPage)
        .toArray() // Convert cursor to array
        .then((sales) => {
            res.status(200).json(sales);
        })
        .catch(() => {
            res.status(500).json({ msg: 'Error getting sales info' });
        });
});

// Initialize database and start server
connectToDb((err) => {
    if (!err) {
        db = getDb(); // Get the db object
        app.listen(3003, () => {
            console.log('Server is running on port 3003');
        });
    } else {
        console.error('Failed to connect to the database');
    }
});

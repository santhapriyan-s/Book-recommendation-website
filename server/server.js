const express = require("express");
const axios = require("axios");
const cors = require("cors");
const authRoutes = require('./routes/auth');
const dotenv = require("dotenv");
const mongoose=require('mongoose');

require('dotenv').config();
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(401).json({ message: "Access denied" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = user;
        next();
    });
};

// Example of a protected route
app.get("/api/protected-route", authenticateToken, (req, res) => {
    res.json({ message: "This is a protected route" });
});


mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch(error => console.log("MongoDB connection error:", error));

  mongoose.set('debug', true);

  app.use('/api/auth', authRoutes);


app.get("/api/books", async (req, res) => {
    const { query, genre } = req.query;
    const searchQuery = genre !== "all" ? `${query} ${genre}` : query;

    try {
        const response = await axios.get("https://www.googleapis.com/books/v1/volumes", {
            params: {
                q: searchQuery,
                key: process.env.GOOGLE_BOOKS_API_KEY,
                maxResults: 30,
            },
        });
        
        if (!response.data.items) {
            return res.status(404).json({ error: "No books found" });
        }
        
        res.json(response.data.items);
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ error: "Failed to fetch books", message: error.message });
    }
});

// Mood-Based Suggestions
app.get("/api/mood-suggestions", async (req, res) => {
    const { mood } = req.query;
    let moodQuery = "";

    // Define moods with corresponding query terms
    switch (mood) {
        case "happy":
            moodQuery = "uplifting";
            break;
        case "sad":
            moodQuery = "melancholy";
            break;
        case "exciting":
            moodQuery = "thrilling";
            break;
        case "relaxing":
            moodQuery = "calming";
            break;
        default:
            moodQuery = "fiction"; // Default mood suggestion
    }

    try {
        const response = await axios.get("https://www.googleapis.com/books/v1/volumes", {
            params: {
                q: moodQuery,
                key: process.env.GOOGLE_BOOKS_API_KEY,
                maxResults: 30,
            },
        });
        
        if (!response.data.items) {
            return res.status(404).json({ error: "No mood-based suggestions found" });
        }

        res.json(response.data.items);
    } catch (error) {
        console.error("Error fetching mood suggestions:", error);
        res.status(500).json({ error: "Failed to fetch mood suggestions", message: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

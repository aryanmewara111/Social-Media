const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const { readdirSync } = require("fs");
const fileUpload = require("express-fileupload");
const path = require('path');

const app = express();
dotenv.config();
app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Set-Cookie: cross-site-cookie=whatever; SameSite=None; Secure");
    next();
});

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions));

app.use(fileUpload({
    useTempFiles: true,
}));

// BACKEND ROUTES PATH
readdirSync("./routes").map((r) => app.use("/api/", require('./routes/' + r)));
app.get('/', async (req, res) => {
    try {
        res.send({ message: 'Clang Social API 🐻' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Connect DATABASE
const connectDatabase = async () => {
    /*
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB connected with server: ${mongoose.connection.host}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process if database connection fails
    }*/
    try {
        await mongoose.set('strictQuery', true).connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then((data) => {
            console.log(`MongoDB connected with server: ${data.connection.host}`);
        });
    }
    catch (error) {
        console.log(error);
    }
};

// Start SERVER
const PORT = process.env.PORT || 8000;
connectDatabase().then(() => {
    app.listen(PORT, () => console.log(`🚀 Connected to PORT => ${PORT}`));
});
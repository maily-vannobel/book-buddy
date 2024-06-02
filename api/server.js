const express = require('express');
const connectDB = require('./configs/db');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

// Connexion à la base de données
connectDB();

app.use(express.json());
app.use(cors());

app.use('/api/', require('./routes/bookRoutes'));
app.use('/api/', require('./routes/userRoutes'));

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});
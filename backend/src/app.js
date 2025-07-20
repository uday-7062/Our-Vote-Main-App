const express = require('express');
const cors = require('cors');
const electionRoutes = require('./routes/electionRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();
require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/elections', electionRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`)); 
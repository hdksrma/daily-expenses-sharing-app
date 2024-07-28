const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const balanceSheetRoutes = require('./routes/balanceSheetRoutes');

require('dotenv').config();

const app = express();

app.use(bodyParser.json());

app.use('/api', userRoutes);
app.use('/api', expenseRoutes);
app.use('/api', balanceSheetRoutes);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    })
    .catch(err => console.error('Database connection error:', err));

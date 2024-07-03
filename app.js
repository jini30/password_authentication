const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

app = express();

// DB config
const db = require('./config/keys').MongoURI;

// Connect to Mongo
mongoose.connect(db).then(() => 
    {
        console.log('MongoDB connected');
    }
).catch((err) => 
    {
        console.log(err);
    }
);

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Bodyparser
app.use(
    express.urlencoded(
        {
            extended: true
        }
    )
);

// Routes
app.use('/', require('./routes/index'));

app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
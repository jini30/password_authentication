const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

app = express();

// Passport config
require('./config/passport')(passport);

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

// Express session
app.use(session(
        {
            secret: 'secret',
            resave: true,
            saveUninitialized: true
        }
    )
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global vars
app.use((req, res, next) => 
    {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.error = req.flash('error');
        next();
    }
);

// Routes
app.use('/', require('./routes/index'));

app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
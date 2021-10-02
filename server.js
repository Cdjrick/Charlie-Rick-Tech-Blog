const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const controllers = require('./controllers')
const session = require('express-session')
const hb = require('handlebars')
const moment = require("moment");

require('dotenv').config();

// Setup app
const app = express();
const PORT = process.env.PORT || 3001

const sequelize = require('./config/connection')
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

// Setup handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

hb.registerHelper('dateFormat', function (date, options) {
    const formatToUse = (arguments[1] && arguments[1].hash && arguments[1].hash.format) || "MMMM Do, hh:mm A"
    return moment(date).format(formatToUse);
});

// Use middleware
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup routes
app.use(controllers)

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`))
})
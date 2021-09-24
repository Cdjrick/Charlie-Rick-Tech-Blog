const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const sequelize = require('./config/connection')
const controllers = require('./controllers')

require('dotenv').config();

// Setup app
const app = express();
const PORT = process.env.PORT || 3001

// Setup routes
app.use(controllers)

// Use middleware
app.use(express.static(path.join(__dirname, '/public')));

// Setup handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`))
})
const env = process.env.NODE_ENV || 'docker';
const config = require('./config/config.json')[env];
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();

app.use(logger('development'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var User = require('./models').User;

var apiRoutes = express.Router();
// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);

require('./routes')(apiRoutes);
app.get('/', (req, res) => {
  res.send("tito's api");
})

app.listen(8090);

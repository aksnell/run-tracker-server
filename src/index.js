require('./models/User');
require('./models/Track');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

//Associate routes with express.
app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

//Connect to mongoose cluster
const mongoURI = 'mongodb+srv://admin:admin@tracker-uzd2m.mongodb.net/tracker?retryWrites=true&w=majority';
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
});
mongoose.connection.on('connected', () => {
    console.log('connected to mongo instance');
});
mongoose.connection.on('error', err => {
    console.log('Error: ', err);
});

//Default route
app.get('/', requireAuth, (req, res) => {
    res.send(`Email: ${req.user.email}`);
});

//Port to listen for requests on.
app.listen(3000, () => {
    console.log('Listening on port 3000');
});


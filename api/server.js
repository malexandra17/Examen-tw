// require('dotenv').config({});
const express = require ('express');
const sequelize = require("./sequelize");
const Movie = require("./models/Movie");
const CrewMember = require("./models/CrewMember");
const cors = require('cors');
const app = express();
const path = require('path');
var movies = require('./routes/movies');
var crewmembers = require('./routes/crewmembers');

app.use(express.json());
app.listen(process.env.PORT || 8080)
Movie.hasMany(CrewMember);
app.use('/movies',movies);
app.use('/crewmembers',crewmembers);


app.use(express.static(path.join(__dirname, '../client/build')));
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
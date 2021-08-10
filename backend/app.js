// Importations
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const mysql = require('mysql2');
const db = require('./models/index');

const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
//const commentRoutes = require('./routes/comments');

// Création de l'app
const app = express();

// Helmet
app.use(helmet());

// Connexion de l'API à la bdd
db.sequelize.sync().then(result => {
	// db.sequelize.sync({ force: true }).then(result => {
	console.log(result);
}).catch( error =>  { console.log(error )});


// middleware général 1 pour définir les headers de toutes les requetes
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});

// middleware général 2 qui transforme le corps des requetes en JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// middleware qui permet l'accès statique à des images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Les Routes
app.use('/api', userRoutes);
app.use('/api/posts', postRoutes);
//app.use('/api/comments', commentRoutes);

// Exportation de l'app
module.exports = app;
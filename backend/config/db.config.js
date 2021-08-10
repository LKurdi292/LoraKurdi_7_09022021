// Modalités de connexion à la bdd
require('dotenv').config();

module.exports = {
	HOST: process.env.HOST,
	USER: process.env.USER,
	PASSWORD: process.env.MDP,
	DB: process.env.BDD,
	dialect: "mysql",
	pool: {
	  max: 5,
	  min: 0,
	  acquire: 30000,
	  idle: 10000
	}
};
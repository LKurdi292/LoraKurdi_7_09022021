// Table Users
'use strict';

module.exports = (sequelize, DataTypes) => {
	const Users = sequelize.define("Users", {
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		subscriptionDate: {
			type: DataTypes.DATE,
			allowNull: false
		},
		imageURL: {
			type: DataTypes.STRING, 
			unique: true
		},
		bio: {
			type: DataTypes.TEXT
		},
		isAdmin: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			default: false
		},
	});
	return Users;
};
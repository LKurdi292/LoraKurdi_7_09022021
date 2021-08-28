// Table Posts
'use strict'

module.exports = (sequelize, Sequelize) => {
	const Posts = sequelize.define("Posts", {
		title: {
			type: Sequelize.STRING,
			allowNull: false
		},
		publicationDate: {
			type: Sequelize.DATE,
			allowNull: false
		},
		publicationText: {
			type: Sequelize.TEXT,
		},
		likes: {
			type: Sequelize.INTEGER,
			unsigned: true,
			default: 0
		},
		imageURL: {
			type: Sequelize.STRING
		}
	});
	return Posts;
}
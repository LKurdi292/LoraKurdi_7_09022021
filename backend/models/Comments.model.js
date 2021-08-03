// Table Comments
'use strict';

module.exports = (sequelize, DataTypes) => {
	const Comments = sequelize.define("Comments", {
		content: {
			type: DataTypes.STRING,
			allowNull: false
		},
		likes: {
			type: DataTypes.INTEGER,
			unsigned: true,
			default: 0
		},
	});
	return Comments;
};
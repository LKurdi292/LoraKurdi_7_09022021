const dbConfig = require("../config/db.config.js");
const Sequelize  = require("sequelize");


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Post = require('./Posts.model')(sequelize, Sequelize);
db.User = require('./Users.model')(sequelize, Sequelize);
db.Comment = require('./Comments.model')(sequelize, Sequelize);
db.Like_Post = sequelize.define('Like_Post', {}, { timestamps: false});
db.Like_Comment = sequelize.define('Like_Comment', {}, { timestamps: false});


// Les relations entre les tables
	
	// Users et Posts

//db.User.hasMany(db.Post);
db.Post.belongsTo(db.User, {
	foreignKey: {
		name: 'userId',
		allowNull: false
	},
	onDelete: 'CASCADE',
	onUpdate: 'NO ACTION',
});
db.Post.belongsToMany(db.User, {
	through: db.Like_Post,
	foreignKey: 'userId',
	onDelete: 'CASCADE',
	onUpdate: 'NO ACTION',
	allowNull: false
});
db.User.belongsToMany(db.Post, {
	through: db.Like_Post,
	foreignKey: 'postId',
	onDelete: 'CASCADE',
	onUpdate: 'NO ACTION',
	allowNull: false
});

	// Users et Comments
// db.User.hasMany(db.Comment, {as: 'comments' });
db.Comment.belongsTo(db.User, {
	foreignKey: {
		name: 'userId',
		allowNull: false
	},
	onDelete: 'CASCADE', 
	onUpdate: 'NO ACTION',
});
db.Comment.belongsToMany(db.User, {
	through: db.Like_Comment,
	foreignKey: 'userId',
	onDelete: 'CASCADE', 
	onUpdate: 'NO ACTION',
	allowNull: false
});
db.User.belongsToMany(db.Comment, {
	through: db.Like_Comment,
	foreignKey: 'commentId',
	onDelete: 'CASCADE',
	onUpdate: 'NO ACTION',
	allowNull: false
});


	// Posts et Comments
db.Post.hasMany(db.Comment);
db.Comment.belongsTo(db.Post, {
	foreignKey: {
		name: 'postId',
		allowNull: false
	},
	onDelete: 'CASCADE',
	onUpdate: 'NO ACTION',
});

module.exports = db;
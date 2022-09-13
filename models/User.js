const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// use bcrypt for password hashing
const bcrypt = require('bcrypt');

// create the User model
class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
        },
        username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
        },
        email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
            }
        },
        password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4]
            }
        }
  },
  {
    hooks: {
        // set up a beforeCreate lifecycle hook to hash the password before the object is created in the database
        // and return the new userdata object
        async beforeCreate(newUserData) {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
          },
        // set up a beforeUpdate lifecycle hook to hash the password before a user object is updated in the database
        async beforeUpdate(updatedUserData) {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
          }
    },
    // pass in the imported sequelize connection to the database
    sequelize,
    // do not automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // do not pluralize name of database table
    freezeTableName: true,
    // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    // make it so the model name stays lowercase in the database
    modelName: 'user'
  }
);

module.exports = User;
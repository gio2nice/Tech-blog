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
        // define an email column
        email: {
        // define the data type
        type: DataTypes.STRING,
        // require the data to be entered
        allowNull: false,
        // do not allow duplicate email values in this table
        unique: true,
        // if allowNull is set to false, the data can be validated before creating the table data
        validate: {
            // this will check the format of the entry as a valid email by pattern checking <string>@<string>.<string>
            isEmail: true
            }
        },
        // define a password column
        password: {
        // define the data type
        type: DataTypes.STRING,
        // require the data to be entered
        allowNull: false,
        validate: {
            // this means the password must be at least four characters long
            len: [4]
            }
        }
  },
  {
    // TABLE CONFIGURATION OPTIONS (https://sequelize.org/v5/manual/models-definition.html#configuration))
    // add hooks for the password hashing operation
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
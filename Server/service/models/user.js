'use strict';
const { hashPassword } = require('../helpers/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Appointment)
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Username already exists'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'fill in the Username field'
        },
        notNull: {
          msg: 'fill in the Username field'
        }
      }
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'fill in the Full name field'
        },
        notNull: {
          msg: 'fill in the Full name field'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Email already exists'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'fill in the Email field'
        },
        notNull: {
          msg: 'fill in the Email field'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'fill in the Password field'
        },
        notNull: {
          msg: 'fill in the Password field'
        }
      }
    },
    dob: {
      type: DataTypes.DATE,
      validate: {
        isDate: {
          msg: 'Field must be a date type'
        }
      }
    },
    phoneNumber: DataTypes.STRING,
    avatar: DataTypes.STRING,
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'fill in the Role field'
        },
        notNull: {
          msg: 'fill in the Role field'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(user) {
        user.password = hashPassword(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};
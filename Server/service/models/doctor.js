'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Doctor.hasMany(models.Appointment)
    }
  };
  Doctor.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'fill in the Doctor name field'
        },
        notNull: {
          msg: 'fill in the Doctor name field'
        }
      }
    },
    queueIndex: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'queueIndex already exists'
      },
      allowNull: false,
      validate: {
        len: {
          args: [1,3],
          msg: 'Queue Index lenght must be between 1 and 3'
        },
        notEmpty: {
          msg: 'fill in the queueIndex field'
        },
        notNull: {
          msg: 'fill in the queueIndex field'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'fill in the description field'
        },
        notNull: {
          msg: 'fill in the description field'
        }
      }
    },
    avatar: DataTypes.STRING,
    availableAt: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'fill in the availableAt field'
        },
        notNull: {
          msg: 'fill in the availableAt field'
        }
      }
    },
    policlinic: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'fill in the policlinic field'
        },
        notNull: {
          msg: 'fill in the policlinic field'
        }
      }
    },
    maxCapacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'fill in the maximum capacity field'
        },
        notNull: {
          msg: 'fill in the maximum capacity field'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Doctor',
  });
  return Doctor;
};
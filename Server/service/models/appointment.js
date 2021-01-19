'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Appointment.belongsTo(models.User)
      Appointment.belongsTo(models.Doctor)
    }
  };
  Appointment.init({
    patientName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'fill in the patient name field'
        },
        notNull: {
          msg: 'fill in the patient name field'
        }
      }
    },
    queueNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'fill in the Queue Number field'
        },
        notNull: {
          msg: 'fill in the Queue Number field'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'fill in the status field'
        },
        notNull: {
          msg: 'fill in the status field'
        }
      }
    },
    inQueue: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'fill in the inQueue field'
        },
        notNull: {
          msg: 'fill in the inQueue field'
        }
      }
    },
    date: {
      type: DataTypes.DATE,
      validate: {
        isDate: {
          msg: 'Field must be a date type'
        }
      }
    },
    UserId: DataTypes.INTEGER,
    DoctorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  return Appointment;
};
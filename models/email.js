'use strict';
module.exports = (sequelize, DataTypes) => {
  const Email = sequelize.define('Email', {
    email: DataTypes.STRING,
    address: DataTypes.STRING
  }, {});
  Email.associate = function(models) {
    // associations can be defined here
  };
  return Email;
};
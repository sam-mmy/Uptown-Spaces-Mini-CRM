const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Lead = sequelize.define(
  "Lead",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
    },

    budget: {
      type: DataTypes.DECIMAL(12, 2),
    },

    location: {
      type: DataTypes.STRING,
    },

    property_type: {
      type: DataTypes.ENUM(
        "1BHK",
        "2BHK",
        "3BHK",
        "4BHK",
        "Plot"
      ),
    },

    source: {
      type: DataTypes.ENUM(
        "Facebook",
        "Google",
        "Referral"
      ),
    },

    status: {
      type: DataTypes.ENUM(
        "New",
        "Contacted",
        "Site Visit",
        "Closed"
      ),
      defaultValue: "New",
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "leads",
    timestamps: false, // because managing timestamps manually
  }
);

module.exports = Lead;
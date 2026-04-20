const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Note = sequelize.define(
  "Note",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    lead_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    note: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    created_at: {
      type: DataTypes.DATE
    },

    updated_at: {
      type: DataTypes.DATE
    },

    deleted_at: {
      type: DataTypes.DATE
    }
  },
  {
    tableName: "notes",
    timestamps: false
  }
);

module.exports = Note;
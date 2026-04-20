const sequelize = require("../config/db");

const Lead = require("./Lead");
const Note = require("./Note");

// associations
Lead.hasMany(Note, {
  foreignKey: "lead_id",
  as: "notes"
});

Note.belongsTo(Lead, {
  foreignKey: "lead_id",
  as: "lead"
});

module.exports = {
  sequelize,
  Lead,
  Note
};
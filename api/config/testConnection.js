const sequelize = require("./db");

async function testDB() {
  try {
    await sequelize.authenticate();
    console.log("Sequelize MySQL connected successfully");
  } catch (error) {
    console.error("Connection failed:", error);
  }
}

testDB();

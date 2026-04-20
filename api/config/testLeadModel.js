const sequelize = require("./db");
const Lead = require("../models/Lead");

async function testModel() {
    try {
        await sequelize.authenticate();

        const leads = await Lead.findAll();

        console.log("Lead model working. Total leads:", leads.length);
    } catch (error) {
        console.error("Model test failed:", error);
    }
}

testModel();
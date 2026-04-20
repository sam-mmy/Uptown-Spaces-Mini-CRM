const { Lead } = require("../models");
const { Sequelize } = require("sequelize");

exports.getDashboardStats = async (req, res) => {
  try {

    // total leads
    const totalLeads = await Lead.count({
      where: { deleted_at: null }
    });

    // leads by source
    const leadsBySource = await Lead.findAll({
      attributes: [
        "source",
        [Sequelize.fn("COUNT", Sequelize.col("source")), "count"]
      ],
      where: { deleted_at: null },
      group: ["source"]
    });

    // status distribution
    const statusDistribution = await Lead.findAll({
      attributes: [
        "status",
        [Sequelize.fn("COUNT", Sequelize.col("status")), "count"]
      ],
      where: { deleted_at: null },
      group: ["status"]
    });

    // conversion rate (Closed / Total)
    const closedLeads = await Lead.count({
      where: {
        status: "Closed",
        deleted_at: null
      }
    });

    const conversionRate =
      totalLeads === 0
        ? 0
        : ((closedLeads / totalLeads) * 100).toFixed(2);

    return res.json({
      message: "Dashboard stats fetched successfully",
      data: {
        totalLeads,
        leadsBySource,
        statusDistribution,
        conversionRate
      }
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch dashboard stats"
    });
  }
};
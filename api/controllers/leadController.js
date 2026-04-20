const { Lead, Note } = require("../models");
const { Op } = require("sequelize");

// create new Lead
exports.createLead = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      budget,
      location,
      property_type,
      source,
      status
    } = req.body;

    const newLead = await Lead.create({
      name,
      phone,
      email,
      budget,
      location,
      property_type,
      source,
      status,
      created_at: new Date(),
      updated_at: new Date()
    });

    return res.status(201).json({
      message: "Lead created successfully",
      data: newLead
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to create lead"
    });
  }
};

// get all leadsconst { Op } = require("sequelize");
exports.getAllLeads = async (req, res) => {
  try {
    const {
      search,
      source,
      status,
      sortBy,
      page = 1,
      limit = 5
    } = req.query;

    const offset = (page - 1) * limit;

    let whereCondition = {
      deleted_at: null
    };

    if (search) {
      whereCondition[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { phone: { [Op.like]: `%${search}%` } }
      ];
    }

    if (source) whereCondition.source = source;
    if (status) whereCondition.status = status;

    let orderCondition = [["created_at", "DESC"]];

    switch (sortBy) {

      case "budget_asc":
        orderCondition = [["budget", "ASC"]];
        break;

      case "budget_desc":
        orderCondition = [["budget", "DESC"]];
        break;

      case "date_oldest":
        orderCondition = [["created_at", "ASC"]];
        break;

      case "date_latest":
        orderCondition = [["created_at", "DESC"]];
        break;

      default:
        orderCondition = [["created_at", "DESC"]];
    }
    const { count, rows } = await Lead.findAndCountAll({
      where: whereCondition,
      order: orderCondition,
      offset: Number(offset),
      limit: Number(limit)
    });

    return res.json({
      message: "Leads fetched successfully",
      data: rows,
      total: count,
      page: Number(page),
      totalPages: Math.ceil(count / limit)
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch leads"
    });
  }
};
// Get Leads by id for leade detail page
exports.getLeadById = async (req, res) => {
  try {
    const { id } = req.params;

    const lead = await Lead.findOne({
      where: {
        id,
        deleted_at: null
      },
      include: [
        {
          model: Note,
          as: "notes",
          where: { deleted_at: null },
          required: false
        }
      ]
    });

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found"
      });
    }

    return res.json({
      message: "Lead fetched successfully",
      data: lead
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch lead"
    });
  }
};

// Update Lead Status
exports.updateLeadStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "New",
      "Contacted",
      "Site Visit",
      "Closed"
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value"
      });
    }

    const lead = await Lead.findOne({
      where: {
        id,
        deleted_at: null
      }
    });

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found"
      });
    }

    await lead.update({
      status,
      updated_at: new Date()
    });

    return res.json({
      message: "Lead status updated successfully",
      data: lead
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to update status"
    });
  }
};
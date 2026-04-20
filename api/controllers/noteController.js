const { Lead, Note } = require("../models");

exports.addNoteToLead = async (req, res) => {
  try {
    const { id } = req.params;
    const { note } = req.body;

    if (!note) {
      return res.status(400).json({
        message: "Note text is required"
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

    const newNote = await Note.create({
      lead_id: id,
      note,
      created_at: new Date(),
      updated_at: new Date()
    });

    return res.status(201).json({
      message: "Note added successfully",
      data: newNote
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to add note"
    });
  }
};

exports.getNotesByLeadId = async (req, res) => {

  try {

    const { leadId } = req.params;

    if (!leadId) {
      return res.status(500).json({
        message: "Lead id not found"
      });
    }

    const notes = await Note.findAll({

      where: {
        lead_id: leadId,
        deleted_at: null
      },

      order: [["created_at", "DESC"]]

    });

    return res.json({
      message: "Notes fetched successfully",
      data: notes
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch notes"
    });

  }

};
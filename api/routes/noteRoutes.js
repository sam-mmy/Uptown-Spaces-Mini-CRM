const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");

const {
    createNoteSchema
} = require("../validations/noteValidation");
const noteController = require("../controllers/noteController");

router.post("/leads/notes/:id", validate(createNoteSchema), noteController.addNoteToLead);
router.get("/leads/notes/:leadId", noteController.getNotesByLeadId);

module.exports = router;
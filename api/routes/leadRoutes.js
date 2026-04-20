const express = require("express");
const router = express.Router();

const leadController = require("../controllers/leadController");
const validate = require("../middlewares/validate");

const {
    createLeadSchema
} = require("../validations/leadValidation");


// create_lead
router.post("/leads", validate(createLeadSchema), leadController.createLead);

// get all leads.
router.get("/leads", leadController.getAllLeads);

// get lead details
router.get("/leads/:id", leadController.getLeadById);

// uodate leade status
router.patch("/leads/:id/status", leadController.updateLeadStatus);

module.exports = router;
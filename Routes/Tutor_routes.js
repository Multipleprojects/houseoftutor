const express = require('express');
const router = express.Router();
const tutorController = require('../Controller/Tutor_controller');

// POST request to create a new tutor
router.post('/', tutorController.createTutor);
// Get 
router.get('/', tutorController.GetTutor);
// delete data
router.delete('/',tutorController.deleteAllTutors);
//update
router.put('/:id',tutorController.updateStatus);
router.put('/durationcomplete/:id',tutorController.updateRatingAndStatus);
module.exports = router;
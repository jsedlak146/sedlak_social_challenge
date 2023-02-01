const router = require('express').Router();
const {
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
  getAllThoughts
} = require('../../controllers/thoughtController');

// /api/thought
router.route('/').get(getAllThoughts).post(createThought);

// /api/students/:studentId
router.route('/:thoughtID').get(getSingleThought).delete(deleteThought).put(updateThought);

// /api/students/:studentId/assignments/:assignmentId
//router.route('/:thoughtID/reactions').//post(addReaction);

//router.route('/:thoughtID/reactions/:reactionID').delete(deleteReaction);

module.exports = router;

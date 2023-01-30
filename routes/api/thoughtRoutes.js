const router = require('express').Router();
const {
  getThought,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought
} = require('../../controllers/thoughtController');

// /api/students
router.route('/').get(getThought).post(createThought);

// /api/students/:studentId
router.route('/:thoughtID').get(getSingleThought).delete(deleteThought).put(updateThought);

// /api/students/:studentId/assignments/:assignmentId
router.route('/:thoughtID/reactions').post(addReaction);

router.route('/:thoughtID/reactions/:reactionID').delete(deleteReaction);

module.exports = router;

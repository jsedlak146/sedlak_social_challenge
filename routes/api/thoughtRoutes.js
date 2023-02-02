const router = require('express').Router();
const {
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
  getAllThoughts,
  createReaction
} = require('../../controllers/thoughtController');

// /api/thought
router.route('/').get(getAllThoughts).post(createThought);

// /api/thought/:thoughtID
router.route('/:thoughtID').get(getSingleThought).delete(deleteThought).put(updateThought);

router.route('/reaction/:thoughtID').post(createReaction);

// /api/students/:studentId/assignments/:assignmentId
//router.route('/:thoughtID/reactions').//post(addReaction);

//router.route('/:thoughtID/reactions/:reactionID').delete(deleteReaction);

module.exports = router;

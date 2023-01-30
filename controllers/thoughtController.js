const { ObjectId } = require('mongoose').Types;
const { Student, Course, Thought } = require('../models');

// Aggregate function to get the number of students overall
const headCount = async () =>
  Student.aggregate()
    .count('studentCount')
    .then((numberOfStudents) => numberOfStudents);

// Aggregate function for getting the overall grade using $avg
const grade = async (studentId) =>
  Student.aggregate([
    // only include the given student by using $match
    { $match: { _id: ObjectId(studentId) } },
    {
      $unwind: '$assignments',
    },
    {
      $group: {
        _id: ObjectId(studentId),
        overallGrade: { $avg: '$assignments.score' },
      },
    },
  ]);

module.exports = {
  // Get all students
  getThought(req, res) {
    Thought.find()
      .then(async (thought) => {
        const thoughtObj = {
          thought,
        };
        return res.json(thoughtObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single student
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json({
              thought,
              thought: await user(req.params.thoughtId),
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new student
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a student and remove them from the course
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No such thought exists' })
          : thought.findOneAndUpdate(
              { students: req.params.thoughtId },
              { $pull: { students: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: 'thought deleted, but no courses found',
            })
          : res.json({ message: 'thought successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add an assignment to a student
  addThought(req, res) {
    console.log('You are adding an assignment');
    console.log(req.body);
    Student.findOneAndUpdate(
      { _id: req.params.studentId },
      { $addToSet: { assignments: req.body } },
      { runValidators: true, new: true }
    )
      .then((student) =>
        !student
          ? res
              .status(404)
              .json({ message: 'No student found with that ID :(' })
          : res.json(student)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove assignment from a student
  removeAssignment(req, res) {
    Student.findOneAndUpdate(
      { _id: req.params.studentId },
      { $pull: { assignments: { assignmentId: { $in: [req.params.assignmentId] } } } },
      { runValidators: true, new: true }
    )
      .then((student) =>
        !student
          ? res
              .status(404)
              .json({ message: 'No student found with that ID :(' })
          : res.json(student)
      )
      .catch((err) => res.status(500).json(err));
  },
};

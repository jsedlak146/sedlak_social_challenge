const { ObjectId } = require('mongoose').Types;
const { User, Thought, Reaction } = require('../models');

module.exports = {
  // Get all thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtID })
      .select('-__v')
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json({
              thought,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        User.findOneAndUpdate(
          {username: thought.userName}, 
          { $addToSet: { thoughts: thought.id}}
          , (err) => {
            if(err) throw err
            console.log("done")
          })
        res.json(thought)})
      
      .catch((err) => res.status(500).json(err));
  },
  //delete a thought
  deleteThought(req, res) {
    Thought.findByIdAndRemove(ObjectId(req.params.thoughtID))
      .then((thought) =>
          !thought  
            ? res.status(404).json({ message: "No thought found with that ID" })
            : res.json({ message: "Thought deleted!"})
      )
      .catch ((err) => res.status(500).json(err));
  },
  updateThought(req, res) {
    Thought.findByIdAndUpdate(
        ObjectId(req.params.thoughtID),
      { $set: req.body },
      { new: true }
    )
    .then((thought) =>
      !thought 
        ? res.status(404).json({ message: "No thought found with that ID" })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
},
createReaction(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtID },
    { $addToSet: req.body },
    { runValidators: true, new: true }
  )
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user with this id!' })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
},
}
const { connect, connection } = require('mongoose');

connect('mongodb://localhost/socialdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;

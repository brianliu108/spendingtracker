const mongoose = require('mongoose')
const uri = process.env.MONGOOSE_CONNECTION;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
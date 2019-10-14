const mongoose = require('mongoose')

// DB Option
const dbUrl = "mongodb+srv://KillerPiggy:Arifscorpio1998$@belajarmongodb-j7ovk.mongodb.net/gradeAforSure"
const dbOption = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

//mongoose
mongoose.Promise = global.Promise
mongoose.connect(dbUrl, dbOption)

module.exports = {
  mongoose: mongoose
}
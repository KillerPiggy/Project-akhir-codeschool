const {mongoose} = require('../config/db')

var shoes = new mongoose.Schema({
  // id: {
  //   type: String,
  //   trim: true,
  //   required: true
  // },
  title: {
    type: String,
    trim: true,
    required: true
  },
  brand: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true,
    required: true
  },
  image: {
    type: String,
    trim: true,
    required: true
  },
  price: {
    type: String,
    trim: true,
    required: true
  },
  featured: {
    type: Boolean,
    required: true,
    default: false
  },
  date: {
    type: Date,
    default: Date.now()
  },
  color:{
    type: String,
    trim: true,
    required: true
  }
})

var Shoes = mongoose.model('shoes', shoes)

module.exports = {
  Shoes: Shoes
}
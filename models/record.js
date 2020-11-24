const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  title: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  date: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    require: true
  },
  amount: {
    type: Number,
    required: true
  }
})
module.exports = mongoose.model('Expensive', recordSchema)
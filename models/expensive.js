const mongoose = require('mongoose')
const Schema = mongoose.Schema
const expensiveSchema = new Schema({
  title: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  date: {
    type: Date,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
})
module.exports = mongoose.model('Expensive', expensiveSchema)
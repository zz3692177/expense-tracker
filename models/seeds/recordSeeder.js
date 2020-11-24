const mongoose = require('mongoose')
const record = require('../record') // 載入 todo model
mongoose.connect('mongodb://localhost/expensive', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  console.log(new Date(2010, 10, 10))
})

db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < 10; i++) {
    record.create({ title: 'title-' + i, date: "2020-10-10", category: "其他", icon: '<i class="fas fa-pen"></i>', amount: 20 })
  }
  console.log('done')
})

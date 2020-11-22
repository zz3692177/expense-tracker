const mongoose = require('mongoose')
const Expensive = require('../record') // 載入 todo model
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
    Expensive.create({ title: 'title-' + i, date: new Date(), category: 'traffic', amount: 20 })
  }
  console.log('done')
})

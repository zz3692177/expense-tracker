// 載入 express 並建構應用程式伺服器
const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/expensive', { useNewUrlParser: true, useUnifiedTopology: true })

const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')


app.engine('handlebars', exphbs({ defaultLayout: 'main', extname: '.handlebars' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))

const Record = require('./models/record');


const icon = {
  "家居物業": "<i class=\"fas fa-home\"></i>", "交通出行": "<i class=\"fas fa-shuttle-van\"></i>", "休閒娛樂": "<i class=\"fas fa-grin-beam\"></i>",
  "餐飲食品": "<i class=\"fas fa-utensils\"></i>", "其他": "<i class=\"fas fa-pen\"></i>"
}
const categoryChart = {
  "residentialProperty": "家居物業", "traffic": "交通出行", "amusement": "休閒娛樂", "food": "餐飲食品", "other": "其他"
}



app.get('/', (req, res) => {
  let sum = 0
  Record.find()
    .lean()
    .then(records => {
      for (let i = 0; i < records.length; i++) {
        sum += records[i].amount
      }
      res.render('index', { records, icon, sum })
      sum = 0;
      // console.log(icon)
    })

})

app.get('/sorts', (req, res) => {
  let categorySelect = {
    residentialProperty: false,
    traffic: false,
    amusement: false,
    food: false,
    other: false
  }

  let sum = 0
  const { type } = req.query
  const categoryFind = categoryChart[type]
  categorySelect[type] = true

  console.log(categorySelect[type])

  return Record.find({ category: categoryFind })
    .lean()
    .then(records => {
      records.forEach(record => sum += record.amount)
      res.render('index', { records, sum, categorySelect })
    })
    .catch(error => console.log(error))

})

app.get('/record/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then(record => {
      res.render('edit', { record })
      // console.log(record)
    })
    .catch(error => console.log(error))
})

app.post('/record/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => {
      record = Object.assign(record, req.body)
      record.icon = icon[record.category]
      console.log(record.icon)
      return record.save()
    })
    .then(() => {
      res.redirect(`/`)
    })
    .catch(error => console.log(error))
})

app.post('/record', (req, res) => {
  console.log(req.body)
  const newOne = Object.assign(req.body)
  newOne.icon = icon[newOne.category]
  return Record.create(newOne)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/record/new', (req, res) => {
  res.render('new')
})

app.post('/record/:id/delete', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// 設定首頁路由
app.get('/', (req, res) => {
  res.send('hello world')
})

// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})


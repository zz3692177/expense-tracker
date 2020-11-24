// 載入 express 並建構應用程式伺服器
const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/expensive', { useNewUrlParser: true, useUnifiedTopology: true })

const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main', extname: '.handlebars' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

const Record = require('./models/record');
// const icon = [{ "家居物業": "<i class=\"fas fa - home\"></i>" }, {
//   "交通出行": "<i class=\"fas fa- shuttle - van\">"
// }, { "休閒娛樂": "<i class=\"fas fa- grin - beam\">" }, { "餐飲食品": "<i class=\"fas fa- utensils\">" }, { "其他": "<i class=\"fas fa- pen\">" }]

const icon = {
  "家居物業": "<i class=\"fas fa - home\"></i>", "交通出行": "<i class=\"fas fa- shuttle - van\">", "休閒娛樂": "<i class=\"fas fa- grin - beam\">",
  "餐飲食品": "<i class=\"fas fa- utensils\">", "其他": "<i class=\"fas fa- pen\">"
}

app.post('/record/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then(Record => { res.render('edit', { record }) })
    .catch(error => console.log(error))
})

app.get('/', (req, res) => {

  Record.find()
    .lean()
    .then(records => {
      res.render('index', { records, icon })
      console.log(icon)
    })

})

app.get('/record/new', (req, res) => {
  res.render('new')
})
// app.post('/record', (req, res) => {
//   const newOne = Object.assign(req.body)      // 從 req.body 拿出表單裡的 name 資料
//   return Restaurant.create(newOne)     // 存入資料庫
//     .then(() => res.redirect('/')) // 新增完成後導回首頁
//     .catch(error => console.log(error))

// })
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


// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Record model
const Record = require('../../models/record')
// 目錄對照表
const categoryChart = {
  "residentialProperty": "家居物業", "traffic": "交通出行", "amusement": "休閒娛樂", "food": "餐飲食品", "other": "其他"
}



// 定義首頁路由
router.get('/', (req, res) => {
  let totalAmount = 0
  Record.find()
    .lean()
    .then(records => {
      for (let i = 0; i < records.length; i++) {
        totalAmount += records[i].amount
      }
      res.render('index', { records, totalAmount })
      // console.log(icon)
    })

})


router.get('/filter', (req, res) => {
  // let categorySelect = {
  //   residentialProperty: false,
  //   traffic: false,
  //   amusement: false,
  //   food: false,
  //   other: false
  // }

  let totalAmount = 0
  const { type } = req.query
  const categoryFind = categoryChart[type]
  //categorySelect[type] = true

  // console.log(categorySelect[type])

  return Record.find({ category: categoryFind })
    .lean()
    .then(records => {
      records.forEach(record => totalAmount += record.amount)
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.log(error))

})
// 匯出路由模組
module.exports = router
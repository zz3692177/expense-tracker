// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 圖片索引
const icon = {
  "家居物業": "<i class=\"fas fa-home\"></i>", "交通出行": "<i class=\"fas fa-shuttle-van\"></i>", "休閒娛樂": "<i class=\"fas fa-grin-beam\"></i>",
  "餐飲食品": "<i class=\"fas fa-utensils\"></i>", "其他": "<i class=\"fas fa-pen\"></i>"
}
// 引用 Record model
const Record = require('../../models/record')
// 定義首頁路由
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then(record => {
      res.render('edit', { record })
      // console.log(record)
    })
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
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

router.post('/', (req, res) => {
  console.log(req.body)
  const newOne = Object.assign(req.body)
  newOne.icon = icon[newOne.category]
  return Record.create(newOne)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/new', (req, res) => {
  res.render('new')
})

router.delete('/:id/', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 匯出路由模組
module.exports = router
var express = require('express');
var router = express.Router();
var db = require('../db/db');

/* GET home page. */
//主页获取所有博客
router.get('/api/getAllBlogs', function (req, res, next) {
  db.query('select * from blog', function (err, results) {
    if (err) {
      res.send({
        code: -1,
        msg: '获取博客失败'
      })
    } else {
      res.send({
        code: 0,
        msg: '获取博客成功',
        data: results
      })
    }
  })
})

//点击进入博客
router.get('/api/detail', function (req, res, next) {
  //获取查看的文章id
  let id = req.query.id
  db.query('select * from blog where id = ?', id, function (err, results) {
    if (err) {
      res.send({
        code: -1,
        msg: '获取博客失败'
      })
    } else {
      res.send({
        code: 0,
        msg: '获取博客成功',
        data: results
      })
    }
  })
})


//添加博客
router.post('/api/addblog', function (req, res, next) {
  //获取博客内容（markdown格式和html格式）
  let {type, title, description, content, htmlcontent, img } = req.body
  //获取当前时间
  let time = new Date().toLocaleString()
  //存入数据库
  db.query(`insert into blog (type, title, description, content, htmlcontent, time, img) values ('${type}','${title}', '${description}', '${content}', '${htmlcontent}', '${time}', '${img}')`, function (err, results) {
    if (err) {
      res.send({
        code: -1,
        msg: '添加博客失败',
        err
      })
    } else {
      res.send({
        code: 0,
        msg: '添加博客成功'
      })
    }
  })
})


module.exports = router;

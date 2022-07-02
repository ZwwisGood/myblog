var express = require('express');
var router = express.Router();
var db = require('../db/db');
//Multer 是一个 node.js 中间件,
//用于处理 multipart/form-data 类型的表单数据,它主要用于上传文件。
var multer = require('multer');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
})
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

//获取文章笔记类型博客
router.get('/api/getNotes', function (req, res, next) {
  db.query('select * from blog where type = "文章笔记"', function (err, results) {
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

//获取文章笔记类型博客
router.get('/api/getLifeBlogs', function (req, res, next) {
  db.query('select * from blog where type = ?', '生活', function (err, results) {
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
  let { type, title, description, content, htmlcontent, img } = req.body
  //获取当前时间
  let str = new Date();
  const time = str.getFullYear() + "/"
    + (str.getMonth() + 1) + "/" + str.getDate() + " " + str.getHours() + ":" + str.getMinutes() + ":" + str.getSeconds()
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

//markdown上传图片
// 指定存储位置
const storage = multer.diskStorage({  //diskStorage硬盘存储
  // 存储位置
  destination(req, file, callback) {
    // 参数一 错误信息   参数二  上传路径（此处指定public文件夹）
    // callback(null, "public/images")
    callback(null, "../public/images")
  },
  // 确定文件名
  filename(req, file, cb) {
    //参数二 保存的文件名
    cb(null, Date.now() + file.originalname)
  }
})
// 得到multer对象  传入storage对象
const upload = multer({ storage })
/* 创建multer对象后，我们可以使用以下实例来接收上传文件：
.single(fieldname) - 单个文件上传
接收一个名为fieldname的上传文件，所上传的文件会被保存在req.file。 */
router.post('/api/upload', upload.single("file"), function (req, res, next) {
  // 需要返回图片的访问地址    域名+文件名
  //服务器地址
  // const url = "http://localhost:3001/images/" + req.file.filename
  // const url = "http://120.24.182.3:3001/images/" + req.file.filename
  const url = "http://81.71.165.39:3001/images/" + req.file.filename
  res.json({ url })
})


//根据页数获取博客
router.get('/api/getBlogsByPage', function (req, res, next) {
  //获取页数
  let page = req.query.page
  //获取每页显示的条数
  let pageSize = req.query.pageSize
  //计算出起始位置
  let start = (page - 1) * pageSize
  //查询总数量
  db.query('select count(*) as total from blog', function (err, result) {
    if (err) {
      res.send({
        code: -1,
        msg: '获取博客失败'
      })
    } else {
      //获取总数量
      let total = result
      db.query(`select * from blog limit ${start},${pageSize}`, function (err, results) {
        if (err) {
          res.send({
            code: -1,
            msg: '获取博客失败'
          })
        } else {
          res.send({
            code: 0,
            msg: '获取博客成功',
            data: {
              total: total[0].total,
              results
            }
          })
        }
      })
    }
  })
})

//删除博客
router.get('/api/deleteBlog', function (req, res, next) {
  // //获取删除的id
  let id = req.query.id
  db.query('delete from blog where id = ?', id, function (err, results) {
    if (err) {
      res.send({
        code: -1,
        msg: '删除博客失败'
      })
    } else {
      res.send({
        code: 0,
        msg: '删除博客成功'
      })
    }
  })
})

//根据id查询博客
router.get('/api/getBlogById', function (req, res, next) {
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

//修改博客
router.post('/api/updateBlog', function (req, res, next) {
  //获取博客内容（markdown格式和html格式）
  let { id, type, title, description, content, htmlcontent } = req.body
  //获取当前时间
  let time = new Date().toLocaleString()
  //存入数据库
  db.query(`update blog set type='${type}', title='${title}', description='${description}', content='${content}', htmlcontent='${htmlcontent}', time='${time}' where id=${id}`, function (err, results) {
    if (err) {
      res.send({
        code: -1,
        msg: '修改博客失败',
      })
    } else {
      res.send({
        code: 0,
        msg: '修改博客成功'
      })
    }
  })
})

//获取所有留言
router.get('/api/getMessages', function (req, res, next) {
  //获取页数
  let page = req.query.page
  //获取每页显示的条数
  let pageSize = req.query.pageSize
  //计算出起始位置
  let start = (page - 1) * pageSize
  //查询总数量
  db.query('select count(*) as total from message', function (err, result) {
    if (err) {
      res.send({
        code: -1,
        msg: '获取留言失败'
      })
    }
    let total = result
    db.query(`select * from message order by id desc limit ${start},${pageSize}`, function (err, results) {
      if (err) {
        res.send({
          code: -1,
          msg: '获取留言失败'
        })
      } else {
        res.send({
          code: 0,
          msg: '获取留言成功',
          data: {
            total: total[0].total,
            results
          }
        })
      }
    })
  })
})

//添加留言
router.post('/api/addMessage', function (req, res, next) {
  //获取留言内容
  let { name, content, time, avatar, first } = req.body
  if (first == true) {
    //留言人已存在
    db.query('select * from message where name = ?', name, function (err, result) {
      if (result.length > 0) {
        res.send({
          code: -1,
          msg: '留言人已存在'
        })
      } else {
        db.query('insert into message (name, content, time, avatar) values (?,?,?,?)', [name, content, time, avatar], function (e, results) {
          if (e) {
            res.send({
              code: -1,
              msg: '添加留言失败'
            })
          }
          res.send({
            code: 0,
            msg: '添加成功'
          })
        })
      }
    })
  }

})

//根据页数获取留言
router.get('/api/getMessagesByPage', function (req, res, next) {
  //获取页数
  let page = req.query.page
  //获取每页显示的条数
  let pageSize = req.query.pageSize
  //计算出起始位置
  let start = (page - 1) * pageSize
  //查询总数量
  db.query('select count(*) as total from message', function (err, result) {
    if (err) {
      res.send({
        code: -1,
        msg: '获取留言失败'
      })
    } else {
      //获取总数量
      let total = result
      db.query(`select * from message order by id desc limit ${start},${pageSize}`, function (err, results) {
        if (err) {
          res.send({
            code: -1,
            msg: '获取留言失败'
          })
        } else {
          res.send({
            code: 0,
            msg: '获取留言成功',
            data: {
              total: total[0].total,
              results
            }
          })
        }
      })
    }
  })
})

//删除留言
router.get('/api/deleteMsg', function (req, res, next) {
  //获取删除的留言id
  let id = req.query.id
  db.query('delete from message where id = ?', id, function (err, results) {
    if (err) {
      res.send({
        code: -1,
        msg: '删除留言失败'
      })
    }
    res.send({
      code: 0,
      msg: '删除留言成功'
    })
  })
})

//搜索
router.get('/api/search', function (req, res, next) {
  //获取搜索内容
  let keyword = req.query.keyword
  //查询数据库
  db.query(`select * from blog where title like '%${keyword}%'`, function (err, results) {
    if (err) {
      res.send({
        code: -1,
        msg: '搜索失败'
      })
    }
    res.send({
      code: 0,
      msg: '搜索成功',
      data: results
    })
  })
})


module.exports = router;

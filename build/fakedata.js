var express = require('express')
var app = express()

// 本地json-server服务器搭建代码
// 引入数据库文件

var apiRoutes = express.Router()
// 使用api的方法来创建连接时候的请求
apiRoutes.post('/merchant/queryList', function (req, res) {
  var appData = require('../static/data/vuetable.json');
  res.json(appData);
})

apiRoutes.post('/merchant/common', function (req, res) {
  var appData = require('../static/data/common.json');
  res.json(appData);
})

apiRoutes.post('/merchant/queryById', function (req, res) {
  var appData = require('../static/data/queryById.json');
  res.json(appData);
})


apiRoutes.post('/contract/queryList/', function (req, res) {
  var appData = require('../static/data/contract.json');
  res.json(appData);
})

apiRoutes.post('/loan/queryList', function (req, res) {
  var appData = require('../static/data/loanrecord.json');
  res.json(appData);
})

apiRoutes.post('/repay/queryList', function (req, res) {
  var appData = require('../static/data/repayrecord.json');
  res.json(appData);
})

apiRoutes.post('/repaymentPlan/queryList', function (req, res) {
  var appData = require('../static/data/repaymentPlan.json');
  res.json(appData);
})

apiRoutes.post('/merchant/status', function (req, res) {
  var appData = require('../static/data/common.json');
  res.json(appData);
})



apiRoutes.post('/account/main/view', function (req, res) {
  var appData = require('../static/data/account.json');
  res.json(appData);
})





module.exports = apiRoutes;
// 调用api
//app.use('/api', apiRoutes);
//axios.post('/api/test2,{"abc":234}); 这样的形式调用
//dev-server.js里加载这个资源文件
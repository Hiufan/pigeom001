'use strict'

var express = require('express')
var path = require('path')
var app = express()
var colors = require('colors')
var exphbs = require('express-handlebars')
var fs = require('fs')

app.engine('handlebars', exphbs({defaultLayout: 'tmall'}));
app.set('port', (process.env.PORT || 1111))
app.set('view engine', 'handlebars')

/**
 *  static folder
 **/
app.use(express.static(path.join(__dirname, './public')))

var pages = {
	'home': '首页',
	'xyyy': '喜悦孕育',
	'yqfm': '一期分娩',
	'xsmm': '新手妈妈',
	'shty': '生活体验',
	'bqmxcp': '十大明星产品',
	'ppgs': '品牌故事',
}

var front = ['other', 'w']
function getMap(){	
	var map = []
	front.forEach(function (ele){
	map.push({
			cat: ele,
			list: fs.readdirSync('./views/' + ele)
		})
	})
	return map
}


app.get('/', function (req, res){
	res.render('index',{
		pages: pages,
		layout: false,
		map: getMap()
	})
})


app.get('/p/:cat/:page', function (req, res){
	var cat = req.params.cat
	var p = req.params.page

	res.render(cat + '/' + p, {
		name: pages[p] || ''
	})
})

app.get('*', function (req, res){
	res.send(200)
})

/**
 *  server and port
 **/
app.listen(app.get('port'), function () {
    console.log('Server is listen on port', String(app.get('port')).blue)
})
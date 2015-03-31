var fs = require('fs');
var jade = require('jade');
var juice = require('juice2')
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

app.set('views', __dirname + "/views");
app.set('view engine', 'jade');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 



app.get('*', function(req, res){
	res.send("hello world, from "+req.url)
	console.log(req.headers.host + " requested " + req.url +" via "+req.method)
})

app.post('/post', function(req, res){
	res.send({'message':'object recieved'})
	console.log(req.headers.host + " requested " + req.url +" via "+req.method)
	
	var d = new Date();
	var stamp = d.getHours()+""+d.getMinutes()+"_"+d.getDate()+""+d.getMonth();
	fs.writeFile("./data/"+stamp+"_data.json", JSON.stringify(req.body), function(err){
		if(err){
			return console.log(err)
		}
		console.log('File saved as '+stamp+"_data.json");
	})
})

console.log("server started...")


app.listen(8080)
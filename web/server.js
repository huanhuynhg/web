var http = require('http');
var express = require('express');
var app = express();
var ejsEngine = require("ejs-locals");
app.engine("ejs", ejsEngine);
app.set("view engine", "ejs");
var csdl = require("./xly");
const bodyParser = require('body-parser');
const utf8 = require('utf8');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
var url = require('url');

app.get("/", function (req, res) {
    dslsp = csdl.HienThiLoaiSP();
    //Lay ma loai
    var q = url.parse(req.url, true).query;
    var category = 0;
    var namet = "Danh Sach ";
    if (q.category != undefined) {
        category = q.category;
        namet = q.namet;
    }
    console.log(category);
    dssp = xll.HienThiSP(category, namet);
    res.render("index", { title: "Online Shopping", loai: dslsp, dssp: dssp });
});


var server = http.createServer(app);
server.listen(8888);
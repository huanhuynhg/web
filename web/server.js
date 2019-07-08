var http = require('http');
var express = require('express');
var app = express();
var ejsEngine = require("ejs-locals");
app.engine("ejs", ejsEngine);
app.set("view engine", "ejs");
var csdl = require("./xly");
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
var url = require('url');
app.get("/", async function (req, res) {
    var q = url.parse(req.url, true).query;
    if (q.timkiem != undefined) {

        res.render("search");

    }
    else {
        dslsp = await csdl.HienThiLoaiSP();
        //Lay ma loai
        //var q = url.parse(req.url, true).query;
        var dssp = "";
        if (q.name != undefined) {
            name = q.name;
            dssp = await csdl.HienThiChiTietSP(0, name);
        } else if (q.id != undefined) {
            var id = q.id;
            dssp = await csdl.HienThiChiTietSP(id, "");
        }
        else {
            var category = 0;
            var namet = "Danh Sach San Pham";
            if (q.category != undefined) {
                category = q.maloai;
                namet = q.tenloai;
            }
            if (q.maloai != undefined && q.tenloai != undefined) {
                category = q.maloai;
                namet = q.tenloai;
                dssp = await csdl.HienThiSP(category, namet);
            } else {
                dssp = await csdl.HienThiSP(category, namet);
            }
            console.log(category);
            //console.log(q);
        }
        res.render("index", { title: "online shop", loaisp: dslsp, dssp: dssp });
    }
});


var server = http.createServer(app);
server.listen(8888);
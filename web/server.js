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
var session = require('express-session');
app.use(session({ secret: "Shh, its a secret!" }));

XuatDuLieu = async function (req, res) {
    var q = url.parse(req.url, true).query;
    dslsp = await csdl.HienThiLoaiSP();
    var dssp = "";
    if (q.muasp != undefined)//ki?m tra có ch?n mua hàng
    {//Ki?m tra ?ã có gi? hàng ch?a
        if (req.session.giohang == undefined)//Ch?a có
        {
            //T?o m?i gi? hàng
            req.session.giohang = [];
            //T?o m?i hoa mua
            var sp = {
                muasp: q.muasp, tensp: q.tensp,
                dongia: q.dongia, soluong: 1
            };
            //??a vào gi? hàng
            req.session.giohang[0] = sp;
        }
        else//?ã có gi? hàng
        {//Ki?m tra hoa ch?n mua ?ã ???c ch?n tr??c ?ó ch?a
            var co = 0;
            for (i = 0; i < req.session.giohang.length; i++) {
                if (req.session.giohang[i].id == q.muasp) {//n?u ?ã có :t?ng s? l??ng 1
                    req.session.giohang[i].soluong++;
                    co = 1;
                    break;
                }
            }
            //N?u ch?a  có trong gi? hàng
            if (co == 0) {
                //t?o m?i 1 hoa và ??a vào gi? hàng
                var sp = {
                    mua: q.muasp, tensp: q.tensp,
                    dongia: q.dongia, soluong: 1
                };
                req.session.giohang[req.session.giohang.length] = hoa;

            }
            console.log(req.session.giohang);

        }
    }else 
    if (q.tensp != undefined) {
        tensp = q.tensp;
        dssp = await csdl.HienThiChiTietSP(0, tensp);
    } else if (q.id != undefined) {
        var id = q.id;
        dssp = await csdl.HienThiChiTietSP(masp, "");
    }
    else {
        var maloai = 0;
        var tenloai = "";
        if (q.maloai != undefined) {
            maloai = q.maloai;
            tenloai = q.tenloai;
        }
        if (q.maloai != undefined && q.tenloai != undefined) {
            maloai = q.maloai;
            tenloai = q.tenloai;
            dssp = await csdl.HienThiSP(maloai, tenloai);
        } else {
            dssp = await csdl.HienThiSP(maloai, tenloai);
        }
        var tenkh = "";
        var thoat = "";
        if (req.session.kh == "") {
            tenkh = "Thông tin dang nhap sai";
            req.session.kh = undefined;
        }
        else if (req.session.kh != undefined) {
            tenkh = req.session.kh.hoten;
            thoat = "<a href=/?thoat=1>exit</a>";
        }
        var htgh = "";
        if (req.session.giohang != undefined && req.session.giohang.length > 0)
            htgh = csdl.HienThiGioHang(req.session.giohang);
        res.render("index", {
            loaisp: dslsp, dssp: dssp,
            hoten: tenkh, thoat: thoat, hienthigiohang: htgh
        });
    }
}

app.get("/", async function (req, res) {
    var q = url.parse(req.url, true).query;
    if (q.thoat == 1)
        req.session.kh = undefined;
    if (q.timkiem != undefined)
        res.render("search");
    else if (q.dangky == 1)
        res.render("dangnhap");
    else
        await XuatDuLieu(req, res);

});

app.post("/dangnhap", async function (req, res) {
    var tendn = req.body.ten_dn;
    var matkhau = req.body.mat_khau;
    var kq = await csdl.DangNhap(tendn, matkhau);
    if (kq == 0)
        req.session.kh = "";
    else
        req.session.kh = kq;
    await XuatDuLieu(req, res);
});
app.post("/dangky", async function (req, res) {
    var tendn = req.body.ten_dn;
    var matkhau = req.body.mat_khau;
    var ho_ten = req.body.ho_ten;
    var email = req.body.email;
    var dia_chi = req.body.dia_chi;
    var so_dt = req.body.so_dt;
    console.log(tendn);
    console.log(ho_ten);
    var kq = await csdl.Dang_ky(tendn, matkhau, ho_ten, email, dia_chi, so_dt);

    await XuatDuLieu(req, res);
});


var server = http.createServer(app);
server.listen(8888);
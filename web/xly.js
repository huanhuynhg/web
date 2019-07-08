module.exports.HienThiLoaiSP = async  function () {
    var mysql = require('mysql2/promise');
    var pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        database: 'web',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
  
    var dslsp = await pool.query('SELECT * from loaisp');
    Bangloaisp = dslsp[0];
    var kq = "";
    for (i = 0; i < Bangloaisp.length; i++) {
        kq += "<a href='http://localhost:8888/?maloai="
            + Bangloaisp[i].maloai + "&&tenloai=" + Bangloaisp[i].tenloai + "'>" + Bangloaisp[i].tenloai + "</a><br>";
    }

    return kq;
};

module.exports.HienThiSP = async function (maloai, tenloai) {
    var mysql = require('mysql2/promise');
    var pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        database: 'web',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
    var dssp;
    if (maloai == 0)
        dssp = await  pool.query('select  * from sanpham order by masp desc limit 0,10');
    else
        dssp = await pool.query('select  * from sanpham where maloai=' + maloai);

    Bangsp = dssp[0];
    var kq = "<table> <caption>" + tenloai + " </caption > ";

    for (i = 0; i < Bangsp.length; i++) {
            if (i % 4 == 0)
                kq += "<tr>";
        kq += "<td><a href='/?masp=" + Bangsp[i].masp + "'> "
        kq += " <img src = 'img/" + Bangsp[i].img + "' /></a > <br>";
        kq += Bangsp[i].tensp + "<br><i>Giá bán :" + Bangsp[i].dongia + "</i>"
        kq += "<br><a href='/?muasp=" + Bangsp[i].masp + "&tensp=";
        kq += Bangsp[i].tensp + "&dongia=" + Bangsp[i].dongia
        kq += "&maloai=" + maloai + "&tenloai=" + tenloai + "'>";
        kq += "<img src='img/gio_hang.jpg'></a></td>";
            
            if ((i+1) % 4 == 0)
                kq += "</tr>";
        
    }
    kq += "</table";
    return kq;
};

module.exports.HienThiGioHang = function (giohang) {
    var tongtien = 0;
    var kq = "<table width='100%' border='1' cellspacing='0' ";
    kq += "cellpadding = '0' > ";
    kq += "<tr><td width='10%'>STT</td><td width='40'>Tên sp</td>";
    kq += "<td width='10%'>SL</td> <td width='20%'>Giá</td>";
    kq += "<td>Thành tiền</td></tr > ";
    for (i = 0; i < giohang.length; i++) {
        kq += "<tr><td>" + (i + 1) + "</td><td>" + giohang[i].tensp
            + "</td>";
        kq += "<td>" + giohang[i].soluong + "</td><td>" + giohang[i].dongia + "</td>";
        kq += "<td>" + giohang[i].soluong * giohang[i].dongia
            + "</td></tr>";
        tongtien += giohang[i].soluong * giohang[i].dongia;
    }
    kq += "<tr><td colspan='5' align='right'>Tổng tiền :" + tongtien + "</td></tr>";
    kq += "</table";
    return kq;

};

module.exports.HienThiChiTietSP = async function (id,name) {
    var mysql = require('mysql2/promise');
    var pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        database: 'web',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
    var dssp;
    if(id!=0)
        dssp = await pool.query("select  * from sanpham where masp=" + masp);
    else
        dssp = await pool.query("select  * from sanpham where tensp like'%" + tensp + "%' or mota like '%" + tensp +"'");

    
    Bangsp = dssp[0];
    var kq = "<table>";

    for (i = 0; i < Banghoa.length; i++) {
        if(i%2==0)
            kq += "<tr>";
        kq += "<td valign='center'> <img src = 'img/" + Bangsp[i].img + "' /></td>";
        kq += "<td><p  style='font - size: 14px; color: #303FDD'><b>"
        kq += Bangsp[i].tensp + "</b ></p >";
        kq += "<i>Giá bán :" + Bangsp[i].dongia + "</i><br>";
        kq += "Thành phần chính :<br>" + Bangsp[i].mota + "</td>";
        if((i+1)%2==0)
         kq+="</tr > ";
    }
    kq += "</table>";

    return kq;
};

module.exports.DangNhap = async function (tendn, matkhau) {
    var mysql = require('mysql2/promise');
    var pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        database: 'web',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
    var dskh;
    dskh = await pool.query("select * from khachhang where tendn='"
        + tendn + "' and matkhau='" + matkhau + "'");
    var kq;
    BangKh = dskh[0];
    if (BangKh.length > 0) {
        kq = BangKh[0];
    }
    else
        kq = 0;
    return kq;
};
module.exports.Dang_ky =
    async function (tendn, matkhau, ho_ten, email, dia_chi, so_dt) {
        var mysql = require('mysql2/promise');
        var pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            database: 'web',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
        var kq;
        var caulenh = "insert into khachhang(tendn,matkhau,hoten,diachi,dienthoai,email)"

        caulenh += "values('" + tendn + "','" + matkhau + "','" + ho_ten + "','" + dia_chi;
        caulenh += "','" + so_dt + "','" + email + "')";
        console.log(caulenh);
        dskh = await pool.query(caulenh);
        console.log(kq);
        return kq;
    };
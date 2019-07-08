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
  
    var dslsp = await pool.query('SELECT * from typeprod');
    Bangloaisp = dslsp[0];
    var kq = "";
    for (i = 0; i < Bangloaisp.length; i++) {
        kq += "<a href='http://localhost:8888/?maloai="
            + Bangloaisp[i].category + "&&tenloai=" + Bangloaisp[i].namet + "'>" + Bangloaisp[i].namet + "</a><br>";
    }

    return kq;
};

module.exports.HienThiSP = async function (category, namet) {
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
    if (category == 0)
        dssp = await  pool.query('select  * from products order by id desc limit 0,10');
    else
        dssp = await pool.query('select  * from products where category=' + category);

    Bangsp = dssp[0];
    var kq = "<table> <caption>" + namet + " </caption > ";

    for (i = 0; i < Bangsp.length; i++) {
            if (i % 4 == 0)
                kq += "<tr>";
            kq += "<td><img src='img/" + Bangsp[i].img + "'/><br>";
            kq += Bangsp[i].name + "<br><i>Giá bán :" + Bangsp[i].price + "</i></td>";
            
            if ((i+1) % 4 == 0)
                kq += "</tr>";
        
    }
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
        dssp = await pool.query("select  * from products where id=" + id);
    else
        dssp = await pool.query("select  * from products where name like'%" + name + "%' or mota like '%" + name +"'");

    
    Bangsp = dssp[0];
    var kq = "<table>";

    for (i = 0; i < Banghoa.length; i++) {
        if(i%2==0)
            kq += "<tr>";
        kq += "<td valign='center'> <img src = 'img/" + Bangsp[i].img + "' /></td>";
        kq += "<td><p  style='font - size: 14px; color: #303FDD'><b>"
        kq += Bangsp[i].name + "</b ></p >";
        kq += "<i>Giá bán :" + Bangsp[i].price + "</i><br>";
        kq += "Thành phần chính :<br>" + Bangsp[i].mota + "</td>";
        if((i+1)%2==0)
         kq+="</tr > ";
    }
    kq += "</table>";

    return kq;
};
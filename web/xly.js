module.exports.HienThiLoaiSP =  function () {
    var mysql = require(mysql);
    var pool = mysql.createPool({
        hosthost: 'localhost',
        user: 'root',
        database: 'web',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
  
    var dslsp =  pool.query('SELECT * from products ');
    Bangloaisp = dslsp[0];
    var kq = "";
    for (i = 0; i < Bangloaisp.length; i++) {
        kq += "<a href='http://localhost:8888/?maloai="
            + Bangloaisp[i].category + "&&tenloai=" + Bangloaisp[i].namet + "'>" + Bangloaisp[i].namet + "</a><br>";
    }

    return kq;
};

module.exports.HienThiSP =  function (category, namet) {
    var mysql = require('mysql');
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
        dssp =  pool.query('select  * from products order by id desc limit 0,10');
    else
        dssp =  pool.query('select  * from products where category=' + maloai);

    Bangsp = dssp[0];
    var kq = "<table> <caption>" + category + " </caption > ";

    for (i = 0; i < Bangsp.length; i++) {
            if (i % 4 == 0)
                kq += "<tr>";
            kq += "<td><img src='img/" + Bangsp[i].img + "'/><br>";
            kq += Bangsp[i].name + "<br><i>Giá bán :" + Bangsp[i].price + "</i></td>";
            vt++;
            if ((i+1) % 4 == 0)
                kq += "</tr>";
        
    }
    kq += "</table";
    return kq;
};
const mysql = require("mysql");

// Khởi tạo kết nối
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3306,
  database: "users",
  password: "22121944",
});

// Kết nối đến cơ sở dữ liệu

connection.connect((err) => {
  if (err) {
    console.log("Kế nối thất bại", err);
  } else {
    console.log("Kết nối thành công");
  }
});

module.exports = connection;

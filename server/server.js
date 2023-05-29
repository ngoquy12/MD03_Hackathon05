const express = require("express");

const server = express();

const port = 3001;

const db = require("./connection/connectionMySQL");

const bodyParser = require("body-parser");

const cors = require("cors");

const { v4: uuidv4 } = require("uuid");

const { validateData, validateData1 } = require("./middleware/validateData");

server.use(cors());

server.use(express.json());

server.use(bodyParser.json());

server.use(bodyParser.urlencoded({ extended: true }));

// API lấy tất cả thông tin users
server.get("/api/v1/users", (req, res) => {
  // Khởi tạo câu lệnh sql
  const query = "SELECT * FROM users";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({
        status: "Failed",
        message: err,
      });
    }
    return res.status(200).json({
      status: "OK",
      results: results.length,
      data: results,
    });
  });
});

// API lấy thông tin một user theo id
server.get("/api/v1/users/:id", (req, res) => {
  // Lấy id từ params
  const { id } = req.params;
  // Khởi tạo câu lệnh sql
  const query = `SELECT * FROM users WHERE UserId='${id}'`;
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({
        status: "Failed",
        message: err,
      });
    } else {
      // Nếu user không tồn tại
      if (results) {
        return res.status(200).json({
          status: "OK",
          data: results,
        });
      } else {
        return res.status(200).json({
          status: "OK",
          message: "User không tồn tại trong hệ thống",
        });
      }
    }
  });
});

// API xóa thông tin một user theo id
server.delete("/api/v1/users/:id", (req, res) => {
  // Lấy id từ params
  const { id } = req.params;
  // Khởi tạo câu lệnh sql
  const query = `DELETE FROM users WHERE UserId='${id}'`;
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({
        status: "Failed",
        message: err,
      });
    }
    return res.status(200).json({
      status: "OK",
      message: "Xóa thành công",
    });
  });
});

// API thêm mới user
server.post("/api/v1/users", validateData, validateData1, (req, res) => {
  const id = uuidv4();
  // Lấy dữ liệu từ body gửi lên
  const { Content, CreatedDate, Status, CreatedBy } = req.body;
  // Khởi tạo một đối tượng mới
  const newUser = [id, Content, CreatedDate, Status, CreatedBy];
  // Câu lệnh query
  const query =
    "INSERT INTO users (UserId,  Content, CreatedDate, Status, CreatedBy) VALUES (?, ?, ?, ?, ?)";
  db.query(query, newUser, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "Failed",
        message: err,
      });
    } else {
      return res.status(201).json({
        status: "OK",
        data: result,
        message: "Thêm thành công",
      });
    }
  });
});

// API cập nhật một user
server.put("/api/v1/users/:id", (req, res) => {
  // Lấy id truyền từ param
  const { id } = req.params;
  // Lấy dữ liệu từ body gửi lên
  const { Content, CreatedDate, Status, CreatedBy } = req.body;
  // Khởi tạo một đối tượng mới
  const newUser = [Content, CreatedDate, Status, CreatedBy, id];
  // Câu lệnh query
  const query =
    "UPDATE users u SET Content = ?,CreatedDate = ?,Status = ?,CreatedBy = ? WHERE UserId = ? ";
  db.query(query, newUser, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "Failed",
        message: err,
      });
    } else {
      return res.status(200).json({
        status: "OK",
        data: result,
        message: "Cập nhật thành công",
      });
    }
  });
});

server.listen(port, (req, res) => {
  console.log(`http://localhost:${port}`);
});

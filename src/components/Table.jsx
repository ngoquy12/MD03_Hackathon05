import React, { useEffect, useState } from "react";
import "./table.css";
import axios from "axios";
import Loading from "../components/Loading";

export default function Table() {
  const [users, setUsers] = useState([]);
  const [showLoading, setShowLoading] = useState(false);

  console.log(users);

  const loadData = async () => {
    setShowLoading(true);
    await axios
      .get("http://localhost:3001/api/v1/users")
      .then((res) => setUsers(res.data.data))
      .catch((err) => console.log(err));
    setShowLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Xóa thông tin một user theo id
  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:3001/api/v1/users/${id}`)
      .then((res) => {
        if (res.data.status === "OK") {
          alert("Xóa thành công");
          loadData();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="table-container">
      {showLoading ? <Loading /> : <></>}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th style={{ maxWidth: 50 }} scope="col">
              #
            </th>
            <th style={{ maxWidth: 200, width: 200 }} scope="col">
              Content
            </th>
            <th style={{ maxWidth: 100 }} scope="col">
              DueDate
            </th>
            <th style={{ maxWidth: 100 }} scope="col">
              Status
            </th>
            <th tylse={{ maxWidth: 150 }} scope="col">
              Assign to
            </th>
            <th style={{ maxWidth: 200 }} scope="col">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td style={{ maxWidth: 300, height: 100 }}>{user.Content}</td>
              <td>{user.CreatedDate}</td>
              <td>{user.Status}</td>
              <td>{user.CreatedBy}</td>
              <td>
                <button className="btn btn-warning mr-3">Sửa</button>
                <button
                  onClick={() => handleDelete(user.UserId)}
                  className="btn btn-danger"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

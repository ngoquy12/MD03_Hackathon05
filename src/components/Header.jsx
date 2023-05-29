import React, { useEffect, useState } from "react";
import "./header.css";
import DialogWarning from "./DialogWarning";
import axios from "axios";
import Loading from "./Loading";

export default function Header() {
  const [contents, setContents] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [showDialogWarning, setShowDialogWarning] = useState(false);
  const [title, setTitle] = useState("");
  const [users, setUsers] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(-1);

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

  // Kiểm tra các giá trị bỏ trống
  const checkIsEmpty = (field) => {
    if (field === undefined || field === null || field === "") {
      return true;
    } else {
      return false;
    }
  };

  // show dialog
  const showDialog = () => {
    setShowDialogWarning(true);
  };

  // close dialog
  const closeDialog = () => {
    setShowDialogWarning(false);
  };

  // Vailidate du lieu
  const validateData = () => {
    const err = [];
    if (checkIsEmpty(contents)) {
      err.push("Nội dung không được phép để trống");
      showDialog();
      setTitle("Nội dung không được phép để trống");
      return;
    }
    if (checkIsEmpty(createdDate)) {
      err.push("Ngày thêm không được phép để trống");
      showDialog();
      setTitle("Ngày thêm không được phép để trống");
      return;
    }
    if (checkIsEmpty(status)) {
      err.push("Trạng thái không được phép để trống");
      showDialog();
      setTitle("Trạng thái không được phép để trống");
      return;
    }
    if (checkIsEmpty(name)) {
      err.push("Người thêm không được phép để trống");
      showDialog();
      setTitle("Người thêm không được phép để trống");
      return;
    }
    // kiểm tra số lượng lỗi trong mảng
    if (err.length > 0) {
      return false;
    } else {
      return true;
    }
  };

  // Đối tượng user mới
  const newUser = {
    Content: contents,
    CreatedDate: createdDate,
    Status: status,
    CreatedBy: name,
  };

  // handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = validateData();
    if (valid) {
      axios
        .post("http://localhost:3001/api/v1/users", newUser)
        .then((res) => {
          if (res.data.status === "OK") {
            setContents("");
            setCreatedDate("");
            setName("");
            setStatus("");
            loadData();
            setTimeout(() => {
              alert("Thêm mới thành công");
            }, 300);
          }
        })
        .catch((err) => {
          // Nếu có lỗi thì hiển thị dialog và nội dung của dialog
          setShowDialogWarning(true);
          setTitle(err.response.data.message);
        });
    } else {
      validateData();
    }
  };

  // Sửa thông tin user theo id
  const handleEdit = (id) => {
    let result = users[id];
    setIsEdit(id);
  };

  // Lưu thông tin sau khi sửa
  const handleSave = (id) => {};

  return (
    <>
      <div className="header">
        {showDialogWarning ? (
          <DialogWarning title={title} closeDialog={closeDialog} />
        ) : (
          <></>
        )}
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <span className="input-group-text" id="content">
              @
            </span>
            <input
              value={contents}
              onChange={(e) => setContents(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Content"
              aria-label="Username"
              aria-describedby="content"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              @
            </span>
            <input
              value={createdDate}
              onChange={(e) => setCreatedDate(e.target.value)}
              type="date"
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          {/* <div className="input-group mb-3"> */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            class="form-select form-select-sm mb-3"
            aria-label=".form-select-lg example"
          >
            <option selected>Choose status</option>
            <option value="Pending">Pending</option>
            <option value="Reject">Reject</option>
            <option value="Fulfil">Fulfil</option>
          </select>
          {/* </div> */}
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              @
            </span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
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
            <>
              {users.map((user, index) => {
                index === isEdit ? (
                  <>
                    <tr key={index}>
                      <td>{index}</td>
                      <td style={{ maxWidth: 300, height: 100 }}>
                        {user.Content}
                      </td>
                      <td>{user.CreatedDate}</td>
                      <td>{user.Status}</td>
                      <td>{user.CreatedBy}</td>
                      <td>
                        {isEdit ? (
                          <>
                            <button
                              onClick={() => handleSave(user.UserId)}
                              className="btn btn-warning mr-3"
                            >
                              Lưu
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEdit(user.UserId)}
                              className="btn btn-warning mr-3"
                            >
                              Sửa
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleDelete(user.UserId)}
                          className="btn btn-danger"
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  </>
                ) : (
                  <>
                    <tr key={index}>
                      <td>{index}</td>
                      <td style={{ maxWidth: 300, height: 100 }}>
                        <input type="text" value={user.Content} />
                      </td>
                      <td>
                        <input type="text" value={user.CreatedDate} />
                      </td>
                      <td>
                        <select value={user.Status} name="" id="">
                          <option value="">Pending</option>
                          <option value="">Reject</option>
                          <option value="">Fulfil</option>
                        </select>
                      </td>
                      <td>
                        <input type="text" value={user.CreatedBy} />
                      </td>
                      <td>
                        {isEdit ? (
                          <>
                            <button
                              onClick={() => handleSave(user.UserId)}
                              className="btn btn-warning mr-3"
                            >
                              Lưu
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEdit(user.UserId)}
                              className="btn btn-warning mr-3"
                            >
                              Sửa
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleDelete(user.UserId)}
                          className="btn btn-danger"
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </>
          </tbody>
        </table>
      </div>
    </>
  );
}

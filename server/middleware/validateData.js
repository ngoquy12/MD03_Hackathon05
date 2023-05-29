// Kiểm tra các giá trị bỏ trống
const checkIsEmpty = (field) => {
  if (field === undefined || field === null || field === "") {
    return true;
  } else {
    return false;
  }
};

// middleware validate dữ liệu
const validateData = (req, res, next) => {
  const { Content, CreatedDate, Status, CreatedBy } = req.body;
  if (checkIsEmpty(Content)) {
    return res.status(400).json({
      status: 400,
      message: "Nội dung không được phép để trống",
    });
  }
  if (checkIsEmpty(CreatedDate)) {
    return res.status(400).json({
      status: 400,
      message: "Ngày thêm không được phép để trống",
    });
  }
  if (checkIsEmpty(Status)) {
    return res.status(400).json({
      status: 400,
      message: "Trạng thái không được phép để trống",
    });
  }
  if (checkIsEmpty(CreatedBy)) {
    return res.status(400).json({
      status: 400,
      message: "Người thêm không được phép để trống",
    });
  }
  next();
};

// middleware validate dữ liệu
const validateData1 = (req, res, next) => {
  const { Content, CreatedDate, Status, CreatedBy } = req.body;
  if (Content.length < 10) {
    return res.status(400).json({
      message: "Nội dung không được dưới 10 ký tự",
    });
  }
  if (checkIsEmpty(CreatedDate)) {
    return res.status(400).json({
      message: "Ngày thêm không được phép để trống 1",
    });
  }
  if (checkIsEmpty(Status)) {
    return res.status(400).json({
      message: "Trạng thái không được phép để trống 1",
    });
  }
  if (checkIsEmpty(CreatedBy)) {
    return res.status(400).json({
      message: "Người thêm không được phép để trống 1",
    });
  }
  next();
};

module.exports = { validateData, validateData1 };

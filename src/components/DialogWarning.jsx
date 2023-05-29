import React from "react";

export default function DialogWarning(props) {
  const { title, closeDialog } = props;

  const handleClose = () => {
    closeDialog(closeDialog);
  };

  return (
    <>
      <div className=" m-delete-warning">
        <div className="m-dialog-box">
          <div className="m-dialog-center">
            <div className="m-dialog-background" />
            <div className="m-dialog-drag">
              <div className="m-dialog-message">
                <div className="m-dialog-content">
                  <div className="m-content-icon">
                    <div className="m-icon-48 m-icon-warning" />
                  </div>
                  <div className="m-content-message">{title}</div>
                </div>
                <div className="m-dialog-line" />
                <div
                  className="m-dialog-footer"
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <button
                    value={closeDialog}
                    onClick={handleClose}
                    className="m-button"
                    tabIndex={1}
                  >
                    <div className="m-btn-text">Đồng ý</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

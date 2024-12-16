import Button from "../button";

const Modal = ({
  isVisible = false,
  setIsVisible = () => {},
  onSave = () => {},
  title = "",
  showFooter = false,
  isLoading = false,
  disabled = false,
  children,
}) => {
  const close = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              close();
            }
          }}
        >
          <div
            className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
            role="document"
          >
            <div className="modal-content">
              {title && (
                <div className="modal-header">
                  <h5 className="modal-title">{title}</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={close}
                  ></button>
                </div>
              )}
              <div className="modal-body">{children}</div>
              {showFooter && (
                <div className="modal-footer">
                  <Button mode="secondary" onClick={close}>
                    Close
                  </Button>
                  <Button
                    isLoading={isLoading}
                    onClick={onSave}
                    disabled={disabled || isLoading}
                  >
                    Save changes
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Modal;

import React from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import "../Styles/modal.css";

const BorrowBooksCard = ({
  show,
  onHide,
  remainingRefBookCount,
  remainingLenBookCount,
}) => {
  BorrowBooksCard.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    remainingRefBookCount: PropTypes.number.isRequired,
    remainingLenBookCount: PropTypes.number.isRequired,
  };

  const handleModalClose = () => {
    onHide(false);
  };

  return (
    <Modal
      show={show}
      onHide={() => handleModalClose()}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      centered
      className="blur"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Borrow Books
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        <Alert variant="warning" className="rounded-0 row gx-0 mb-0">
          <div className="col-6">
            Remaining Lending Books : <span> {remainingLenBookCount} </span>
            <Button
              className="ms-3"
              variant="primary"
              disabled={remainingLenBookCount === 0}
              onClick={() => null}
            >
              Add Book
            </Button>
          </div>
          <div className="col-6">
            Remaining Reference Books : <span> {remainingRefBookCount} </span>
            <Button
              className="ms-3"
              variant="info"
              disabled={remainingRefBookCount === 0}
              onClick={() => null}
            >
              Add Book
            </Button>
          </div>
        </Alert>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={() => null}>
          Borrow
        </Button>
        <Button onClick={() => handleModalClose()} variant="secondary">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BorrowBooksCard;

import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { bookTypeEnum, userTypeEnum } from "../Shared/enums";
import "../Styles/modal.css";

const BorrowBooksCard = ({
  show,
  onHide,
  userType,
  remainingRefBookCount,
  remainingLenBookCount,
}) => {
  BorrowBooksCard.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    userType: PropTypes.string.isRequired,
    remainingRefBookCount: PropTypes.number.isRequired,
    remainingLenBookCount: PropTypes.number.isRequired,
  };

  const [remainingRefBooks, setRemainingRefBooks] = useState(
    remainingRefBookCount
  );
  const [remainingLenBooks, setRemainingLenBooks] = useState(
    remainingLenBookCount
  );
  const [bookList, setBookList] = useState([]);
  const [finalBookList, setFinalBookList] = useState([]);
  const [clickedButtonState, setClickedButtonState] = useState("");

  const handleModalClose = () => {
    onHide(false);
  };

  const handleAddRefBook = () => {
    setBookList((prevBooks) => [
      ...prevBooks,
      {
        recordID: bookList.length + 1,
        bookType: bookTypeEnum.REFERENCE,
        dueDate: dueDateCalculate(userType === userTypeEnum.STUDENT ? 1 : 3),
      },
    ]);
    setClickedButtonState(bookTypeEnum.REFERENCE);
    setRemainingRefBooks(remainingRefBooks - 1);
  };

  const handleAddLenBook = () => {
    setBookList((prevBooks) => [
      ...prevBooks,
      {
        recordID: bookList.length + 1,
        bookType: bookTypeEnum.LENDING,
        dueDate: dueDateCalculate(userType === userTypeEnum.STUDENT ? 14 : 30),
      },
    ]);
    setClickedButtonState(bookTypeEnum.LENDING);
    setRemainingLenBooks(remainingLenBooks - 1);
  };

  const handleRemoveBook = (recordID) => {
    const tempArr = bookList;
    const updatedArr = tempArr.filter((record) => record.recordID !== recordID);
    setBookList(updatedArr);
    if (clickedButtonState === bookTypeEnum.REFERENCE) {
      setRemainingRefBooks(remainingRefBooks + 1);
    } else {
      setRemainingLenBooks(remainingLenBooks + 1);
    }
  };

  function dueDateCalculate(days) {
    const today = new Date();
    const dueDateMilliSeconds = today.setDate(today.getDate() + days);
    const dueDate = new Date(dueDateMilliSeconds);
    return dueDate.toISOString().split("T")[0];
  }

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
      <Modal.Header closeButton className="bg-secondary">
        <Modal.Title id="contained-modal-title-vcenter">
          Borrow Books
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        <Alert variant="warning" className="rounded-0 row gx-0 mb-0">
          <div className="col-6">
            Remaining Lending Books : <span> {remainingLenBooks} </span>
            <Button
              className="ms-3"
              variant="primary"
              disabled={remainingLenBooks === 0}
              onClick={() => handleAddLenBook()}
            >
              Add Book
            </Button>
          </div>
          <div className="col-6">
            Remaining Reference Books : <span> {remainingRefBooks} </span>
            <Button
              className="ms-3"
              variant="info"
              disabled={remainingRefBooks === 0}
              onClick={() => handleAddRefBook()}
            >
              Add Book
            </Button>
          </div>
        </Alert>

        {bookList.map((item, index) => (
          <Card bg="dark" className="rounded-0" key={index}>
            <Card.Body>
              <div className="row">
                <div className="col-5">
                  <Form>
                    <Form.Control
                      type="text"
                      name="bookID"
                      required
                      placeholder="Enter Book ID"
                      className="bg-light"
                    />
                  </Form>
                </div>
                <div className="col-4">
                  <Form.Control
                    type="text"
                    name="dueDate"
                    required
                    disabled
                    value={item.dueDate}
                    className="bg-light"
                  />
                </div>
                <div className="col-3 text-end">
                  <Button variant="success">Add</Button>
                  <Button
                    variant="danger"
                    className="ms-3"
                    onClick={() => handleRemoveBook(item.recordID)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}
      </Modal.Body>
      <Modal.Footer className="bg-secondary">
        <Button
          variant="warning"
          disabled={finalBookList.length === 0}
          onClick={() => null}
        >
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

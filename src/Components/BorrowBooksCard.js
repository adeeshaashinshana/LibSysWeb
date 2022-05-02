import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { bookTypeEnum, userTypeEnum } from "../Shared/enums";
import { CREATE_BORROW_RECORD } from "../API/Mutation";
import "../Styles/modal.css";

const BorrowBooksCard = ({
  show,
  onHide,
  userID,
  userType,
  remainingRefBookCount,
  remainingLenBookCount,
  refetchData,
}) => {
  BorrowBooksCard.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    userID: PropTypes.string.isRequired,
    userType: PropTypes.string.isRequired,
    remainingRefBookCount: PropTypes.number.isRequired,
    remainingLenBookCount: PropTypes.number.isRequired,
    refetchData: PropTypes.func,
  };
  BorrowBooksCard.defaultProps = {
    refetchData: () => null,
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
        bookID: "",
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
        bookID: "",
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
    handleFinalBookList(updatedArr);
  };

  const handleAddBook = (event, recordID) => {
    event.preventDefault();

    const { bookID } = document.forms[recordID - 1];

    if (bookID.value !== "") {
      const itemIndex = bookList.findIndex(
        (record) => record.recordID === recordID
      );
      bookList[itemIndex].bookID = bookID.value;
    }

    handleFinalBookList(bookList);
  };

  const handleFinalBookList = (list) => {
    const tempArr = [];
    list.forEach((book) => {
      if (book.bookID !== "") {
        tempArr.push(book);
      }
    });
    setFinalBookList(tempArr);
  };

  function dueDateCalculate(days) {
    const today = new Date();
    const dueDateMilliSeconds = today.setDate(today.getDate() + days);
    const dueDate = new Date(dueDateMilliSeconds);
    return dueDate.toISOString().split("T")[0];
  }

  const handleBorrowBooks = () => {
    if (finalBookList.length > 0) {
      createBorrowRecord();
    }
  };

  const [createBorrowRecord] = useMutation(CREATE_BORROW_RECORD, {
    fetchPolicy: "network-only",
    variables: {
      borrowData: {
        userID: userID,
        borrowedBooks: finalBookList,
      },
    },
    async onCompleted({ createBorrow }) {
      if (createBorrow) {
        refetchData(true);
        handleModalClose();
      }
    },
  });

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

        {bookList.map((item) => (
          <Card bg="dark" className="rounded-0" key={item.recordID}>
            <Card.Body>
              <div className="row">
                <Form
                  className="row"
                  onSubmit={(e) => handleAddBook(e, item.recordID)}
                >
                  <div className="col-5">
                    <Form.Control
                      type="text"
                      name="bookID"
                      required
                      placeholder="Enter Book ID"
                      className="bg-light"
                    />
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
                    <Button variant="success" type="submit">
                      Add
                    </Button>
                    <Button
                      variant="danger"
                      className="ms-3"
                      onClick={() => handleRemoveBook(item.recordID)}
                    >
                      Remove
                    </Button>
                  </div>
                </Form>
              </div>
            </Card.Body>
          </Card>
        ))}
      </Modal.Body>
      <Modal.Footer className="bg-secondary">
        <Button
          variant="warning"
          disabled={finalBookList.length === 0}
          onClick={() => handleBorrowBooks()}
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

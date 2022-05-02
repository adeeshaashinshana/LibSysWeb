import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useQuery, useMutation } from "@apollo/client";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import {
  returnStatusEnum,
  fineStatusEnum,
  buttonTypeEnum,
} from "../Shared/enums";
import textStyler from "../Helper/textStyler";
import { GET_BORROWED_BOOKS_BY_ID } from "../API/Queries";
import { UPDATE_BORROW_STATUS, UPDATE_FINE_STATUS } from "../API/Mutation";

const ReturnBooksModal = ({ show, onHide, userID }) => {
  ReturnBooksModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    userID: PropTypes.string.isRequired,
  };

  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [clickedBorrowID, setClickedBorrowID] = useState("");
  const [clickedBookID, setClickedBookID] = useState("");
  const [clickedButtonType, setClickedButtonType] = useState("");

  const { refetch } = useQuery(GET_BORROWED_BOOKS_BY_ID, {
    fetchPolicy: "network-only",
    variables: {
      userId: userID,
    },
    async onCompleted({ getBorrowedBookByUserID }) {
      const tempRecord = [];
      await getBorrowedBookByUserID.forEach((record) => {
        record.borrowedBooks.forEach((book) => {
          if (
            book.returnState === returnStatusEnum.PENDING ||
            book.returnState === returnStatusEnum.OVERDUE
          ) {
            tempRecord.push({
              borrowID: record._id,
              borrowedDate: record.borrowDate.split("T")[0],
              list: book,
            });
          }
        });
      });
      setBorrowedBooks(tempRecord);
    },
  });

  const [updateBorrowState] = useMutation(UPDATE_BORROW_STATUS, {
    fetchPolicy: "network-only",
    variables: {
      borrowId: clickedBorrowID,
      bookId: clickedBookID,
      updateStatus: returnStatusEnum.RETURNED,
    },
    async onCompleted({ updateBorrowStatus }) {
      if (updateBorrowStatus) {
        refetch();
        setClickedBorrowID("");
        setClickedBookID("");
        setClickedButtonType("");
      }
    },
  });

  const [updateFineState] = useMutation(UPDATE_FINE_STATUS, {
    fetchPolicy: "network-only",
    variables: {
      borrowId: clickedBorrowID,
      bookId: clickedBookID,
      updateStatus: fineStatusEnum.PAID,
    },
    async onCompleted({ updateFineStatus }) {
      if (updateFineStatus) {
        refetch();
        setClickedBorrowID("");
        setClickedBookID("");
        setClickedButtonType("");
      }
    },
  });

  useEffect(() => {
    if (
      clickedBorrowID !== "" &&
      clickedBookID !== "" &&
      clickedButtonType === buttonTypeEnum.UPDATE
    ) {
      updateBorrowState();
    }
    if (
      clickedBorrowID !== "" &&
      clickedBookID !== "" &&
      clickedButtonType === buttonTypeEnum.PAY_FINE
    ) {
      updateFineState();
    }
  }, [clickedBorrowID, clickedBookID, clickedButtonType]);

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
      <Modal.Header closeButton className="bg-secondary">
        <Modal.Title id="contained-modal-title-vcenter">
          Return Books
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        {borrowedBooks.length > 0 ? (
          <Table
            striped
            bordered
            hover
            variant="dark"
            className="mb-0 text-center"
          >
            <thead>
              <tr>
                <th>Book ID</th>
                <th>Book Type</th>
                <th>Borrowed Date</th>
                <th>Due Date</th>
                <th>Return State</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {borrowedBooks.map((book, index) => (
                <tr key={index}>
                  <td> {book.list.bookID} </td>
                  <td> {textStyler(book.list.bookType)} </td>
                  <td> {book.borrowedDate} </td>
                  <td> {book.list.dueDate.split("T")[0]} </td>
                  <td> {textStyler(book.list.returnState)} </td>
                  <td>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => {
                        setClickedBorrowID(book.borrowID);
                        setClickedBookID(book.list.bookID);
                        setClickedButtonType(buttonTypeEnum.UPDATE);
                      }}
                    >
                      Return
                    </Button>
                    <Button
                      variant={book.list.fines === 0 ? "secondary" : "danger"}
                      size="sm"
                      className="ms-2"
                      disabled={book.list.fineState !== fineStatusEnum.UNPAID}
                      onClick={() => {
                        setClickedBorrowID(book.borrowID);
                        setClickedBookID(book.list.bookID);
                        setClickedButtonType(buttonTypeEnum.PAY_FINE);
                      }}
                    >
                      Pay Fine
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Alert variant="warning" className="rounded-0 row gx-0 mb-0">
            No any borrowed books with this UserID
          </Alert>
        )}
      </Modal.Body>
      <Modal.Footer className="bg-secondary">
        <Button onClick={() => handleModalClose()} variant="secondary">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReturnBooksModal;

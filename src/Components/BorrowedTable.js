import React, { useState } from "react";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/client";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import caseConverter from "../Helper/letterCaseConverter";
import {
  returnStatusEnum,
  fineStatusEnum,
  bookTypeEnum,
} from "../Shared/enums";
import { GET_BORROWED_BOOKS_BY_ID } from "../API/Queries";

const BorrowTable = ({ userID }) => {
  BorrowTable.propTypes = {
    userID: PropTypes.string.isRequired,
  };

  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useQuery(GET_BORROWED_BOOKS_BY_ID, {
    fetchPolicy: "network-only",
    variables: {
      userId: userID,
    },
    onCompleted({ getBorrowedBookByUserID }) {
      setBorrowedBooks(getBorrowedBookByUserID);
    },
  });

  const textStyler = (status) => {
    let textColor;

    switch (status) {
      case returnStatusEnum.PENDING:
        textColor = "text-warning";
        break;
      case returnStatusEnum.RETURNED:
        textColor = "text-success";
        break;
      case returnStatusEnum.OVERDUE:
        textColor = "text-danger";
        break;
      case bookTypeEnum.REFERENCE:
        textColor = "text-info";
        break;
      case bookTypeEnum.LENDING:
        textColor = "text-primary";
        break;
      case fineStatusEnum.NO_FINE:
        textColor = "text-light";
        break;
      case fineStatusEnum.PAID:
        textColor = "text-success";
        break;
      case fineStatusEnum.UNPAID:
        textColor = "text-danger";
        break;
      default:
        textColor = "text-light";
        break;
    }

    return <span className={textColor}> {caseConverter(status)} </span>;
  };

  return (
    <Table striped bordered hover variant="dark" className="my-5">
      <thead>
        <tr>
          <th>Borrow ID</th>
          <th>Book ID</th>
          <th>Book Type</th>
          <th>Borrowed Date</th>
          <th>Due Date</th>
          <th>Return State</th>
          <th>Returned Date</th>
          <th>Fines</th>
          <th>Fines State</th>
        </tr>
      </thead>
      <tbody>
        {borrowedBooks.map((record) =>
          record.borrowedBooks.map((book, index) => (
            <tr key={index}>
              <td> {record.borrowID} </td>
              <td> {book.bookID} </td>
              <td> {textStyler(book.bookType)} </td>
              <td> {record.borrowDate.split("T")[0]} </td>
              <td> {book.dueDate.split("T")[0]} </td>
              <td> {textStyler(book.returnState)} </td>
              <td>
                {book.returnedDate !== null
                  ? book.returnedDate.split("T")[0]
                  : "-"}
              </td>
              <td>
                {book.fines > 0 ? (
                  <Badge
                    bg={
                      book.fineState === fineStatusEnum.UNPAID
                        ? "danger"
                        : "secondary"
                    }
                  >
                    Rs. {book.fines} /=
                  </Badge>
                ) : (
                  "-"
                )}
              </td>
              <td> {textStyler(book.fineState)} </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};

export default BorrowTable;

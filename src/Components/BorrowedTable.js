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
  userTypeEnum,
} from "../Shared/enums";
import { GET_BORROWED_BOOKS_BY_ID } from "../API/Queries";

const BorrowTable = ({
  userID,
  userType,
  setUsedRefBooks,
  setUsedLenBooks,
}) => {
  BorrowTable.propTypes = {
    userID: PropTypes.string.isRequired,
    userType: PropTypes.string.isRequired,
    setUsedRefBooks: PropTypes.func.isRequired,
    setUsedLenBooks: PropTypes.func.isRequired,
  };

  const [borrowedBooks, setBorrowedBooks] = useState([]);
  let usedRefBooks = 0;
  let usedLenBooks = 0;

  useQuery(GET_BORROWED_BOOKS_BY_ID, {
    fetchPolicy: "network-only",
    variables: {
      userId: userID,
    },
    async onCompleted({ getBorrowedBookByUserID }) {
      const tempRecord = [];
      await getBorrowedBookByUserID.forEach((record) => {
        record.borrowedBooks.forEach((book) => {
          if (
            userType === userTypeEnum.STUDENT &&
            book.bookType === bookTypeEnum.REFERENCE
          ) {
            if (
              book.returnState === returnStatusEnum.PENDING ||
              book.returnState === returnStatusEnum.OVERDUE
            ) {
              usedRefBooks += 1;
            }
          } else if (
            userType === userTypeEnum.STUDENT &&
            book.bookType === bookTypeEnum.LENDING
          ) {
            if (
              book.returnState === returnStatusEnum.PENDING ||
              book.returnState === returnStatusEnum.OVERDUE
            ) {
              usedLenBooks += 1;
            }
          } else if (
            userType === userTypeEnum.STAFF_MEMBER &&
            book.bookType === bookTypeEnum.REFERENCE
          ) {
            if (
              book.returnState === returnStatusEnum.PENDING ||
              book.returnState === returnStatusEnum.OVERDUE
            ) {
              usedRefBooks += 1;
            }
          } else if (
            userType === userTypeEnum.STAFF_MEMBER &&
            book.bookType === bookTypeEnum.LENDING
          ) {
            if (
              book.returnState === returnStatusEnum.PENDING ||
              book.returnState === returnStatusEnum.OVERDUE
            ) {
              usedLenBooks += 1;
            }
          }
          const borrowedRecord = {
            borrowDate: record.borrowDate.split("T")[0],
            book,
          };
          tempRecord.push(borrowedRecord);
        });
      });
      setUsedRefBooks(usedRefBooks);
      setUsedLenBooks(usedLenBooks);
      setBorrowedBooks(tempRecord);
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
        {borrowedBooks.map((record, index) => (
          <tr key={index}>
            <td> {record.book.bookID} </td>
            <td> {textStyler(record.book.bookType)} </td>
            <td> {record.borrowDate} </td>
            <td> {record.book.dueDate.split("T")[0]} </td>
            <td> {textStyler(record.book.returnState)} </td>
            <td>
              {record.book.returnedDate !== null
                ? record.book.returnedDate.split("T")[0]
                : "-"}
            </td>
            <td>
              {record.book.fines > 0 ? (
                <Badge
                  bg={
                    record.book.fineState === fineStatusEnum.UNPAID
                      ? "danger"
                      : "secondary"
                  }
                >
                  Rs. {record.book.fines} /=
                </Badge>
              ) : (
                "-"
              )}
            </td>
            <td> {textStyler(record.book.fineState)} </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default BorrowTable;

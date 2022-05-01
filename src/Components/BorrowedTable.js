import React, { useState } from "react";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/client";
import Table from "react-bootstrap/Table";
import caseConverter from "../Helper/letterCaseConverter";
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
              <td> {caseConverter(book.bookType)} </td>
              <td> {record.borrowDate.split("T")[0]} </td>
              <td> {book.dueDate.split("T")[0]} </td>
              <td> {caseConverter(book.returnState)} </td>
              <td> {book.returnedDate !== null ? book.returnedDate : "-"} </td>
              <td> {book.fines > 0 ? book.fines : "-"} </td>
              <td> {caseConverter(book.fineState)} </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};

export default BorrowTable;

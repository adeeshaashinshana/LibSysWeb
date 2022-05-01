import React from "react";
import Table from "react-bootstrap/Table";

const BorrowTable = () => {
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
        <tr>
          <td>B001</td>
          <td>REF001</td>
          <td>Reference</td>
          <td>2022-05-02</td>
          <td>2022-05-02</td>
          <td>Pending</td>
          <td>-</td>
          <td>0</td>
          <td>No Fine</td>
        </tr>
        <tr>
          <td>B001</td>
          <td>LEN001</td>
          <td>Lending</td>
          <td>2022-05-02</td>
          <td>2022-05-16</td>
          <td>Pending</td>
          <td>-</td>
          <td>0</td>
          <td>No Fine</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default BorrowTable;

import { gql } from "@apollo/client";

// ------------- <<< Query for get user >>> -------------
export const GET_USER_BY_ID = gql`
  query GetUserByID($userId: String) {
    getUserByID(userID: $userId) {
      id
      userID
      userName
      userEmail
      userType
      userState
      totalFines
    }
  }
`;

// ------------- <<< Query for get Borrowed Books By UserID >>> -------------
export const GET_BORROWED_BOOKS_BY_ID = gql`
  query GetBorrowedBookByUserID($userId: String) {
    getBorrowedBookByUserID(userID: $userId) {
      _id
      userID
      borrowDate
      borrowedBooks {
        bookID
        bookType
        dueDate
        returnState
        returnedDate
        fines
        fineState
      }
    }
  }
`;

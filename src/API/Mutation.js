import gql from "graphql-tag";

// ------------- <<< Mutation for get Borrowed Books By UserID >>> -------------
export const CREATE_BORROW_RECORD = gql`
  mutation CreateBorrow($borrowData: BorrowInput) {
    createBorrow(borrowData: $borrowData) {
      _id
      userID
      borrowDate
      borrowedBooks {
        recordID
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

// ------------- <<< Mutation for update return status >>> -------------
export const UPDATE_BORROW_STATUS = gql`
  mutation UpdateBorrowStatus(
    $borrowId: ID
    $bookId: String
    $updateStatus: String
  ) {
    updateBorrowStatus(
      borrowID: $borrowId
      bookID: $bookId
      updateStatus: $updateStatus
    ) {
      _id
      userID
      borrowDate
      borrowedBooks {
        recordID
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

// ------------- <<< Mutation for update return status >>> -------------
export const UPDATE_FINE_STATUS = gql`
  mutation UpdateFineStatus(
    $borrowId: ID
    $userID: String
    $bookId: String
    $updateStatus: String
  ) {
    updateFineStatus(
      borrowID: $borrowId
      userID: $userID
      bookID: $bookId
      updateStatus: $updateStatus
    ) {
      _id
      userID
      borrowDate
      borrowedBooks {
        recordID
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

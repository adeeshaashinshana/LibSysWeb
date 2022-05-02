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

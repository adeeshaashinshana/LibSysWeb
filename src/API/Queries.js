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

import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import UserInfoCard from "../Components/UserInfoCard";
import { GET_USER_BY_ID } from "../API/Queries";

const InfoPage = () => {
  const [searchParams] = useSearchParams("");
  const userID = searchParams.get("userID");

  const initialUserInfo = {
    userName: "",
    userType: "",
    userState: "",
    userEmail: "",
    totalFines: 0,
  };

  const [userInfo, setUserInfo] = useState(initialUserInfo);

  const [getUserInfo] = useLazyQuery(GET_USER_BY_ID, {
    fetchPolicy: "network-only",
    variables: {
      userId: userID,
    },
    onCompleted({ getUserByID }) {
      if (getUserByID !== null) {
        setUserInfo(getUserByID);
      } else {
        setUserInfo(initialUserInfo);
      }
    },
  });

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  return (
    <div className="container h-100">
      {userInfo.userName !== "" ? (
        <>
          <UserInfoCard
            userID={userID}
            userState={userInfo.userState}
            userName={userInfo.userName}
            userType={userInfo.userType}
            userEmail={userInfo.userEmail}
            totalFine={userInfo.totalFines}
          />
          <Row className="mx-0">
            <Button as={Col} variant="danger">
              Pay Fine
            </Button>
            <Button as={Col} variant="warning" className="mx-2">
              Borrow Books
            </Button>
            <Button as={Col} variant="success">
              Return Books
            </Button>
          </Row>
        </>
      ) : (
        <Alert variant="danger" className="mt-5">
          No any user with this UserID
        </Alert>
      )}
    </div>
  );
};

export default InfoPage;

import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import UserInfoCard from "../Components/UserInfoCard";
import BorrowTable from "../Components/BorrowedTable";
import { userStateEnum } from "../Shared/enums";
import { GET_USER_BY_ID } from "../API/Queries";

const InfoPage = () => {
  const navigate = useNavigate();

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

  const HomePageButton = (
    <Button as={Col} variant="primary" onClick={() => navigate("/")}>
      Home Page
    </Button>
  );

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
            {HomePageButton}
            <Button as={Col} variant="danger" className="ms-5">
              Pay Fine
            </Button>
            <Button
              as={Col}
              variant="warning"
              className="mx-2"
              disabled={userInfo.userState === userStateEnum.SUSPEND}
            >
              Borrow Books
            </Button>
            <Button as={Col} variant="success">
              Return Books
            </Button>
          </Row>
          <BorrowTable userID={userID} />
        </>
      ) : (
        <>
          <Alert variant="danger" className="mt-5">
            No any user with this UserID
          </Alert>
          {HomePageButton}
        </>
      )}
    </div>
  );
};

export default InfoPage;

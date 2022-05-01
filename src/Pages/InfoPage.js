import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import UserInfoCard from "../Components/UserInfoCard";

const InfoPage = () => {
  const [searchParams] = useSearchParams("");
  const userID = searchParams.get("userID");

  const [userInfo, setUserInfo] = useState({
    userName: "Adeesha Mahalekam",
    userType: "STUDENT",
    userState: "ACTIVE",
    userEmail: "adeeshaashinshana@gmail.com",
    totalFine: 0,
  });

  return (
    <div className="container h-100">
      <UserInfoCard
        userID={userID}
        userState={userInfo.userState}
        userName={userInfo.userName}
        userType={userInfo.userType}
        userEmail={userInfo.userEmail}
        totalFine={userInfo.totalFine}
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
    </div>
  );
};

export default InfoPage;

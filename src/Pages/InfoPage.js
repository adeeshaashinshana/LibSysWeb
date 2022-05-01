import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import classNames from "classnames";
import { BsRecordFill } from "react-icons/bs";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

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
      <Card bg="dark" className="mt-5 mb-4">
        <Card.Header className="d-flex justify-content-between">
          <div className="text-light">
            User ID : <span> {userID} </span>
          </div>
          <div
            className={classNames("d-flex align-items-center", {
              "text-success": userInfo.userState === "ACTIVE",
              "text-danger": userInfo.userState === "SUSPEND",
            })}
          >
            <BsRecordFill className="me-1" />
            <span> {userInfo.userState} </span>
          </div>
        </Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item className="bg-dark text-light text-start">
            <div className="row">
              <div className="col-8">
                User Name : <span> {userInfo.userName} </span>
              </div>
              <div className="col-4">
                User Type : <span> {userInfo.userType} </span>
              </div>
            </div>
          </ListGroup.Item>
          <ListGroup.Item className="bg-dark text-light text-start">
            <div className="row">
              <div className="col-8">
                User Email : <span> {userInfo.userEmail} </span>
              </div>
              <div className="col-4">
                Total Fines : Rs.<span> {userInfo.totalFine} </span>
              </div>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Card>
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

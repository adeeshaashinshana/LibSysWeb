import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { BsRecordFill } from "react-icons/bs";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import caseConverter from "../Helper/letterCaseConverter";
import { userStateEnum } from "../Shared/enums";

const UserInfoCard = ({
  userID,
  userState,
  userName,
  userType,
  userEmail,
  totalFine,
}) => {
  UserInfoCard.propTypes = {
    userID: PropTypes.string.isRequired,
    userState: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    userType: PropTypes.string.isRequired,
    userEmail: PropTypes.string.isRequired,
    totalFine: PropTypes.number.isRequired,
  };

  return (
    <Card bg="dark" className="mt-5 mb-4">
      <Card.Header className="d-flex justify-content-between">
        <div className="text-light">
          User ID : <span> {userID} </span>
        </div>
        <div
          className={classNames("d-flex align-items-center", {
            "text-success": userState === userStateEnum.ACTIVE,
            "text-danger": userState === userStateEnum.SUSPEND,
          })}
        >
          <BsRecordFill className="me-1" />
          <span>{caseConverter(userState)}</span>
        </div>
      </Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item className="bg-dark text-light text-start">
          <div className="row">
            <div className="col-8">
              User Name : <span> {userName} </span>
            </div>
            <div className="col-4">
              User Type : <span> {caseConverter(userType)} </span>
            </div>
          </div>
        </ListGroup.Item>
        <ListGroup.Item className="bg-dark text-light text-start">
          <div className="row">
            <div className="col-8">
              User Email : <span> {userEmail} </span>
            </div>
            <div className="col-4">
              <div className="d-flex align-items-center">
                Total Fines :{" "}
                <span className="ms-1">
                  {totalFine > 0 ? (
                    <Badge bg="danger">Rs. {totalFine} /=</Badge>
                  ) : (
                    "No any fines"
                  )}
                </span>
              </div>
            </div>
          </div>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default UserInfoCard;

import React, { useState, useEffect } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { useLazyQuery, useMutation } from "@apollo/client";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { FaSpinner } from "react-icons/fa";
import { GET_USER_BY_ID } from "../API/Queries";
import { CREATE_USER } from "../API/Mutation";
import { userTypeEnum } from "../Shared/enums";

const LoginPage = () => {
  const navigate = useNavigate();

  const [isSignIn, setIsSignIn] = useState(false);
  const [isStudent, setIsStudent] = useState(true);
  const [userIdValue, setUserIdValue] = useState("");
  const [userEmailValue, setUserEmailValue] = useState("");
  const [userNameValue, setUserNameValue] = useState("");
  const [userTypeValue, setUserTypeValue] = useState(userTypeEnum.STUDENT);
  const [errorAlert, setErrorAlert] = useState("");

  const initialValues = () => {
    setUserIdValue("");
    setUserEmailValue("");
    setUserNameValue("");
    setErrorAlert("");
  };

  const [getUser, { loading: getUserLoading }] = useLazyQuery(GET_USER_BY_ID, {
    fetchPolicy: "network-only",
    variables: {
      userId: userIdValue,
    },
    onCompleted({ getUserByID }) {
      initialValues();
      if (getUserByID) {
        navigate({
          pathname: "borrowInfo",
          search: `?${createSearchParams({
            userID: getUserByID.userID,
          })}`,
        });
      } else {
        setErrorAlert("No any user with this ID");
      }
    },
  });

  const [createNewUser, { loading: createUserLoading }] = useMutation(
    CREATE_USER,
    {
      fetchPolicy: "network-only",
      variables: {
        newUser: {
          userID: userIdValue,
          userName: userNameValue,
          userEmail: userEmailValue,
          userType: userTypeValue,
        },
      },
      async onCompleted({ createUser }) {
        initialValues();
        if (createUser) {
          navigate({
            pathname: "borrowInfo",
            search: `?${createSearchParams({
              userID: createUser.userID,
            })}`,
          });
        } else {
          setErrorAlert("Unable to create user now! Try again later!");
        }
      },
    }
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { userID, userEmail, userName } = document.forms[0];

    if (
      isSignIn &&
      userID.value !== "" &&
      userEmail.value !== "" &&
      userName.value !== ""
    ) {
      setUserIdValue(userID.value);
      setUserEmailValue(userEmail.value);
      setUserNameValue(userName.value);
    }

    if (!isSignIn && userID.value !== "") {
      setUserIdValue(userID.value);
    }
  };

  useEffect(() => {
    if (userIdValue !== "" && userEmailValue === "" && userNameValue === "") {
      getUser();
    }
    if (userIdValue !== "" && userEmailValue !== "" && userNameValue !== "") {
      createNewUser();
    }
  }, [userIdValue, userEmailValue, userNameValue]);

  useEffect(() => {
    if (isStudent) {
      setUserTypeValue(userTypeEnum.STUDENT);
    } else {
      setUserTypeValue(userTypeEnum.STAFF_MEMBER);
    }
  }, [isStudent]);

  useEffect(() => {
    if (errorAlert !== "") {
      setTimeout(() => {
        setErrorAlert("");
      }, 3500);
    }
  }, [errorAlert]);

  return (
    <div className="container h-100">
      <div className="row justify-content-center h-100">
        <div className="col-8 mt-5">
          <Card bg="secondary">
            <Card.Body className="my-5">
              <Form onSubmit={handleSubmit}>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formBasicUserID"
                >
                  <Form.Label column sm={isSignIn ? "3" : "12"}>
                    User ID
                  </Form.Label>
                  <Col className={isSignIn ? "me-3" : "mx-3"}>
                    <Form.Control
                      type="text"
                      name="userID"
                      required
                      placeholder="Enter UserID"
                      className="bg-light"
                    />
                  </Col>
                </Form.Group>

                {isSignIn && (
                  <>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formBasicEmail"
                    >
                      <Form.Label column sm="3">
                        User Email
                      </Form.Label>
                      <Col className="me-3">
                        <Form.Control
                          type="email"
                          name="userEmail"
                          required={isSignIn}
                          placeholder="Enter email"
                          className="bg-light"
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formBasicUserName"
                    >
                      <Form.Label column sm="3">
                        User Name
                      </Form.Label>
                      <Col className="me-3">
                        <Form.Control
                          type="text"
                          name="userName"
                          required={isSignIn}
                          placeholder="Enter User Name"
                          className="bg-light"
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formBasicEmail"
                    >
                      <Form.Label column sm="3">
                        User Type
                      </Form.Label>
                      <Col className="me-3">
                        <Form.Select
                          aria-label="Select User Type"
                          onChange={() => setIsStudent(!isStudent)}
                        >
                          <option value="1">Student</option>
                          <option value="2">Staff Member</option>
                        </Form.Select>
                      </Col>
                    </Form.Group>
                  </>
                )}

                {errorAlert !== "" && (
                  <Alert variant="danger" className="mx-3">
                    {errorAlert}
                  </Alert>
                )}

                {isSignIn ? (
                  <>
                    <Button
                      variant="secondary"
                      onClick={() => setIsSignIn(false)}
                    >
                      Back to Login
                    </Button>
                    <Button
                      variant="dark"
                      type="submit"
                      className="ms-2"
                      disabled={createUserLoading}
                    >
                      {createUserLoading ? (
                        <div className="d-flex align-items-center">
                          <FaSpinner className="loader me-2" />
                          <div> Signing In...</div>
                        </div>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="dark"
                      type="submit"
                      disabled={getUserLoading}
                    >
                      {getUserLoading ? (
                        <div className="d-flex align-items-center">
                          <FaSpinner className="loader me-2" />
                          <div> Login...</div>
                        </div>
                      ) : (
                        "Login"
                      )}
                    </Button>
                    <Button
                      variant="dark"
                      className="ms-2"
                      onClick={() => setIsSignIn(true)}
                    >
                      Sign In
                    </Button>
                  </>
                )}
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

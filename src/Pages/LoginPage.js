import React from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { userID } = document.forms[0];

    if (userID.value !== "") {
      navigate({
        pathname: "borrowInfo",
        search: `?${createSearchParams({
          userID: userID.value,
        })}`,
      });
    }
  };

  return (
    <div className="container h-100">
      <div className="row justify-content-center h-100">
        <div className="col-8 mt-5">
          <Card bg="secondary">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>User ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="userID"
                    required
                    placeholder="Enter UserID"
                    className="bg-light"
                  />
                </Form.Group>

                <Button variant="dark" type="submit">
                  View User Details
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const LoginPage = () => {
  return (
    <div className="container h-100">
      <div className="row justify-content-center h-100">
        <div className="col-8 mt-5">
          <Card bg="secondary">
            <Card.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>User ID</Form.Label>
                  <Form.Control
                    type="text"
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

import React from "react";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

const InfoPage = () => {
  return (
    <div className="container h-100">
      <Row className="mx-0">
        <Button as={Col} variant="primary">
          Button #1
        </Button>
        <Button as={Col} variant="secondary" className="mx-2">
          Button #2
        </Button>
        <Button as={Col} variant="success">
          Button #3
        </Button>
      </Row>
    </div>
  );
};

export default InfoPage;

import React, { useState } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";
import { Form, Col, Button } from "react-bootstrap";

function PaymentScreen() {
  const [paymentMethod, setPaymentMethod] = useState("Razorpay");

  const submitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as="legend">Select Method</Form.Label>
            <Col>
              <Form.Check
                className="my-2"
                type="radio"
                label="Razorpay"
                id="Razorpay"
                name="paymentMethod"
                value="Razorpay"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>
          <Button type="submit" variant="primary">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
}

export default PaymentScreen;

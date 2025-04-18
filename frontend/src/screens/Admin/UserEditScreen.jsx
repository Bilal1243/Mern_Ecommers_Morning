import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import FormContainer from "../../components/FormContainer";
import {
  useUpdateUserMutation,
  useGetUserDetailsQuery,
} from "../../slices/userApiSlice";
import { toast } from "react-toastify";

function UserEditScreen() {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const { data: user, isLoading, error } = useGetUserDetailsQuery(id);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user?.name);
      setEmail(user?.email);
    }
  }, [user]);

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
}

export default UserEditScreen;

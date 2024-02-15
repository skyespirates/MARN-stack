import { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/button";

import { gql, useMutation } from "@apollo/client";

const USER_MUTATION = gql`
  mutation Mutation(
    $firstName: String!
    $lastName: String!
    $email: String!
    $address: String!
  ) {
    registerUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      address: $address
    ) {
      firstName
      lastName
      email
      address
    }
  }
`;

const App = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [createMutation] = useMutation(USER_MUTATION);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      firstName,
      lastName,
      email,
      address,
    };
    createMutation({
      variables: {
        ...formData,
      },
    });
    console.log("data created");
  };

  return (
    <div className="row py-5">
      <div className="col-6" style={{ margin: "0 auto" }}>
        <h1 className="mb-4">Register Account</h1>
        <Form onSubmit={handleSubmit}>
          <div className="row">
            <Form.Group className="mb-3 col-6" controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                placeholder="skyes"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3 col-6" controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="crawford"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="skyes@email.com"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                as="textarea"
                rows={3}
                required
              />
            </Form.Group>
            <div className="d-grid">
              <Button type="submit">Submit</Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default App;

import Button from "react-bootstrap/button";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";

import { gql, useQuery } from "@apollo/client";

const HELLO_QUERY = gql`
  query Query {
    hello
  }
`;

const App = () => {
  const { data, loading, error } = useQuery(HELLO_QUERY);

  if (loading) return <p>Loading...</p>;

  if (error) {
    console.log(error);
    return <p>Something went wrong!</p>;
  }

  console.log(data);
  return (
    <div>
      <Alert>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime,
        asperiores!
      </Alert>
      <Button variant="primary">Hehe</Button>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="/image.jpeg" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card&apos;s content.
          </Card.Text>
          <div className="d-grid">
            <Button variant="primary">Go somewhere</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default App;

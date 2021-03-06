import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container, Button } from "react-bootstrap";

import { API } from "../config/api";
import CardDonate from "../components/CardDonate";

const Raisefund = () => {
  const [myfunds, setMyFunds] = useState([]);
  const loadTodos = async () => {
    try {
      const response = await API.get(`/funds`);
      setMyFunds(response.data.data.fund);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <Container>
      <Row style={{ marginTop: "79px" }}>
        <Col>
          <h2>My Raise Found</h2>
        </Col>
        <Col style={{ textAlign: "right" }}>
          <Button as={Link} to="/formmakefund" className="btn-donate-catalog">
            Make Raise Fund
          </Button>
        </Col>
      </Row>
      <Row>
        {myfunds?.map((fund) => {
          return (
            <Col className="mr-4 mb-5" style={{ maxWidth: "330px" }}>
              <CardDonate donateList={fund} tes="viewFund" />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Raisefund;

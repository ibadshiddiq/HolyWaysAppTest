import { useContext, useState, useEffect } from "react";
import { Row, Col, Container, Figure, Card } from "react-bootstrap";
import { API } from "../config/api";
import { convertToRupiah } from "../utils";
import { UserContext } from "../contexts/userContext";

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const [state, dispatch] = useContext(UserContext);
  const loadTodos = async (id) => {
    try {
      const response = await API.get(`/userss/` + id);
      setProfile(response.data.data.users);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(state);
  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <Container className="profile-container">
      <Row>
        <Col className="myprofile">My Profile</Col>

        <Col className="myprofile">History Donation</Col>
      </Row>
      <Row style={{ marginTop: "30px" }}>
        <Col md="auto" className="myprofile">
          <Figure.Image src={profile?.thumbnail} />
        </Col>
        <Col style={{ marginLeft: "28px" }}>
          <div className="mb-4">
            <Card.Text
              style={{ color: "#c32424", fontSize: "larger" }}
              className="mb-0 font-weight-bold"
            >
              Full Name
            </Card.Text>
            <Card.Text>{state.user.fullName}</Card.Text>
          </div>
          <div className="mb-4">
            <Card.Text
              style={{ color: "#c32424", fontSize: "larger" }}
              className="mb-0 font-weight-bold"
            >
              Email
            </Card.Text>
            <Card.Text>{profile?.email}</Card.Text>
          </div>
          <div>
            <Card.Text
              style={{ color: "#c32424", fontSize: "larger" }}
              className="mb-0 font-weight-bold"
            >
              Phone
            </Card.Text>
            <Card.Text>{profile?.phone}</Card.Text>
          </div>
        </Col>
        <Col xs={6}>
          {profile?.donationList?.map((asd) => (
            <Card style={{ width: "auto" }}>
              <Card.Body>
                <Card.Title style={{ marginLeft: "23px", marginTop: "16px" }}>
                  {asd.title}
                </Card.Title>
                <Card.Text style={{ marginLeft: "23px" }}>
                  {asd.updatedAt}
                </Card.Text>
                <Row>
                  <Col style={{ marginLeft: "23px" }}>
                    Total : {convertToRupiah(asd.amount)}
                  </Col>
                  {asd.status == "Finished" ? (
                    <Col
                      xs={6}
                      md={3}
                      style={{
                        background: "rgba(0, 255, 117, 0.1)",
                        marginRight: "23px",
                        textAlign: "center",
                        color: "rgba(0, 255, 71, 1)",
                        fontWeight: "Bold",
                      }}
                    >
                      {asd.status}
                    </Col>
                  ) : (
                    <Col
                      xs={6}
                      md={3}
                      style={{
                        background: "rgba(255, 117,0, 0.1)",
                        marginRight: "23px",
                        textAlign: "center",
                        color: "rgba(255, 71, 0, 1)",
                        fontWeight: "Bold",
                      }}
                    >
                      {asd.status}
                    </Col>
                  )}
                </Row>
                <div></div>
                <div
                  style={{
                    width: "112 px",
                    height: "19px",
                  }}
                ></div>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;

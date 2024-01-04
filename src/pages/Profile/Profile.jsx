import { useEffect } from "react";
import { Col, Nav, Row, Tab, Button, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userDetails } from "../userSlice";
import DataProfile from "../DataProfile/DataProfile";
import { ToastContainer } from "../../common/CustomToasty/CustomToasty";
import "./Profile.css"

export const Profile = () => {
  const navigate = useNavigate();
  const token = useSelector(userDetails);

  useEffect(() => {
    if (token.credentials == "") {
      navigate("/");
    }

    
  }, []);

  return (
    <>
      <ToastContainer />
      <Container className="py-5">
        <Row>
          <Col>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row>
                <Col sm={3}>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Tus datos</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">
                        Tu lista de counters
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={9}>
                  <Tab.Content className="cajaTabs">
                    <Tab.Pane eventKey="first">
                      <DataProfile />{" "}
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      {" "}
                      <Button
                        onClick={() => {
                          navigate("/createList");
                        }}
                      >
                        {" "}
                        Agregar lista
                      </Button>{" "}
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Col>
        </Row>
      </Container>
      
    </>
  );
};

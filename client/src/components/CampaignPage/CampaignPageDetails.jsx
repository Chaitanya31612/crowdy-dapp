import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Card, CardBody, Col, Row } from "reactstrap";

const CampaignPageDetails = () => {
  const history = useHistory();

  const cards = [
    {
      title: "Collected Amount",
      text: 100,
      iconClass: "bx bx-copy-alt",
    },
    {
      title: "Minimum Contribution",
      text: 5,
      iconClass: "bx bx-copy-alt",
    },
    {
      title: "Pending Requests",
      text: 2,
      iconClass: "bx bx-copy-alt",
    },
    {
      title: "Total Contributors",
      text: 3,
      iconClass: "bx bx-copy-alt",
    },
  ];
  return (
    <div className="campaigndetails">
      <Row
        lg="auto"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 className="campaigndetails__heading">Campaign Details</h1>
        <Button
          to={`/`}
          className="p-3 mb-5 me-4 fs-5 text-decoration-none"
          color="primary"
          style={{ cursor: "pointer", fontWeight: "bold" }}
          onClick={() => history.push("/")}
        >
          View Requests
        </Button>
      </Row>

      <Row className="campaigndetails__details">
        {cards.map((card, key) => (
          <Col md={"3"} key={"_col_" + key}>
            <Card className="campaigndetails__details--card">
              <CardBody>
                <div className="d-flex">
                  <div className="flex-grow-1">
                    <p className="text-muted fw-medium campaigndetails__details--card-title">
                      {card.title}
                    </p>
                    <h4 className="mb-0 campaigndetails__details--card-value">
                      {card.text}
                    </h4>
                  </div>
                  {/* <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                      <span className="avatar-title rounded-circle bg-primary">
                        <i className={card.iconClass + " font-size-24"}></i>
                      </span>
                    </div> */}
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CampaignPageDetails;

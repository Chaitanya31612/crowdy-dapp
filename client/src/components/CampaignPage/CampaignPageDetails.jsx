import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import { useEth } from "../../contexts/EthContext";
import setCampaingArtifact from "../../contexts/EthContext/setCampaingArtifact";

const CampaignPageDetails = ({ campaignSummary, address }) => {
  const history = useHistory();

  const cards = [
    {
      title: "Collected Amount (wei)",
      text: campaignSummary.amount,
      iconClass: "bx bx-copy-alt",
    },
    {
      title: "Minimum Contribution (wei)",
      text: campaignSummary.minContribution,
      iconClass: "bx bx-copy-alt",
    },
    {
      title: "Total Spending Requests",
      text: campaignSummary.noRequests,
      iconClass: "bx bx-copy-alt",
    },
    {
      title: "Total Number of Contributions",
      text: campaignSummary.noContributors,
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
        <Link
          to={`/campaigns/${address}/requests`}
          className="p-3 mb-5 me-4 fs-5 text-decoration-none text-white bg-primary rounded"
          color="primary"
          style={{ cursor: "pointer", fontWeight: "bold" }}
          onClick={() => history.push("/")}
        >
          View Requests
        </Link>
      </Row>

      <Row>
        {/* <Col lg="auto"> */}
        <div className="page__title text-primary text-decoration-underline fw-bold mb-3">
          {campaignSummary.campaignName}
        </div>
        <div className="page__title fw-normal text-muted mb-5 fs-3">
          {campaignSummary.campaignDescription}
        </div>
        {/* manager */}
        <div className="page__title fw-bold text-muted mb-3 fs-5">Manager:</div>
        <div className="page__title fw-normal text-muted mb-5 fs-3">
          {campaignSummary.manager}
        </div>
        {/* </Col> */}
      </Row>

      <br />

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

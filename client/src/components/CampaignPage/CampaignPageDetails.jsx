import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import { useEth } from "../../contexts/EthContext";
import setCampaingArtifact from "../../contexts/EthContext/setCampaingArtifact";

const CampaignPageDetails = ({ campaignSummary, address }) => {
  const cards = [
    {
      title: `Collected Amount (${campaignSummary?.denomination})`,
      text: campaignSummary.amount,
    },
    {
      title: "Minimum Contribution (wei)",
      text: campaignSummary.minContribution,
    },
    {
      title: "Total Spending Requests",
      text: campaignSummary.noRequests,
    },
    {
      title: "Total Number of Contributions",
      text: campaignSummary.noContributors,
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
        >
          View Requests
        </Link>
      </Row>

      <br />
      <br />
      <Row>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div className="page__subtitle--left fs-2 text-primary fw-bold mb-3">
              {campaignSummary.campaignName}
            </div>
            <div className="page__subtitle--left fw-normal text-muted mb-5 fs-4">
              {campaignSummary.campaignDescription}
            </div>
          </div>
          <div>
            {/* manager */}
            <div className="page__subtitle--left fs-3 fw-bold text-muted mb-3">
              Manager:
            </div>
            <div className="page__subtitle--left fw-normal text-muted mb-5 fs-3">
              {campaignSummary.manager}
            </div>
          </div>
        </div>
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

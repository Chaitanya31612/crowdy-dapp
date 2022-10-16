import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import { useEth } from "../../contexts/EthContext";

const CampaignsList = () => {
  const {
    state: { compaignFactoryContract },
  } = useEth();

  const [campaigns, setCampaigns] = useState([]);
  const [cardHover, setCardHover] = useState(false);
  const [cardHoverId, setCardHoverId] = useState("");

  useEffect(() => {
    const getCampaigns = async () => {
      if (compaignFactoryContract) {
        const campaigns = await compaignFactoryContract.methods
          .getDeployedCampaigns()
          .call();
        setCampaigns(campaigns);
      }
    };
    getCampaigns();
    // console.log("called");
  }, [compaignFactoryContract]);

  console.log(campaigns);
  return (
    <div className="campaignslist">
      <h1 className="page__title">Live Campaigns List</h1>
      {/* <br />
      <br /> */}

      <div className="mt-5 campaignslist__list">
        {campaigns
          .slice(0)
          .reverse()
          .map((campaign, index) => (
            <Link
              to={`/campaigns/${campaign}`}
              key={index}
              onMouseOver={() => {
                setCardHover(true);
                setCardHoverId(index);
              }}
              onMouseOut={() => {
                setCardHover(false);
                setCardHoverId("");
              }}
              className="my-3 w-100 text-decoration-none campaignslist__list__card"
              color="light"
            >
              {/* <CardHeader>Header</CardHeader> */}
              {/* <CardBody> */}
              <CardTitle
                tag="h5"
                className="fs-3"
                style={{ fontWeight: "bold", color: "#233" }}
              >
                {campaign}
              </CardTitle>
              <div style={{ display: "flex", alignItems: "center" }}>
                {cardHover && cardHoverId === index ? (
                  <span
                    style={{ fontWeight: "light" }}
                    className="text-primary fs-5 me-3"
                  >
                    View Campaign{" "}
                  </span>
                ) : null}
                <i
                  className={
                    cardHover && cardHoverId === index
                      ? "mdi mdi-arrow-right-drop-circle fs-2 text-primary"
                      : "mdi mdi-arrow-right-drop-circle-outline fs-2 text-primary"
                  }
                />
              </div>
              {/* </CardBody> */}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default CampaignsList;

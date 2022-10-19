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
    state: { campaignFactoryContract },
  } = useEth();

  const [campaigns, setCampaigns] = useState([]);
  const [campaignsData, setCampaignsData] = useState([]);
  const [cardHover, setCardHover] = useState(false);
  const [cardHoverId, setCardHoverId] = useState("");

  useEffect(() => {
    const getCampaigns = async () => {
      if (campaignFactoryContract) {
        // const campaigns = await campaignFactoryContract.methods
        //   .getDeployedCampaigns()
        //   .call();
        // setCampaigns(campaigns);
        const campainsData = await campaignFactoryContract.methods
          .getDeployedCampaignsData()
          .call();
        setCampaignsData(campainsData);
      }
    };
    getCampaigns();
    // console.log("called");
  }, [campaignFactoryContract]);

  console.log(campaignsData);
  return (
    <div className="campaignslist">
      <h1 className="page__title">Live Campaigns List</h1>
      {/* <br />
      <br /> */}

      <div className="mt-5 campaignslist__list">
        {campaignsData
          .slice(0)
          .reverse()
          .map((campaign, index) => (
            <Link
              to={`/campaigns/${campaign[0]}`}
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
              {/* <CardHeader className="campaignslist__list__card__title">
                <span>{campaign[1]}</span>
                <p className="campaignslist__list__card__description">
                  {campaign[2]}
                </p>
              </CardHeader> */}
              {/* <CardBody> */}
              <div>
                <h3 className="campaignslist__list__card__title">
                  {campaign[1]}
                </h3>
                <p className="campaignslist__list__card__description">
                  {campaign[2]}
                </p>

                <CardTitle
                  tag="h5"
                  className="fs-3"
                  style={{ fontWeight: "bold", color: "#233" }}
                >
                  {campaign[0]}
                </CardTitle>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                {/* {cardHover && cardHoverId === index ? ( */}
                <span
                  style={{ fontWeight: "light" }}
                  className={
                    cardHover && cardHoverId === index
                      ? "text-primary fs-5 me-3 visible"
                      : "text-primary fs-5 me-3 invisible"
                  }
                >
                  View Campaign{" "}
                </span>
                {/* ) : null} */}
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

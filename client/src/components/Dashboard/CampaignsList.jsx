import React, { useEffect, useState } from "react";
import { useEth } from "../../contexts/EthContext";

const CampaignsList = () => {
  const {
    state: { compaignFactoryContract },
  } = useEth();

  const [campaigns, setCampaigns] = useState([]);

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
      <h1 className="campaignslist__title">Live Campaigns List</h1>
    </div>
  );
};

export default CampaignsList;

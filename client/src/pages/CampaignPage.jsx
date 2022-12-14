import React, { useEffect, useState } from "react";
import {
  CampaignPageDetails,
  ContributeForm,
} from "../components/CampaignPage";
import Header from "../components/Header";
import { useEth } from "../contexts/EthContext";
import setCampaingArtifact from "../contexts/EthContext/setCampaingArtifact";

const CampaignPage = ({ match: { params } }) => {
  const {
    state: { web3 },
    dispatch,
  } = useEth();
  const [campaignContract, setCampaignContract] = useState(null);
  const [campaignSummary, setCampaignSummary] = useState({
    minContribution: 0,
    amount: 0,
    noRequests: 0,
    noContributors: 0,
    manager: "",
    campaignName: "",
    campaignDescription: "",
  });

  const getSummary = async () => {
    const summary = await campaignContract.methods.getSummary().call();
    setCampaignSummary({
      minContribution: summary[0],
      // amount: web3.utils.fromWei(summary[1], "ether"),
      amount:
        summary[1] >= 1000000000000000000n
          ? web3.utils.fromWei(summary[1], "ether")
          : summary[1],
      denomination: summary[1] >= 1000000000000000000n ? "ETH" : "wei",
      noRequests: summary[2],
      noContributors: summary[3],
      manager: summary[4],
      campaignName: summary[5],
      campaignDescription: summary[6],
    });
  };

  useEffect(() => {
    const init = async () => {
      const data = await setCampaingArtifact(params.id);
      dispatch({ type: "SET_CAMPAIGN_ARTIFACT", data });
      // console.log("data", data);
      setCampaignContract(data?.campaignContract);
    };
    init();
  }, []);

  useEffect(() => {
    if (campaignContract) {
      getSummary();
    }
  }, [campaignContract]);

  return (
    <div>
      {/* <Header /> */}
      <div className="p-5">
        <CampaignPageDetails
          campaignSummary={campaignSummary}
          address={params.id}
        />
        <ContributeForm
          campaignContract={campaignContract}
          getSummary={getSummary}
        />
      </div>
    </div>
  );
};

export default CampaignPage;

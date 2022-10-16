import React from "react";
import {
  CampaignPageDetails,
  ContributeForm,
} from "../components/CampaignPage";
import Header from "../components/Header";

const CampaignPage = ({ match: { params } }) => {
  return (
    <div>
      <Header />
      <div className="p-5">
        <CampaignPageDetails id={params.id} />
        <ContributeForm id={params.id} />
      </div>
    </div>
  );
};

export default CampaignPage;

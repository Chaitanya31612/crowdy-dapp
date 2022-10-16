import React from "react";
import { CreateCampaignForm } from "../components/CreateCampaign";
import Header from "../components/Header";

const CreateCampaign = () => {
  return (
    <div>
      <Header />
      <div className="p-5">
        <CreateCampaignForm />
      </div>
    </div>
  );
};

export default CreateCampaign;

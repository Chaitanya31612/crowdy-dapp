import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import { useEth } from "../../contexts/EthContext";

const CreateCampaignButton = () => {
  const history = useHistory();
  console.log("createbutton");
  return (
    <div>
      {/* go to /new page */}
      <Button
        className="p-3 mb-5 fs-4"
        color="primary"
        style={{ cursor: "pointer" }}
        onClick={() => history.push("/new")}
      >
        Create Campaign
        <i className="mdi mdi-plus-circle-outline ms-1 fs-5" />
      </Button>
    </div>
  );
};

export default CreateCampaignButton;

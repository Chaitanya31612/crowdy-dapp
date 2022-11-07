import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import LoadingButton from "../Common/LoadingButton";
import { useEth } from "../../contexts/EthContext";
import { useHistory } from "react-router-dom";

const CreateCampaignForm = () => {
  const {
    state: { campaignFactoryContract, accounts },
  } = useEth();
  const history = useHistory();

  const [campaignName, setCampaignName] = useState("");
  const [campaignDescription, setCampaignDescription] = useState("");
  const [minimumContribution, setMinimumContribution] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);
    setDisabled(true);
    try {
      setLoading(true);
      await campaignFactoryContract.methods
        .createCampaign(campaignName, campaignDescription, minimumContribution)
        .send({ from: accounts[0] });
      setLoading(false);
      setDisabled(false);
      history.push("/dashboard");
    } catch (error) {
      setLoading(false);
      setDisabled(false);
      setErrorMessage(error.message);
      console.log(error);
    }
  };

  return (
    <div className="create_campaign">
      <h1 className="page__title">Create new Campaign</h1>
      <br />
      <br />
      <br />
      <Form onSubmit={handleFormSubmit} className="create_campaign__form">
        <FormGroup style={{ width: "100%" }}>
          <Input
            className="mb-3 p-3 fs-4"
            type="text"
            name="title"
            id="title"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            placeholder="Campaign Title"
          />
          <FormFeedback>Invalid Input</FormFeedback>
        </FormGroup>
        <br />
        <FormGroup style={{ width: "100%" }}>
          <Input
            className="mb-3 p-3 fs-4"
            type="text"
            name="title"
            id="title"
            value={campaignDescription}
            onChange={(e) => setCampaignDescription(e.target.value)}
            placeholder="Campaign Description"
          />
          <FormFeedback>Invalid Input</FormFeedback>
        </FormGroup>
        <br />
        <FormGroup style={{ width: "100%" }}>
          <Input
            className="mb-3 p-3 fs-4"
            type="number"
            value={minimumContribution}
            onChange={(e) => setMinimumContribution(e.target.value)}
            name="mincontribution"
            id="mincontribution"
            required
            valid={minimumContribution ? minimumContribution >= 0 : false}
            invalid={!!errorMessage || minimumContribution < 0}
            placeholder="Minimum Contribution (in wei) *"
          />
          <FormFeedback className="fs-5">
            {errorMessage || "Enter minimum contribution integer value in wei"}
          </FormFeedback>
        </FormGroup>
        <br />
        <LoadingButton
          loading={loading}
          disabled={disabled}
          block={true}
          type="submit"
          className="py-2 px-4 fs-4 mt-3"
          color="primary"
          style={{ cursor: "pointer", width: "100%", fontWeight: "500" }}
        >
          Create
        </LoadingButton>
      </Form>
    </div>
  );
};

export default CreateCampaignForm;

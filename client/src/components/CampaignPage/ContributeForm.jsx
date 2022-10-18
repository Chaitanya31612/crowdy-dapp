import React, { useState } from "react";
import { Form, FormFeedback, FormGroup, Input } from "reactstrap";
import { useEth } from "../../contexts/EthContext";
import LoadingButton from "../Common/LoadingButton";

const ContributeForm = ({ campaignContract, getSummary }) => {
  const {
    state: { accounts },
  } = useEth();
  const [contributeAmount, setContributeAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  // console.log("campaignContract", campaignContract);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);
    setDisabled(true);
    try {
      setLoading(true);
      await campaignContract.methods.contribute().send({
        from: accounts[0],
        value: contributeAmount,
      });
      getSummary();
      setLoading(false);
      setDisabled(false);
      //   history.push("/");
    } catch (error) {
      setLoading(false);
      setDisabled(false);
      setErrorMessage(error.message);
      console.log(error);
    }
  };

  return (
    <div className="contribute">
      <h1 className="page__title">Contribute to the Campaign</h1>
      <br />
      <br />
      <Form onSubmit={handleFormSubmit} className="create_campaign__form">
        <FormGroup style={{ width: "100%" }}>
          <Input
            className="mb-3 p-3 fs-4"
            type="number"
            value={contributeAmount}
            onChange={(e) => setContributeAmount(e.target.value)}
            name="mincontribution"
            id="mincontribution"
            required
            valid={contributeAmount ? contributeAmount >= 0 : false}
            invalid={!!errorMessage || contributeAmount < 0}
            placeholder="Amount (in wei) *"
          />
          <FormFeedback className="fs-5">
            {errorMessage ||
              "Enter contribution amount as integer value in wei"}
          </FormFeedback>
        </FormGroup>
        <br />
        <LoadingButton
          loading={loading}
          disabled={disabled || !campaignContract}
          block={true}
          type="submit"
          className="py-2 px-4 fs-4 mt-3"
          color="primary"
          style={{ cursor: "pointer", width: "100%", fontWeight: "500" }}
        >
          Contribute
        </LoadingButton>
      </Form>
    </div>
  );
};

export default ContributeForm;

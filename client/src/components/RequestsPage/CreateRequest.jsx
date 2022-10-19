import React, { useState } from "react";
import EthIcon from "eth-icon";
import { Link, Redirect, useHistory } from "react-router-dom";
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { useEth } from "../../contexts/EthContext";
import LoadingButton from "../Common/LoadingButton";

const CreateRequest = ({ address, campaignContract, getRequests }) => {
  const {
    state: { web3, accounts },
  } = useEth();
  const [addRequestFormVisible, setAddRequestFormVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [requestDescription, setRequestDescription] = useState("");
  const [valueAmount, setValueAmount] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [denomination, setDenomination] = useState("wei");

  console.log("campaignContract create request", campaignContract);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);
    setDisabled(true);
    try {
      setLoading(true);
      await campaignContract.methods
        .createRequest(
          requestDescription,
          denomination === "ether"
            ? web3.utils.toWei(valueAmount, "ether")
            : valueAmount,
          recipientAddress
        )
        .send({ from: accounts[0] });
      getRequests();
      setLoading(false);
      setDisabled(false);
      setAddRequestFormVisible(false);
    } catch (error) {
      setLoading(false);
      setDisabled(false);
      setErrorMessage(error.message);
      console.log(error);
    }
  };
  return (
    <>
      <Row
        lg="auto"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 className="campaigndetails__heading">Request Details</h1>
        <Button
          className="p-3 mb-5 me-4 fs-5 text-decoration-none"
          color="primary"
          style={{ cursor: "pointer", fontWeight: "bold" }}
          onClick={() => setAddRequestFormVisible(!addRequestFormVisible)}
        >
          {!addRequestFormVisible ? "Add Request" : "Hide Form"}
        </Button>
      </Row>

      {addRequestFormVisible && (
        <Row className="campaigndetails__addrequestform">
          {/* <div className="page__title fw-bold text-muted mb-3 fs-5">
            Add Request
          </div> */}
          <div className="page__title fw-normal text-muted mb-5 fs-3">
            <Form onSubmit={handleFormSubmit} className="create_campaign__form">
              <FormGroup style={{ width: "100%" }}>
                <Input
                  className="p-3 fs-4"
                  type="text"
                  name="description"
                  id="description"
                  value={requestDescription}
                  onChange={(e) => setRequestDescription(e.target.value)}
                  placeholder="Spending Request Description"
                />
                <FormFeedback>Invalid Input</FormFeedback>
              </FormGroup>
              <FormGroup style={{ display: "flex", width: "100%" }}>
                <Input
                  className="p-3 fs-4"
                  style={{ flex: 3 }}
                  type="number"
                  name="number"
                  id="valueAmount"
                  value={valueAmount}
                  onChange={(e) => {
                    setValueAmount(e.target.value);
                  }}
                  // valid={valueAmount ? valueAmount > 0 : false}
                  // invalid={!!errorMessage || valueAmount < 0}
                  placeholder={`Amount (in ${denomination})`}
                />
                <Input
                  className="p-3 fs-4 flex-1"
                  type="select"
                  name="select"
                  id="denominations"
                  style={{ flex: 1 }}
                  value={denomination}
                  onChange={(e) => setDenomination(e.target.value)}
                >
                  <option value="wei">wei</option>
                  <option value="ether">ether</option>
                </Input>

                <FormFeedback className="fs-5">
                  {errorMessage || "Enter amount as integer value"}
                </FormFeedback>
              </FormGroup>
              <FormGroup
                style={{ display: "flex", alignItems: "center", width: "100%" }}
              >
                {recipientAddress?.length > 0 && (
                  <EthIcon scale={3} address={recipientAddress} />
                )}
                <Input
                  className="p-3 fs-4 ms-2"
                  type="text"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  name="address"
                  id="address"
                  required
                  placeholder="Address of recipient"
                />
                <FormFeedback>Invalid Input</FormFeedback>
              </FormGroup>

              {/* error message */}
              {errorMessage && (
                <div className="text-danger fs-5 py-3">{errorMessage}</div>
              )}

              <LoadingButton
                loading={loading}
                disabled={disabled}
                block={true}
                type="submit"
                className="py-2 px-4 fs-4 mt-3"
                color="primary"
                style={{ cursor: "pointer", width: "100%", fontWeight: "500" }}
              >
                Create Request
              </LoadingButton>
            </Form>
          </div>
        </Row>
      )}
    </>
  );
};

export default CreateRequest;

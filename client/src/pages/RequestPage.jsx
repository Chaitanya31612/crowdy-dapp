import React, { useEffect, useState } from "react";
import { CreateRequest, RequestsTable } from "../components/RequestsPage";
import { useEth } from "../contexts/EthContext";
import setCampaingArtifact from "../contexts/EthContext/setCampaingArtifact";

const RequestPage = ({ match: { params } }) => {
  const [campaignContract, setCampaignContract] = useState(null);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const init = async () => {
      const data = await setCampaingArtifact(params.id);
      setCampaignContract(data?.campaignContract);
    };
    init();
  }, []);

  const getRequests = async () => {
    const requestsCount = await campaignContract.methods
      .getRequestsCount()
      .call();
    const requests = await Promise.all(
      Array(parseInt(requestsCount))
        .fill()
        .map((element, index) => {
          return campaignContract.methods.requests(index).call();
        })
    );
    setRequests(requests);
  };

  useEffect(() => {
    if (campaignContract) {
      getRequests();
    }
  }, [campaignContract]);

  console.log("campaignContract", campaignContract, params.id);
  return (
    <div className="p-5">
      <CreateRequest
        campaignContract={campaignContract}
        address={params.id}
        getRequests={getRequests}
      />
      <RequestsTable
        campaignContract={campaignContract}
        requests={requests}
        getRequests={getRequests}
        address={params.id}
      />
    </div>
  );
};

export default RequestPage;

import React, { useEffect, useState } from "react";
import { Button, Row, Table } from "reactstrap";
import { useEth } from "../../contexts/EthContext";

const RequestsTable = ({ campaignContract, requests, getRequests }) => {
  console.log("requests", requests, campaignContract);

  return (
    <Row className="p-5 fs-4">
      {/* <h1 className="page__title text-dark fs-3 fw-bold">Requests Table</h1> */}
      <div className="table-responsive">
        <Table className="table-nowrap align-middle table-bordered" responsive>
          <RequestTableHeader />
          <tbody>
            {requests &&
              requests.map((request, index) => (
                <RequestTableRow
                  key={index}
                  index={index + 1}
                  request={request}
                  campaignContract={campaignContract}
                  getRequests={getRequests}
                />
              ))}
          </tbody>
        </Table>
      </div>

      <div>Found {requests.length} requests.</div>
    </Row>
  );
};

const RequestTableHeader = () => {
  return (
    <thead className="thead-light">
      <tr>
        <th className="p-4" scope="col">
          ID
        </th>
        <th className="p-4" scope="col">
          Description
        </th>
        <th className="p-4" scope="col">
          Amount (ETH)
        </th>
        <th className="p-4" scope="col">
          Recipient
        </th>
        <th className="p-4" scope="col">
          Approval Count
        </th>
        <th className="p-4" scope="col">
          Actions
        </th>
      </tr>
    </thead>
  );
};

const RequestTableRow = ({ index, request, campaignContract, getRequests }) => {
  const {
    state: { web3, accounts },
  } = useEth();

  const [totalApproversCount, setTotalApproversCount] = useState(-1);
  const [readyToFinalize, setReadyToFinalize] = useState(false);

  console.log(readyToFinalize, request, totalApproversCount);

  useEffect(() => {
    const getTotalApproversCount = async () => {
      const totalApproversCount = await campaignContract.methods
        .approversCount()
        .call();
      setTotalApproversCount(Number(totalApproversCount));
    };
    getTotalApproversCount();
  }, [campaignContract]);

  const handleApproveRequest = async () => {
    await campaignContract.methods.approveRequest(index - 1).send({
      from: accounts[0],
    });
    await getRequests();
    if (
      Number(request.approvalCount) > totalApproversCount / 2 &&
      !request.complete
    ) {
      setReadyToFinalize(true);
    }
  };

  const handleFinalizeRequest = async () => {
    await campaignContract.methods.finalizeRequest(index - 1).send({
      from: accounts[0],
    });
    await getRequests();
    if (
      Number(request.approvalCount) > totalApproversCount / 2 &&
      !request.complete
    ) {
      setReadyToFinalize(true);
    }
  };

  useEffect(() => {
    if (
      totalApproversCount !== -1 &&
      Number(request.approvalCount) > totalApproversCount / 2 &&
      !request.complete
    ) {
      setReadyToFinalize(true);
    }
  }, [totalApproversCount, handleApproveRequest, handleFinalizeRequest]);

  return (
    <tr
      style={{
        backgroundColor: readyToFinalize
          ? "#e7f0ea"
          : request.complete
          ? "#f9f9f9"
          : "",
        color: request.complete ? "#a9a9a9" : "",
      }}
    >
      <td className="p-4">
        <span className="mb-0 text-sm">{index}</span>
      </td>
      <td className="p-4">{request.description}</td>
      <td className="p-4">{web3.utils.fromWei(request.value, "ether")}</td>
      {/* <td className="p-4">{request.value}</td> */}
      <td className="p-4">{request.recipient}</td>
      <td className="p-4">
        {request.approvalCount} / {totalApproversCount}
      </td>
      <td className="p-4">
        {request.complete ? (
          <Button outline className="me-4 fs-5" color="success">
            Completed
          </Button>
        ) : (
          <>
            <Button
              onClick={handleApproveRequest}
              className="me-4 fs-5"
              color="primary"
            >
              Approve
            </Button>
            <Button
              onClick={handleFinalizeRequest}
              className="fs-5"
              color="success"
            >
              Finalize
            </Button>
          </>
        )}
      </td>
    </tr>
  );
};

export default RequestsTable;

// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.9.0;

contract CampaignFactory {
    struct CampaignStruct {
        address campaignAddress;
        string campaignName;
        string campaignDescription;
    }

    CampaignStruct[] public deployedCampaignsData;
    address[] public deployedCampaigns;

    // takes minimum value to pass to the campaign contract
    function createCampaign(uint256 minimumContribution_) public {
        address newCampaign = address(
            new Campaign("", "", minimumContribution_, msg.sender)
        );
        deployedCampaigns.push(newCampaign);
    }

    function createCampaign(
        string memory campaignName_,
        string memory campaignDescription_,
        uint256 minimumContribution_
    ) public {
        address newCampaign = address(
            new Campaign(
                campaignName_,
                campaignDescription_,
                minimumContribution_,
                msg.sender
            )
        );
        deployedCampaignsData.push(
            CampaignStruct(newCampaign, campaignName_, campaignDescription_)
        );
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }

    function getDeployedCampaignsData()
        public
        view
        returns (CampaignStruct[] memory)
    {
        return deployedCampaignsData;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint256 value;
        address payable recipient;
        bool complete;
        uint256 approvalCount;
        mapping(address => bool) approvals; // people who have approved to this request
    }

    Request[] public requests;
    address public manager; // this is the address of our manager (made public for transparency)
    uint256 public minimumContribution;
    mapping(address => bool) public approvers;
    uint256 public approversCount;

    string public campaignName;
    string public campaignDescription;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    // constructor(uint256 minimumContribution_, address creator) {
    //     manager = creator;
    //     minimumContribution = minimumContribution_;
    // }

    constructor(
        string memory campaignName_,
        string memory campaignDescription_,
        uint256 minimumContribution_,
        address creator
    ) {
        manager = creator;
        minimumContribution = minimumContribution_;
        campaignName = campaignName_;
        campaignDescription = campaignDescription_;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        // approvers.push(msg.sender);
        if (!approvers[msg.sender]) {
            approvers[msg.sender] = true;
            approversCount++;
        }
    }

    // created by manager only
    function createRequest(
        string memory description,
        uint256 value,
        address recipient
    ) public restricted {
        Request storage newRequest = requests.push();
        newRequest.description = description;
        newRequest.value = value;
        newRequest.recipient = payable(recipient);
        newRequest.complete = false;
        newRequest.approvalCount = 0;
    }

    // this function is called by approvers/contributers
    function approveRequest(uint256 index) public {
        Request storage request = requests[index]; // storage because we want to manipulate it in the memory

        require(approvers[msg.sender]); // make sure approvers has donated

        require(!request.approvals[msg.sender]); // make sure person has not voted before i.e. approver not present in approvals mapping of that request

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint256 index) public restricted {
        Request storage request = requests[index];

        require(!request.complete);
        require(request.approvalCount > (approversCount / 2)); // more than 50% approvals

        request.recipient.transfer(request.value);

        request.complete = true;
    }

    function getSummary()
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            address,
            string memory,
            string memory
        )
    {
        return (
            minimumContribution,
            address(this).balance,
            requests.length,
            approversCount,
            manager,
            campaignName,
            campaignDescription
        );
    }

    function getRequestsCount() public view returns (uint256) {
        return requests.length;
    }
}

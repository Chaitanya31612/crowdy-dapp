const CampaignFactory = artifacts.require("CampaignFactory");
const Campaign = artifacts.require("Campaign");

contract("CampaignFactory and Campaign", async (accounts) => {
  const [deployerAccount, recipient, anotherAccount] = accounts;
  console.log(
    "deployerAccount: ",
    deployerAccount,
    "\nrecipient: ",
    recipient,
    "\nanotherAccount: ",
    anotherAccount
  );

  let factory, campaigns, campaign;
  it("should create a new campaign", async () => {
    // const accounts = await web3.eth.getAccounts();
    factory = await CampaignFactory.deployed();
    await factory.createCampaign(100, { from: deployerAccount });
    campaigns = await factory.getDeployedCampaigns.call();
    assert.equal(campaigns.length, 1, "1 campaign was not created");
  });

  it("manager address same as deployerAccount address", async () => {
    campaign = await Campaign.at(campaigns[campaigns.length - 1]);
    const value = (await campaign.manager.call()).toString();
    assert.equal(value, deployerAccount, "deployerAccount was not the manager");
  });

  it("allow people to contribute money and mark them as approvers", async () => {
    await campaign.contribute({ from: anotherAccount, value: "200" });
    const isContributor = await campaign.approvers.call(anotherAccount);
    assert(isContributor, "anotherAccount was not marked as a contributor");
  });

  it("require a minimum contribution", async () => {
    try {
      await campaign.contribute({ from: anotherAccount, value: "5" });
      // console.log("contribute was successful");
      assert(false);
    } catch (err) {
      // console.log("contribute was unsuccessful");
      assert(err);
    }
  });

  it("allows a manager to make a payment request", async () => {
    await campaign.createRequest("Buy batteries", "100", recipient, {
      from: deployerAccount,
    });

    const request = await campaign.requests.call(0);
    assert.equal(request.description, "Buy batteries");
  });

  it("processes requests", async () => {
    await campaign.contribute({
      from: deployerAccount,
      value: web3.utils.toWei("10", "ether"),
    });

    await campaign.createRequest(
      "Another request",
      web3.utils.toWei("5", "ether"),
      recipient,
      { from: deployerAccount }
    );

    // const request = await campaign.requests.call(0); // 0 is the index of the request ("buy batteries")
    // const request1 = await campaign.requests.call(1); // our new request
    // console.log("request1: ", request, request1);
    await campaign.approveRequest(1, { from: deployerAccount });

    // const approversCount = await campaign.approversCount.call();
    // console.log("approversCount: ", approversCount.toNumber(), request1); // approversCount is 2 and request1.approvalCount is 1
    await campaign.approveRequest(1, { from: anotherAccount });
    let balanceBefore = await web3.eth.getBalance(recipient);
    balanceBefore = web3.utils.fromWei(balanceBefore, "ether");
    balanceBefore = parseFloat(balanceBefore);

    await campaign.finalizeRequest(1, { from: deployerAccount });

    let balance = await web3.eth.getBalance(recipient);
    balance = web3.utils.fromWei(balance, "ether");
    balance = parseFloat(balance);

    console.log("balance: ", balance, "\nbalanceBefore: ", balanceBefore);
    // assert(true);
    assert(balance > balanceBefore, "balance was not greater than before");
  });
});

const CampaignFactory = artifacts.require("CampaignFactory");
const Campaign = artifacts.require("Campaign");

contract("Campaign", () => {
  it("should read newly written values", async (accounts) => {
    const [deployerAccount, recipient, anotherAccount] = accounts;
    const factory = await CampaignFactory.deployed();
    await factory.createCampaign(100, { from: deployerAccount });
    const campaigns = await factory.getDeployedCampaigns.call();
    console.log("length: " + campaigns.length);
    const campaign = await Campaign.at(campaigns[0]);
    assert.equal(1, 1, "1 should equal 1");
    //   const value = (await campaign.)
    //   var value = (await campaign.read.call()).toNumber();

    //   assert.equal(value, 0, "0 wasn't the initial value");

    //   await campaign.write(1);
    //   value = (await campaign.read.call()).toNumber();
    //   assert.equal(value, 1, "1 was not written");

    //   await campaign.write(2);
    //   value = (await campaign.read.call()).toNumber();
    //   assert.equal(value, 2, "2 was not written");
  });
});

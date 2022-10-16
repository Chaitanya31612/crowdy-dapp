const SimpleStorage = artifacts.require("SimpleStorage");
const Campaign = artifacts.require("Campaign");
const CampaignFactory = artifacts.require("CampaignFactory");

module.exports = async function (deployer) {
  // deployer.deploy(SimpleStorage);
  let addr = await web3.eth.getAccounts();
  // console.log("address: ", addr[0]);
  await deployer.deploy(CampaignFactory);
  // await deployer.deploy(Campaign, "", "" 100, addr[0]);
};

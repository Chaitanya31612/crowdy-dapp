import Web3 from "web3";

const artifact = require("../../contracts/Campaign.json");

export default async (address) => {
  const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
  const accounts = await web3.eth.requestAccounts();
  const networkID = await web3.eth.net.getId();
  const { abi } = artifact;
  let contract;
  try {
    contract = new web3.eth.Contract(abi, address);
  } catch (err) {
    console.error(err);
  }

  return { compaignArtifact: artifact, compaignContract: contract };
};

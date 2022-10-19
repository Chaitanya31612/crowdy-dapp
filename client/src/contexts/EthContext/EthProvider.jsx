import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log("state", state);

  const init = useCallback(async (artifact) => {
    if (artifact) {
      // console.log("provider", Web3.givenProvider);
      const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
      const accounts = await web3.eth.requestAccounts();
      const networkID = await web3.eth.net.getId();
      const { abi } = artifact;
      let address, contract;
      try {
        if (artifact.contractName !== "Campaign") {
          address = artifact.networks[networkID].address;
          contract = new web3.eth.Contract(abi, address);
        }
      } catch (err) {
        console.error(err);
      }
      // console.log(artifact, contract);
      if (artifact?.contractName === "CampaignFactory") {
        dispatch({
          type: actions.init,
          data: {
            campaignFactoryArtifact: artifact,
            web3,
            accounts,
            networkID,
            campaignFactoryContract: contract,
          },
        });
      } else if (artifact?.contractName === "Campaign") {
        // dispatch({
        //   type: actions.init,
        //   data: {
        //     campaignArtifact: artifact,
        //     web3,
        //     accounts,
        //     networkID,
        //     campaignContract: contract,
        //   },
        // });
      } else {
        dispatch({
          type: actions.init,
          data: {
            artifact,
            web3,
            accounts,
            networkID,
            contract,
          },
        });
      }
    }
  }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        const artifact = require("../../contracts/SimpleStorage.json");
        await init(artifact);
        const campaignFactoryArtifact = require("../../contracts/CampaignFactory.json");
        await init(campaignFactoryArtifact);

        // const campaignArtifact = require("../../contracts/Campaign.json");
        // await init(campaignArtifact);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = async () => {
      await init(state.artifact);
      await init(state.campaignFactoryArtifact);
      await init(state.campaignArtifact);
    };

    events.forEach((e) => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach((e) => window.ethereum.removeListener(e, handleChange));
    };
  }, [
    init,
    state.artifact,
    state.campaignFactoryArtifact,
    state.campaignArtifact,
  ]);

  return (
    <EthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;

const actions = {
  init: "INIT",
  setCampaignArtifact: "SET_CAMPAIGN_ARTIFACT",
};

const initialState = {
  artifact: null,
  campaignFactoryArtifact: null,
  campaignArtifact: null,
  web3: null,
  accounts: null,
  networkID: null,
  contract: null,
  campaignFactoryContract: null,
  campaignContract: null,
};

const reducer = (state, action) => {
  const { type, data } = action;
  switch (type) {
    case actions.init:
      return { ...state, ...data };

    case actions.setCampaignArtifact:
      return {
        ...state,
        campaignArtifact: data?.campaignArtifact,
        campaignContract: data?.campaignContract,
      };

    case actions.setCampaignArtifact:
      return { ...state, ...data };
    default:
      throw new Error("Undefined reducer action type");
  }
};

export { actions, initialState, reducer };

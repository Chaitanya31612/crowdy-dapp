import React from "react";

const FeatureSection = () => {
  const features = [
    {
      icon: "mdi mdi-checkbox-marked-circle-outline",
      text: "Crowdy provides decentralization application for crowdfunding domain.",
    },
    {
      icon: "mdi mdi-security",
      text: "Security and privacy guaranteed by blockchain technology.",
    },
    {
      icon: "mdi mdi-database",
      text: "Transparency of records and data tempering resistant.",
    },
    {
      icon: "mdi mdi-wallet",
      text: "Crowdy provides easy connect using web wallets and display your connection wallet address",
    },
    {
      icon: "mdi mdi-checkbox-marked-circle-outline",
      text: "Easy campaign creation with minimum contribution in wei or ether.",
    },
    {
      icon: "bx bx-upvote",
      text: "Consensus for approval of spending requests through voting system.",
    },
  ];

  return (
    <div style={{ padding: "5rem" }} id="features">
      <div className="featuresec">
        <div className="section__subtitle">Features</div>
        <div className="section__title">
          Crowdy Provides you <br />
          with following
        </div>

        <br />
        <br />
        <div className="featuresec__content">
          {features.map((feature, index) => (
            <div className="featuresec__content--item fs-3" key={index}>
              <div className="fs-1">
                <i className={feature.icon} style={{ color: "#32478d" }}></i>
              </div>
              <br />
              <p style={{ color: "#32478d", fontWeight: "bold" }}>
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;

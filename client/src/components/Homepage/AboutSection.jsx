import React from "react";
import etherumImg from "../../assets/images/ethereumdapp.svg";
import logoImg from "../../assets/images/logotext.svg";

const AboutSection = () => {
  return (
    <div style={{ padding: "5rem", backgroundColor: "#f6f6f6" }} id="about">
      <div className="aboutsec">
        <div className="aboutsec__head">
          <div className="section__subtitle">About dApps</div>
          <div className="section__title">What are decentralized apps?</div>
        </div>
        <div className="aboutsec__content">
          <div className="aboutsec__content--left">
            <div className="section__desc fs-3">
              A decentralized application (dApp) is a type of distributed open
              source software application that runs on a peer-to-peer (P2P)
              blockchain network rather than on a single computer. DApps are
              visibly similar to other software applications that are supported
              on a website or mobile device but are P2P supported.
            </div>
          </div>
          <div className="aboutsec__content--right">
            <div className="section__subtitle">Benefits</div>
            <ul className="section__desc fs-3">
              <li>Fault tolerance</li>
              <li>Data Integrity</li>
              <li>Flexible Platform</li>
              <li>User Privacy</li>
            </ul>
          </div>
        </div>
        <div className="aboutsec__content--img">
          <img src={etherumImg} alt="" />
        </div>
      </div>
      <div className="aboutsec__bottom">
        <div className="section__subtitle">About Platform</div>
        <div className="section__title">What is Crowdy?</div>

        <div className="aboutsec__bottom--content">
          <div className="aboutsec__bottom--content--left">
            <div className="section__desc fs-3">
              The platform aims to bring crowdfunding application on blockchain
              thus providing decentralization and numerous other benefits that
              comes as side effects of blockchain. Crowdy is the name for the
              platform which enables thinkers, innovators and aimers to make it
              large with help of the community.
            </div>
          </div>
          <div className="aboutsec__bottom--content--right">
            <img src={logoImg} alt="" />
          </div>
        </div>

        <br />
        <br />
        <br />
        <br />
        <div>
          <p className="fs-3">
            Just follow a few steps and you will be one step forward towards
            your goal :-{" "}
          </p>
          <br />
          <div style={{ listStyle: "none" }}>
            <li className="section__subtitle fs-3 mb-4">
              Create a Campaign with a minimum contribution amount.
            </li>
            <li className="section__subtitle fs-3 mb-4">
              Describe your campaign nicely and receive contributions.
            </li>
            <li className="section__subtitle fs-3 mb-4">
              Be accountable and make spending requests whenever needed, wait
              for approval.
            </li>
            <li className="section__subtitle fs-3 mb-4">
              If community finds it legitimate and right, you're good to go.
            </li>
            <li className="section__subtitle fs-3 mb-4">
              Be consistent and make your project reality.
            </li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;

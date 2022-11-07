import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="herosec" id="home">
      <div className="herosec__background px-5">
        <div className="herosec__head">
          <h1 className="herosec__head--logo">
            <Link to="/" className="herosec__head--logo-link">
              crowdy
            </Link>
          </h1>
          <div className="herosec__head--nav">
            <a className="herosec__head--nav__link" href="#about">
              About
            </a>
            <a className="herosec__head--nav__link" href="#problems">
              Problems
            </a>
            <a className="herosec__head--nav__link" href="#solution">
              Solution
            </a>
            <a className="herosec__head--nav__link" href="#features">
              Features
            </a>
            <a className="herosec__head--nav__link" href="#help">
              Help
            </a>
          </div>
          <Link to="/connect" className="herosec__head--topbtn">
            Connect Wallet
          </Link>
        </div>

        <div className="herosec__content">
          <div className="herosec__content--left">
            <p className="herosec__content--left-smalltitle">
              Powered by Blockchain
            </p>
            <h1 className="herosec__content--left-title">
              Decentralized Crowdfunding Platform
            </h1>
            <p className="herosec__content--left-desc">
              Crowdy is a platform where you can create your own crowdfunding
              campaign and raise funds for your project. Powered by blockchain
              technology that brings transparency and accountability along with
              security.
            </p>
            <Link to="/getstarted" className="herosec__content--left-btn">
              Get Started
            </Link>
          </div>
          <div className="herosec__content--right"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

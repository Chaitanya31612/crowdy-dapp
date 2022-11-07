import React, { useContext } from "react";
import EthIcon from "eth-icon";
import { EthContext } from "../contexts/EthContext";
import { crowdyLogo } from "../assets/images";
import { Link } from "react-router-dom";

const Header = () => {
  const {
    state: { web3, accounts },
  } = useContext(EthContext);

  //   console.log(accounts);
  return (
    <header className="w-100">
      <div className="header">
        <div className="d-flex align-items-center justify-center text-decoration-none">
          {/* <img src={crowdyLogo} className="header__logo" alt="" /> */}
          {/* <h1 className="header__title">Crowdy dApp</h1> */}
          <h1 className="herosec__head--logo">
            <Link
              to="/dashboard"
              className="herosec__head--logo-link"
              style={{ color: "#252525" }}
            >
              crowdy
            </Link>
          </h1>
        </div>
        <div>
          <EthIcon address={accounts && accounts[0]} scale={3} />
          <span className="header__address">{accounts && accounts[0]}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;

import React, { useContext } from "react";
import EthIcon from "eth-icon";
import { EthContext } from "../contexts/EthContext";

const Header = () => {
  const {
    state: { web3, accounts },
  } = useContext(EthContext);

  //   console.log(accounts);
  return (
    <header className="w-100">
      <div className="header">
        <h1 className="header__title">Crowdfunding dApp</h1>
        <div>
          <EthIcon address={accounts && accounts[0]} scale={3} />
          <span className="header__address">{accounts && accounts[0]}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;

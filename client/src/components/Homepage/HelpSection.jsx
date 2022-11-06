import React from "react";

const HelpSection = () => {
  return (
    <div>
      <div className="helpsec herosec__background p-5" id="help">
        <div className="helpsec__head p-5">
          <div className="section__subtitle" style={{ color: "#5678EA" }}>
            Help
          </div>
          <div className="section__title" style={{ color: "#ebebeb" }}>
            Need Help with something? <br />
            We are here for you.
          </div>
          <br />
          <br />
          <a href="mailto:test@mail.com" className="helpsec__head--btn">
            Contact Us
          </a>
          <br />
          <br />
          <br />
          <small className="text-muted fs-5">
            Feel free to reach us and share feedback.
          </small>
        </div>
      </div>
    </div>
  );
};

export default HelpSection;

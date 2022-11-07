import React from "react";

const SolutionSection = () => {
  const solutionContent = [
    {
      title: "De-Centralization",
      desc: "The collected amount is stored in the smart contract and no single central authority has access to all the money of various campaigns. Decentralization provides trustless environment and reduces point of weakness.",
    },
    {
      title: "Record of money",
      desc: "Entire log of spending is maintained which bring transparency to the recordkeeping. Money is not transferred to managers account, instead he create a spending requests each time which if approved can be used to spend money.",
    },
    {
      title: "Consensus on spending",
      desc: "The manager creates a spending request each time which has to be approved by the contributors to the campaign, if it attains enough approvals (>50%) then it can be finalized by the manager and transacted for what-so-ever use.",
    },
  ];

  return (
    <div style={{ padding: "5rem", backgroundColor: "#f1faf9" }} id="solution">
      <div className="problemsec">
        <a href="#home" className="section__subtitle text-decoration-none">
          Solution
        </a>
        <div className="section__title">
          Crowdy brings much <br />
          needed solution
        </div>

        <br />
        <br />
        <div className="problemsec__content">
          {solutionContent.map((solution, index) => (
            <div className="section__card section__card--green" key={index}>
              <div className="section__card--title section__card--title--green">
                {solution.title}
              </div>
              <div className="section__card--desc">{solution.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SolutionSection;

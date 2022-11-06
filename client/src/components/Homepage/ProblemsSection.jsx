import React from "react";

const ProblemsSection = () => {
  const problemsContent = [
    {
      title: "Centralization",
      desc: "The money collected from people is collected by centralized authority which may act maliciously and run away with all the money from various campaigns.            This may not be the case for big trusted Kickstarter applications but who knows.",
    },
    {
      title: "No record of money",
      desc: "The money after collection gets credited to the manager's account who may take this money and never build the product he promised, instead use this money for his own personal purposes which is unethical and must be prevented.",
    },
    {
      title: "No consensus on spending",
      desc: "Even if the manager is legitimate and is using money to build the project, there is not consensus with the contributors as to where the money is being spent and is it even necessary.        Voting as to whether this spending request should be performed or not.",
    },
  ];

  return (
    <div style={{ padding: "5rem" }} id="problems">
      <div className="problemsec">
        <div className="section__subtitle">Problems</div>
        <div className="section__title">
          Conventional Crowdfunding <br /> Application Problems
        </div>

        <br />
        <br />
        <div className="problemsec__content">
          {problemsContent.map((problem, index) => (
            <div className="section__card section__card--blue" key={index}>
              <div className="section__card--title section__card--title--blue">
                {problem.title}
              </div>
              <div className="section__card--desc">{problem.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProblemsSection;

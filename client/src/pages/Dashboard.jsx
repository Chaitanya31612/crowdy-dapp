import { EthProvider } from "../contexts/EthContext";
import Demo from "../components/Demo";
import { CampaignsList } from "../components/Dashboard";
import Header from "../components/Header";
import CreateCampaignButton from "../components/Dashboard/CreateCampaignButton";

const Dashboard = () => {
  return (
    <EthProvider>
      <div id="App">
        <div id="container">
          <Header />
          <div className="p-5">
            <CreateCampaignButton />
            <CampaignsList />
          </div>
        </div>
      </div>
    </EthProvider>
  );
};

export default Dashboard;

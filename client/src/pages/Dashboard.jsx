import { EthProvider } from "../contexts/EthContext";
import Intro from "../components/Intro";
import Setup from "../components/Setup";
import Demo from "../components/Demo";
import Footer from "../components/Footer";

const Dashboard = () => {
  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          <Demo />
        </div>
      </div>
    </EthProvider>
  );
};

export default Dashboard;

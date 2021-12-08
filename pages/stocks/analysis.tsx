import SidebarLayout from '../../components/layouts/SidebarLayout';
import TickerChart from '../../components/molecules/TickerChart';

const Analysis = () => {
  return (
    <SidebarLayout>
      <TickerChart />
    </SidebarLayout>
  );
};

Analysis.auth = true;

export default Analysis;

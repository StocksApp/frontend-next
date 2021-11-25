import { NextPage } from 'next';
import SidebarLayout from '../../components/layouts/SidebarLayout';
import TickerChart from '../../components/molecules/TickerChart';

const Game: NextPage = () => {
  return (
    <SidebarLayout>
      <TickerChart />
    </SidebarLayout>
  );
};

export default Game;

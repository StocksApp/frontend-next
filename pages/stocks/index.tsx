import { NextPage } from 'next';
import SidebarLayout from '../../components/layouts/SidebarLayout';
import { StocksCard } from '../../components/organisms';

const Game: NextPage = () => {
  return (
    <SidebarLayout>
      <StocksCard />
    </SidebarLayout>
  );
};

export default Game;

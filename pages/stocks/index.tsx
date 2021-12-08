import { NextPage } from 'next';
import SidebarLayout from '../../components/layouts/SidebarLayout';
import { StocksCard } from '../../components/organisms';

const BrowseStocks = () => {
  return (
    <SidebarLayout>
      <StocksCard />
    </SidebarLayout>
  );
};

BrowseStocks.auth = true;

export default BrowseStocks;

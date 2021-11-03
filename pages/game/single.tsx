import { NextPage } from 'next';
import SidebarLayout from '../../components/layouts/SidebarLayout';
import { gameMenuLinks } from '../../utils/links';

const SinglePlayer: NextPage = () => {
  return (
    <SidebarLayout tabs={gameMenuLinks}>
      <div>siemanko</div>
    </SidebarLayout>
  );
};

export default SinglePlayer;

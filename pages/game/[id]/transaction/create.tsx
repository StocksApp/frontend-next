import { useRouter } from 'next/router';
import SidebarLayout from '../../../../components/layouts/SidebarLayout';
import { Card } from '../../../../components/molecules';
import CreateTransactionForm from '../../../../components/organisms/CreateTransactionForm';
import { getSingleValueFromQuery } from '../../../../utils/url';

const CreateTransactionPage = () => {
  const { push, query } = useRouter();

  const gameId = getSingleValueFromQuery(query, 'id');

  if (!gameId) return null;

  return (
    <SidebarLayout>
      <Card h="full">
        <CreateTransactionForm gameId={parseInt(gameId, 10)} />
      </Card>
    </SidebarLayout>
  );
};

CreateTransactionPage.auth = true;

export default CreateTransactionPage;

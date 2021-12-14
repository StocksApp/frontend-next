import { useRouter } from 'next/router';
import SidebarLayout from '../../../../components/layouts/SidebarLayout';
import { Card } from '../../../../components/molecules';
import CreateTransactionForm from '../../../../components/organisms/CreateTransactionForm';
import { getSingleValueFromQuery } from '../../../../utils/url';

const CreateTransactionPage = () => {
  const { push, query } = useRouter();

  const gameId = parseInt(getSingleValueFromQuery(query, 'id'), 10);

  if (!gameId) return null;

  return (
    <SidebarLayout>
      <Card h="full">
        <CreateTransactionForm gameId={gameId} />
      </Card>
    </SidebarLayout>
  );
};

CreateTransactionPage.auth = true;

export default CreateTransactionPage;

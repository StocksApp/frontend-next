import SidebarLayout from '../../../../components/layouts/SidebarLayout';
import { Card } from '../../../../components/molecules';
import CreateTransactionForm from '../../../../components/organisms/CreateTransactionForm';
import { Heading } from '@chakra-ui/react';
import { useCurrentGameContext } from '../../../../contexts/currentGameContext';

const CreateTransactionPage = () => {
  const { game } = useCurrentGameContext();
  if (!game) return null;
  return (
    <SidebarLayout>
      <Card h="full">
        <Heading marginBottom="8">Stwórz transakcję</Heading>
        <CreateTransactionForm game={game} />
      </Card>
    </SidebarLayout>
  );
};

CreateTransactionPage.auth = true;

export default CreateTransactionPage;

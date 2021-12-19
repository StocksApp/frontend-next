import {
  Table,
  Thead,
  TableCaption,
  Tr,
  Th,
  Td,
  Tbody,
  Button,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import SidebarLayout from '../../../../components/layouts/SidebarLayout';
import { Card } from '../../../../components/molecules';
import { useCurrentGameContext } from '../../../../contexts/currentGameContext';
import {
  TransactionRow,
  useGetActiveTransactionsQuery,
} from '../../../../generated/graphql';
import { getSingleValueFromQuery } from '../../../../utils/url';
import { GiMagnifyingGlass } from 'react-icons/gi';
import { useState } from 'react';
import MoreInfoModal from '../../../../components/molecules/transaction/MoreInfoModal';

const TransactionPage = () => {
  const { query } = useRouter();
  const [transactionInModal, setTransactionInModal] =
    useState<TransactionRow>();

  const { data } = useGetActiveTransactionsQuery({
    variables: {
      gameId: parseInt(getSingleValueFromQuery(query, 'id') ?? '0', 10),
    },
  });
  return (
    <SidebarLayout>
      <Card h="full">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Początek okresu transakcji</Th>
              <Th>Koniec okresu transakcji</Th>
              <Th>Ilość zamówionych aktywów</Th>
              <Th>Kupno/sprzedaż</Th>
              <Th>Nazwa aktywów</Th>
              <Th>Akcje</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.getUserTransactions?.map((transaction, index) => (
              <Tr key={index}>
                <Td>{transaction.from}</Td>
                <Td>{transaction.to}</Td>
                <Td>{transaction.quantity}</Td>
                <Td>{transaction.ticker}</Td>
                <Td>{transaction.isSellTransaction ? 'Sprzedaż' : 'Kupno'}</Td>
                <Td>
                  <GiMagnifyingGlass
                    onClick={() => setTransactionInModal(transaction)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Card>
      <MoreInfoModal
        transactionInModal={transactionInModal}
        onClose={() => setTransactionInModal(undefined)}
      />
    </SidebarLayout>
  );
};

TransactionPage.auth = true;

export default TransactionPage;

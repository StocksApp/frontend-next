import React from 'react';
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
  Flex,
  Spacer,
  Text,
  Button,
} from '@chakra-ui/react';
import { User } from '../../utils/interfaces';
import { FaTimes } from 'react-icons/fa';

export type UsersTableProps = {
  title: string;
  users: User[];
  onDelete: (userId: string) => void;
  onAdd: () => void;
  onClear: () => void;
};

const UsersTable = ({
  users,
  onDelete,
  onAdd,
  title,
  onClear,
}: UsersTableProps) => {
  return (
    <Box p={4} boxShadow="0px 3px 5px #444444aa" borderRadius={10}>
      <Flex gridGap={4}>
        <Text>{title}</Text>
        <Spacer />
        <Button onClick={onAdd}>Dodaj</Button>
        {onClear && <Button onClick={onClear}>Wyczyść</Button>}
      </Flex>
      <Table>
        <Thead>
          <Tr>
            <Th>Nazwa</Th>
            <Th>Akcje</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user, id) => (
            <Tr key={id}>
              <Td>{user.name}</Td>
              <Td>
                <FaTimes
                  style={{ cursor: 'pointer' }}
                  onClick={() => onDelete(user.id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default UsersTable;

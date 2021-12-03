import React, { ReactNode } from 'react';
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
  BoxProps,
  TableProps,
} from '@chakra-ui/react';

type TableHeaderValue = string;
type TableCellValue = string | number | null | ReactNode;

export type GenericTableProps<T extends [...TableCellValue[]]> = TableProps & {
  tableHeaders: TableHeaderValue[];
  tableValues: T[];
};

export const GenericTable = <T extends [...TableCellValue[]]>({
  tableHeaders,
  tableValues,
  ...rest
}: GenericTableProps<T>) => {
  return (
    <Table {...rest}>
      <Thead>
        <Tr>
          {tableHeaders.map((columnHead, index) => (
            <Th key={index}>{columnHead}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {tableValues.map((row, rowIndex) => (
          <Tr key={rowIndex}>
            {row.map((value, index) => (
              <Td key={index}>{value}</Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export type GenericTablePanelProps = BoxProps & {
  title: string;
  actionNodes?: ReactNode;
};

const GenericTablePanel = ({
  actionNodes,
  children,
  title,
  ...rest
}: GenericTablePanelProps) => {
  return (
    <Box p={4} boxShadow="0px 3px 5px #444444aa" borderRadius={10} {...rest}>
      <Flex gridGap={4}>
        <Text>{title}</Text>
        <Spacer />
        {actionNodes}
      </Flex>
      {children}
    </Box>
  );
};

GenericTablePanel.Table = GenericTable;
export default GenericTablePanel;

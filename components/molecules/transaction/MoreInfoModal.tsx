import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  HStack,
  Text,
  Divider,
  SimpleGrid,
  GridItem,
} from '@chakra-ui/react';
import React from 'react';
import { TransactionRow } from '../../../generated/graphql';

export type MoreInfoModalProps = {
  transactionInModal?: TransactionRow;
  onClose: () => void;
};

const MoreInfoModal = ({ transactionInModal, onClose }: MoreInfoModalProps) => {
  console.log(transactionInModal);
  return (
    <Modal isOpen={!!transactionInModal} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="unset" w="auto" minW="500px">
        <ModalHeader>Szczegółowe informacje</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Box p={10}>
            <SimpleGrid
              columns={2}
              rowGap={1}
              columnGap={4}
              templateColumns="auto auto"
            >
              <GridItem>
                <Text>Obowiązuje od</Text>
              </GridItem>
              <GridItem>
                <Text>{transactionInModal?.from}</Text>
              </GridItem>
              <GridItem>
                <Text>Obowiązuje do</Text>
              </GridItem>
              <GridItem>
                <Text>{transactionInModal?.to}</Text>
              </GridItem>
              <GridItem>
                <Text>Rodzaj transakcji</Text>
              </GridItem>
              <GridItem>
                <Text>
                  {transactionInModal?.isSellTransaction ? 'sprzedaż' : 'kupno'}
                </Text>
              </GridItem>

              <GridItem colSpan={2} pt={4}>
                <Text textAlign="center" fontWeight="bold">
                  Dodatkowe informacje
                </Text>
              </GridItem>
              <GridItem colSpan={2} pb={2}>
                <Divider borderColor="cyan.200" />
              </GridItem>
              {transactionInModal?.minQuantity && (
                <>
                  <GridItem w="auto">
                    <Text>Minimalna wielkość pojedynczej transakcji</Text>
                  </GridItem>
                  <GridItem>
                    <Text>{transactionInModal.minQuantity}</Text>
                  </GridItem>
                </>
              )}
              {transactionInModal?.priceLimit && (
                <>
                  <GridItem>
                    <Text whiteSpace="nowrap">Limit ceny</Text>
                  </GridItem>
                  <GridItem>
                    <Text>{transactionInModal.priceLimit}</Text>
                  </GridItem>
                </>
              )}
              {transactionInModal?.activationLimit && (
                <>
                  <GridItem>
                    <Text whiteSpace="nowrap">Limit aktywacji</Text>
                  </GridItem>
                  <GridItem>
                    <Text>{transactionInModal.activationLimit}</Text>
                  </GridItem>
                </>
              )}
            </SimpleGrid>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MoreInfoModal;

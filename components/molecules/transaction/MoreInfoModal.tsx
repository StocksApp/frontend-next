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
} from '@chakra-ui/react';
import React from 'react';
import { TransactionRow } from '../../../generated/graphql';

export type MoreInfoModalProps = {
  transactionInModal?: TransactionRow;
  onClose: () => void;
};

const MoreInfoModal = ({ transactionInModal, onClose }: MoreInfoModalProps) => {
  return (
    <Modal isOpen={!!transactionInModal} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Szczegółowe informacje</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Box p={10}>
            <VStack>
              <HStack>
                <Text>Obowiązuje od</Text>
                <Text>{transactionInModal?.from}</Text>
              </HStack>
              <HStack>
                <Text>Obowiązuje do</Text>
                <Text>{transactionInModal?.to}</Text>
              </HStack>
              <HStack>
                <Text>Kupno sprzedaż</Text>
                <Text>
                  {transactionInModal?.isSellTransaction ? 'sprzedaż' : 'kupno'}
                </Text>
              </HStack>
              <HStack>
                <Text>Dodatkowe informacje</Text>
              </HStack>
            </VStack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MoreInfoModal;

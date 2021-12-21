import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import MarketsDiversityStrategyForm from '../molecules/MarketsDiversityStrategyForm';

const StrategyModal = ({ gameId }: { gameId: number }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Dodaj strategię</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Dodaj Strategię</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Tabs>
              <TabList>
                <Tab>Dywersyfikacja pomiędzy rynkami</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <MarketsDiversityStrategyForm
                    gameId={gameId}
                    onClick={onClose}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default StrategyModal;

import React, { ReactNode, useState } from 'react';
import {
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useBreakpointValue,
  VStack,
  BoxProps,
  Flex,
  Text,
  Select,
} from '@chakra-ui/react';
import { useCurrentGameContext } from '../../contexts/currentGameContext';

export type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
} & BoxProps;

const Sidebar = ({ isOpen, children, onClose, ...props }: SidebarProps) => {
  const isDrawer = useBreakpointValue({ base: true, md: false });
  const { gameId } = useCurrentGameContext();
  const [games, _] = useState<string[]>(
    ['Poza rozgrywką'].concat(gameId ? [`${gameId}`] : []) // TODO add better listing of games that user participates in
  );

  return !isDrawer ? (
    <Box
      transition="3s ease"
      bg="white"
      borderRight="1px"
      borderRightColor="gray.200"
      {...props}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        {/* <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} /> */}
      </Flex>
      <Box p={4}>
        <Text>Wybierz grę:</Text>
        <Select defaultValue="Poza rozgrywką">
          {games.map((game, index) => (
            <option value={game} key={index}>
              {game}
            </option>
          ))}
        </Select>
      </Box>
      {children}
    </Box>
  ) : (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose} isFullHeight>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerHeader>Logo</DrawerHeader>
          <DrawerCloseButton />
          <Box p={4}>
            <Text>Wybierz grę:</Text>
            <Select defaultValue="Poza rozgrywką">
              {games.map((game, index) => (
                <option value={game} key={index}>
                  {game}
                </option>
              ))}
            </Select>
          </Box>
          <DrawerBody>{children}</DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

const SidebarBody = VStack;

Sidebar.Body = SidebarBody;

export default Sidebar;

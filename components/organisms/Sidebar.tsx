import React, { ReactNode } from 'react';
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
        <Text>
          {gameId
            ? `Obecnie bierzesz udział w grze ${gameId}`
            : 'Obecnie nie bierzesz udziału w żadnej grze'}
        </Text>
      </Box>
      {children}
    </Box>
  ) : (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose} isFullHeight>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerHeader>Logo</DrawerHeader>
          <DrawerCloseButton />
          <DrawerBody>{children}</DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

const SidebarBody = VStack;

Sidebar.Body = SidebarBody;

export default Sidebar;

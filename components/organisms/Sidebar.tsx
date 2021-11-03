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

export type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
} & BoxProps;

const Sidebar = ({ isOpen, children, onClose, ...props }: SidebarProps) => {
  const isDrawer = useBreakpointValue({ base: true, md: false });

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
      {children}
    </Box>
  ) : (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose} isFullHeight>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerHeader>Header</DrawerHeader>
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

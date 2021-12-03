import {
  FlexProps,
  Flex,
  IconButton,
  useBreakpointValue,
  Text,
  Menu,
  MenuButton,
  HStack,
  Avatar,
  MenuList,
  MenuItem,
  Box,
  Spacer,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { FiChevronDown } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { NavLinkItem } from '../molecules';
import { links } from '../../config/urls';

export type HeaderProps = FlexProps & {
  onOpen: () => void;
};

const Header = ({ onOpen, ...props }: HeaderProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { push } = useRouter();
  return (
    <Flex
      px={4}
      height="20"
      alignItems="center"
      bg="white"
      borderBottomWidth="1px"
      borderBottomColor="gray.200"
      justifyContent={{ base: 'space-between', md: 'space-between' }}
      {...props}
    >
      {isMobile && (
        <>
          <IconButton
            aria-label="open menu"
            icon={<HamburgerIcon />}
            onClick={onOpen}
          />

          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            Logo
          </Text>
        </>
      )}
      <Spacer />
      <Box flex="0">
        <NavLinkItem href={links.stocks.browse}>Notowania</NavLinkItem>
      </Box>
      <Flex alignItems={'center'}>
        <Menu>
          <MenuButton
            py={2}
            transition="all 0.3s"
            _hover={{ bg: 'cyan.100' }}
            _focus={{ boxShadow: 'none' }}
          >
            <HStack>
              <Avatar size={'sm'} src={'/static/tracz.jpg'} />
              <Text fontSize="sm">Justina Clark</Text>

              {!isMobile && (
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              )}
            </HStack>
          </MenuButton>
          <MenuList bg="white" borderColor="gray.200">
            <MenuItem
              onClick={() => {
                localStorage.removeItem('userLoggedIn');
                push(links.landing);
              }}
            >
              Sign out
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default Header;

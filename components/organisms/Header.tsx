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
  TabList,
  TabPanels,
  Tab,
  Tabs,
  Spacer,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { FiChevronDown } from 'react-icons/fi';
import { NavOption } from '../../utils/interfaces';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { landingPageUrl } from '../../config/urls';

export type HeaderProps = FlexProps & {
  onOpen: () => void;
  tabs?: NavOption[];
};

const Header = ({ onOpen, tabs, ...props }: HeaderProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { pathname, push } = useRouter();
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
      {tabs ? (
        <Tabs
          index={tabs
            .map(({ href }, index) => (pathname === href ? index : 0))
            .reduce((prev, item) => Math.max(prev, item), 0)}
        >
          <TabList>
            {tabs.map((tab, index) => (
              <Link href={tab.href} key={index}>
                <a>
                  <Tab>{tab.text}</Tab>
                </a>
              </Link>
            ))}
          </TabList>
          <TabPanels></TabPanels>
        </Tabs>
      ) : (
        <Spacer />
      )}
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
                push(landingPageUrl);
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

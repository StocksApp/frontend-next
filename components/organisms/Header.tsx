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
  Button,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { FiChevronDown } from 'react-icons/fi';
import { NavLinkItem } from '../molecules';
import { links } from '../../config/urls';
import { signOut, useSession } from 'next-auth/react';
import {
  GetActiveTransactionsDocument,
  GetWalletSummaryDocument,
  useEndTurnMutation,
  GetUserGamesDocument,
} from '../../generated/graphql';
import { useCurrentGameContext } from '../../contexts/currentGameContext';

export type HeaderProps = FlexProps & {
  onOpen: () => void;
};

const Header = ({ onOpen, ...props }: HeaderProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { data: session } = useSession();
  const { game } = useCurrentGameContext();

  const [nextTurn] = useEndTurnMutation({
    refetchQueries: [
      {
        query: GetActiveTransactionsDocument,
        variables: { gameId: game?.id ?? 0 },
      },
      { query: GetWalletSummaryDocument, variables: { gameId: game?.id ?? 0 } },
      { query: GetUserGamesDocument },
    ],
  });

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
            StocksApp
          </Text>
        </>
      )}
      <Spacer />
      <Box flex="0">
        <NavLinkItem
          href={links.stocks.browse + (game ? `?id=${game?.id}` : '')}
        >
          Notowania
        </NavLinkItem>
      </Box>
      {game && game.isStarted && !game.isFinished && (
        <HStack
          p={4}
          m={4}
          borderRadius={10}
          cursor="pointer"
          alignItems="center"
          _hover={{ background: 'cyan.100' }}
          onClick={() => nextTurn({ variables: { gameId: game.id } })}
        >
          <Button>Nast??pna tura</Button>
        </HStack>
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
              <Avatar size={'sm'} src={''} />
              <Text fontSize="sm">{session?.user?.userName}</Text>

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
                signOut();
              }}
            >
              Wyloguj
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default Header;

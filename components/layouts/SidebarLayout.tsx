import React, { ReactNode, useState } from 'react';
import {
  Grid,
  useBreakpointValue,
  Box,
  Accordion,
  AccordionIcon,
  AccordionPanel,
  AccordionItem,
  AccordionButton,
} from '@chakra-ui/react';
import Sidebar from '../organisms/Sidebar';
import NavLinkItem from '../molecules/NavLinkItem';
import Header from '../organisms/Header';
import { sidebarMenuLinks } from '../../config/urls';
import { useCurrentGameContext } from '../../contexts/currentGameContext';

export type SidebarLayoutProps = {
  children: ReactNode;
};

const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  const [open, setOpen] = useState(false);
  const { game: currentGame } = useCurrentGameContext();
  const gridSettings = useBreakpointValue({
    base: {
      templateAreas: `'header' 'content'`,
      templateColumns: '1fr',
    },
    md: {
      templateAreas: `'menu header' 'menu content'`,
      templateColumns: '240px 1fr',
      templateRows: 'auto 1fr',
    },
  });

  return (
    <Grid h="100vh" w="100vw" bg="cyan.50" {...gridSettings}>
      <Sidebar isOpen={open} onClose={() => setOpen(false)} gridArea="menu">
        <Sidebar.Body>
          <Accordion w="full" allowToggle>
            {Object.keys(sidebarMenuLinks).map((key, index) => {
              const link = sidebarMenuLinks[key];
              if (!currentGame && typeof link.href === 'function') return null;
              return (
                <AccordionItem key={index}>
                  <h2>
                    <AccordionButton>
                      <Box flex={1} textAlign="left">
                        {link.name}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    {link.links
                      .filter(
                        (sublink) =>
                          currentGame || typeof sublink.href !== 'function'
                      )
                      .map((subLink, index) => (
                        <NavLinkItem
                          href={
                            typeof subLink.href === 'function'
                              ? subLink.href(`${currentGame || ''}`)
                              : subLink.href
                          }
                          key={index}
                        >
                          {subLink.name}
                        </NavLinkItem>
                      ))}
                  </AccordionPanel>
                </AccordionItem>
              );
            })}
          </Accordion>
        </Sidebar.Body>
      </Sidebar>
      <Header onOpen={() => setOpen(true)} gridArea="header" />
      <Box p={4} gridArea="content" alignSelf="stretch" justifySelf="stretch">
        {children}
      </Box>
    </Grid>
  );
};

export default SidebarLayout;

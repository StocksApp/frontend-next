import React, { ReactNode, useState, useEffect } from 'react';
import { Grid, useBreakpointValue, Spinner, Box, Accordion, AccordionIcon, AccordionPanel, AccordionItem, AccordionButton } from '@chakra-ui/react';
import Sidebar from '../organisms/Sidebar';
import NavLinkItem from '../molecules/NavLinkItem';
import Header from '../organisms/Header';
import { sidebarMenuLinks } from '../../utils/links';
import { useRouter } from 'next/router';
import { landingPageUrl } from '../../config/urls';

export type SidebarLayoutProps = {
  children: ReactNode;
};

const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  const [open, setOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const { push } = useRouter();
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

  useEffect(() => {
    if (!localStorage.getItem('userLoggedIn')) {
      push(landingPageUrl);
    } else {
      setHasMounted(true);
    }
  }, [push]);

  if (!hasMounted) {
    return (
      <Grid
        h="100vh"
        w="100vw"
        bg="cyan.50"
        {...gridSettings}
        alignItems="center"
        justifyItems="center"
      >
        <Spinner size="lg" />
      </Grid>
    );
  }

  return (
    <Grid h="100vh" w="100vw" bg="cyan.50" {...gridSettings}>
      <Sidebar isOpen={open} onClose={() => setOpen(false)} gridArea="menu">
        <Sidebar.Body>
          <Accordion w='full' allowToggle>
            {Object.keys(sidebarMenuLinks).map((key, index) => {
              const link = sidebarMenuLinks[key];
              return (
              <AccordionItem key={index}>
                <h2>
                  <AccordionButton>
                    <Box flex={1} textAlign='left'>
                      {link.name}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel>
                  {link.links.map((subLink, index) => (
                    <NavLinkItem href={subLink.href} key={index}>
                      {subLink.name}
                    </NavLinkItem>
                  ))}
                </AccordionPanel>
              </AccordionItem>
              )
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

import React, { ReactNode, useState, useEffect } from 'react';
import { Grid, useBreakpointValue, Spinner, Box } from '@chakra-ui/react';
import Sidebar from '../organisms/Sidebar';
import { NavOption } from '../../utils/interfaces';
import NavLinkItem from '../molecules/NavLinkItem';
import Header from '../organisms/Header';
import { sidebarMenuLinks } from '../../utils/links';
import { useRouter } from 'next/router';
import { landingPageUrl } from '../../config/urls';

export type SidebarLayoutProps = {
  tabs?: NavOption[];
  children: ReactNode;
};

const SidebarLayout = ({ tabs, children }: SidebarLayoutProps) => {
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
          {sidebarMenuLinks.map((link, index) => (
            <NavLinkItem key={`option_${index}`} href={link.href}>
              {link.text}
            </NavLinkItem>
          ))}
        </Sidebar.Body>
      </Sidebar>
      <Header onOpen={() => setOpen(true)} gridArea="header" tabs={tabs} />
      <Box p={4} gridArea="content" alignSelf="stretch" justifySelf="stretch">
        {children}
      </Box>
    </Grid>
  );
};

export default SidebarLayout;

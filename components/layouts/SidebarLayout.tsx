import React, { ReactNode, useState } from 'react';
import { Grid, useBreakpointValue } from '@chakra-ui/react';
import Sidebar from '../organisms/Sidebar';
import { NavOption } from '../../utils/interfaces';
import NavLinkItem from '../molecules/NavLinkItem';
import Header from '../organisms/Header';
import { sidebarMenuLinks } from '../../utils/links';

export type SidebarLayoutProps = {
  tabs?: NavOption[];
  children: ReactNode;
};

const SidebarLayout = ({ tabs, children }: SidebarLayoutProps) => {
  const [open, setOpen] = useState(false);
  const gridSettings = useBreakpointValue({
    base: {
      templateAreas: `'header' 'content'`,
      templateColumns: '1fr',
    },
    md: {
      templateAreas: `'menu header' 'menu content'`,
      templateColumns: '240px 1fr',
    },
  });
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
      {children}
    </Grid>
  );
};

export default SidebarLayout;

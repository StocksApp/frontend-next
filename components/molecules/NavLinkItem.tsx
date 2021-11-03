import React, { ReactNode } from 'react';
import { FlexProps, Flex, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/dist/client/router';

export type MenuOptionProps = FlexProps & {
  icon?: ReactNode;
  href: string;
  children?: ReactNode;
};

const NavLinkItem = ({ icon, href, children, ...props }: MenuOptionProps) => {
  const { pathname } = useRouter();
  const selected = pathname.includes(href);
  return (
    <NextLink href={href}>
      <Link w="full">
        <Flex
          mx={4}
          p={4}
          align="center"
          justify="stretch"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          bg={selected ? 'cyan.500' : 'transparent'}
          _hover={{
            bg: 'cyan.400',
            color: 'white',
          }}
          {...props}
        >
          {icon}
          {children}
        </Flex>
      </Link>
    </NextLink>
  );
};

export default NavLinkItem;

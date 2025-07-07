import { Box, Button, Flex, Link as ChakraLink, Text, Center } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';
import { useLogoutMutation, useMeQuery } from '../graphql/generated/graphql';
import { useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';

interface NavBarProps {

}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
  const {data, loading} = useMeQuery();
  const apolloClient = useApolloClient();
  const [logout, {loading: logoutLoading}] = useLogoutMutation();
  return (
      <Flex bg="teal.500" p={2}>
          <ChakraLink as={NextLink} href = '/'>
            <Text color="white" fontSize={25} ml="3" mt={2} fontWeight="bold" fontFamily="comic-sans">
              Issue Tracker
            </Text>
          </ChakraLink>
        <Box ml="auto" p={2}>
        {(loading || !data?.me) ? (
          <div>loading</div>
        ) : (
          <Flex>
            <Center><Box mr={5}>{data.me.username}</Box></Center>
            <Button onClick={async () => {
                await logout();
                router.push("/");
                // await apolloClient.resetStore();
              }}
              variant="ghost" 
              loading={logoutLoading}
            >
              logout
            </Button>
          </Flex>
        )}
        </Box>
      </Flex>
  );
};

export default NavBar;
import { Box, Button, Center, Divider, Flex, Heading, HStack, Link, Spacer, Text } from "@chakra-ui/react";
// import {withApollo} from "../utils/withApollo";
import NavBar from "../components/NavBar";
import { useMeQuery } from "../graphql/generated/graphql";
import { useIsAuth } from "../utils/useIsAuth";
import Projects from "../components/Projects";
import NextLink from 'next/link';
import CreateProject from "../components/CreateProject";
// import { withApollo } from "../utils/withApollo";

const Index = () => {
  const {data, loading} = useMeQuery();

  let body = null;
  if(!data?.me) {
    body = (
      <>
      <Flex bg="teal.400"  justify="center" h="980px" >
          <Text fontSize={120} pos="absolute" top={24}  fontFamily="comic-sans" color="white">Issue Tracker</Text>
          <Flex mt={10}>
            <HStack spacing={5}>
            <NextLink href='/login'>
              <Button size="lg" height='57px' width='240px' fontSize={22} >Login</Button>
            </NextLink> 
            <Center height='80px'>
              <Divider orientation='vertical' />
            </Center>
            <NextLink href='/register'>
              <Button size="lg" height='57px' width='240px' fontSize={22}>Register</Button>
            </NextLink>
            </HStack>
          </Flex>
      </Flex>
      </>
    );
  } else if(loading) {
    body = (
      <>
        <NavBar />
      </>
    );
  } else {
    body = (
      <>
          <NavBar />
          <Flex mx="auto" mt={5} w={1000}>          
            <Heading fontSize={45} >Projects</Heading>
            <Spacer />
            <CreateProject />
          </Flex>
          <Projects />
      </>
    );
  }
  return(
    <Box>{body}</Box>
  );
}

export default /*withApollo({ ssr: true })(*/Index//);
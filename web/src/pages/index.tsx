import { Box, Button, Center, Flex, Heading, HStack, Link as ChakraLink, Separator, Spacer, Text } from "@chakra-ui/react";
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
            <HStack gap={5}>
            <ChakraLink as={NextLink} href = '/login' _hover={{ textDecoration: 'none' }}>
              <Button size="lg" height='57px' width='240px' fontSize={22} variant={"surface"} >Login</Button>
            </ChakraLink>
            <Center height='80px'>
              <Separator orientation='vertical' height="100%" />
            </Center>
            <ChakraLink as={NextLink} href = '/register' _hover={{ textDecoration: 'none' }}>
              <Button size="lg" height='57px' width='240px' fontSize={22} variant={"surface"} >Register</Button>
            </ChakraLink>
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
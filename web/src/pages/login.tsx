import { Field, Formik } from 'formik';
import React from 'react';
import { Text, Box, Button, ChakraProvider, Flex, FormControl, FormErrorMessage, FormLabel, 
  Input, VStack, Link } from '@chakra-ui/react';
import { useForgotPasswordMutation, useLoginMutation } from '../graphql/generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { useApolloClient } from '@apollo/client';
// import {withApollo} from '../utils/withApollo';
import NextLink from 'next/link';


const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [login] = useLoginMutation();
  const [forgotPassword] = useForgotPasswordMutation();
  const apolloClient = useApolloClient();
  return (
    <Flex bg="gray.100"  justify="center" h="980px" >
      <Text fontSize={64} pos="absolute" top={24}>Login</Text>
        <Formik
          initialValues={{
            usernameOrEmail: "",
            password: "",
          }}
          onSubmit={ async (values: any, {setErrors}: any) => {
            const response =  await login({ variables: values });
            if(response.data?.login.errors) {
              setErrors(toErrorMap(response.data.login.errors));
            } else {
              router.push("/");
              await apolloClient.resetStore();
            }
          }}
        >
          {({ handleSubmit, errors, touched, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <Box bg="white" p={6} rounded="md" w={80} h="auto" mt={240}>
                <VStack spacing={10} align="flex-start">
                  <FormControl isInvalid={!!errors.usernameOrEmail && touched.usernameOrEmail}>
                    <FormLabel htmlFor="usernameOrEmail">Username or Email ID</FormLabel>
                    <Field
                      as={Input}
                      id="usernameOrEmail"
                      name="usernameOrEmail"
                      type="username"
                      variant="filled"
                    />
                    <FormErrorMessage>{errors.usernameOrEmail}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.password && touched.password}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type="password"
                      variant="filled"
                    />
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>
                  <NextLink href='/forgot-password'>
                    <Link>Forgot Password?</Link>
                  </NextLink>
                  <Button type="submit" colorScheme="purple" width="full" isLoading={ isSubmitting }>
                    Submit
                  </Button>
                </VStack>
              </Box>
            </form>
          )}
        </Formik>
    </Flex>
  );
};

export default /*withApollo({ ssr: false })(*/Login//);
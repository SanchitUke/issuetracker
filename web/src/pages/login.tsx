import { Field, Formik } from 'formik';
import React from 'react';
import { Text, Box, Button, Flex, Input, VStack, Link as ChakraLink, Field as ChakraField } from '@chakra-ui/react';
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
                <VStack gap={10} align="flex-start">
                  <ChakraField.Root isInvalid={!!errors.usernameOrEmail && touched.usernameOrEmail}>
                    <ChakraField.Label>Username or Email ID</ChakraField.Label>
                    <Field
                      as={Input}
                      id="usernameOrEmail"
                      name="usernameOrEmail"
                      type="username"
                      variant="filled"
                    />
                    <ChakraField.ErrorText>{errors.usernameOrEmail}</ChakraField.ErrorText>
                  </ChakraField.Root>
                  <ChakraField.Root isInvalid={!!errors.password && touched.password}>
                    <ChakraField.Label>Password</ChakraField.Label>
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type="password"
                      variant="filled"
                    />
                    <ChakraField.ErrorText>{errors.password}</ChakraField.ErrorText>
                  </ChakraField.Root>
                  <ChakraLink as={NextLink} href = '/forgot-password'>Forgot Password?</ChakraLink>
                  <Button type="submit" colorScheme="purple" width="full" loading={ isSubmitting }>
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
import { useApolloClient } from '@apollo/client';
import { Flex, VStack, FormControl, FormLabel, Input, FormErrorMessage, Button, Text, Link, Box } from '@chakra-ui/react';
import { Formik, Field } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { toErrorMap } from '../utils/toErrorMap';
// import {withApollo} from '../utils/withApollo';
import { useForgotPasswordMutation } from '../graphql/generated/graphql';
import login from './login';


const ForgotPassword: React.FC<{}> = ({}) => {
    const [complete, setComplete] = useState(false);
    const router = useRouter();
    const [forgotPassword] = useForgotPasswordMutation();
    const apolloClient = useApolloClient();
    return (
      <Flex bg="gray.100"  justify="center" h="980px" >
          <Formik
            initialValues={{ email: "" }}
            onSubmit={ async (values) => {
              await forgotPassword({ variables: values });
              setComplete(true);
            }}
          >
            {({ handleSubmit, isSubmitting }) => complete ? (
                <Box>
                    If an account with that Email ID exists, we sent you an email to reset password
                </Box> 
            ) : (
              <form onSubmit={handleSubmit}>
                <Box bg="white" p={6} rounded="md" w={80} h="auto" mt={240}>
                  <VStack spacing={10} align="flex-start">
                   <FormControl>
                      <FormLabel htmlFor="email">Email Address</FormLabel>
                      <Field
                        as={Input}
                        id="email"
                        name="email"
                        type="email"
                        variant="filled"
                      />
                    </FormControl>
                    <Button type="submit" colorScheme="purple" width="full" isLoading={ isSubmitting }>
                      Reset Password
                    </Button>
                  </VStack>
                </Box>
              </form>
            )}
          </Formik>
      </Flex>
    );
};

export default /*withApollo()(*/ForgotPassword//);
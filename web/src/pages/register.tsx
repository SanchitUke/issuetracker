import { Field, Formik } from 'formik';
import React from 'react';
import { Text, Box, Button, ChakraProvider, Checkbox, Flex, FormControl, FormErrorMessage, FormLabel, 
  Input, VStack } from '@chakra-ui/react';
import { useRegisterMutation } from '../graphql/generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
// import {withApollo} from '../utils/withApollo';

interface registerProps {

}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [register] = useRegisterMutation();
  return (
      <Flex bg="gray.100"  justify="center" h="980px" >
        <Text fontSize={64} pos="absolute" top={24}>Register</Text>
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
            }}
            onSubmit={ async (values, {setErrors}) => {
              const response =  await register({ variables: {options: values} });
              if(response.data?.register.errors) {
                setErrors(toErrorMap(response.data.register.errors));
              } else {
                router.push("/");
              }
            }}
          >
            {({ handleSubmit, errors, touched, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
                <Box bg="white" p={6} rounded="md" w={80} h="auto" mt={240}>
                  <VStack spacing={10} align="flex-start">
                    <FormControl isInvalid={!!errors.username && touched.username}>
                      <FormLabel htmlFor="username">Username</FormLabel>
                      <Field
                        as={Input}
                        id="username"
                        name="username"
                        type="username"
                        variant="filled"
                        validate={(value: any) => {
                          let error;

                          if (value.length < 3) {
                            error = "Username must contain at least 3 characters";
                          }
                          if(value.includes("@")) {
                            error = "Character '@' not allowed in username";
                          }

                          return error;
                        }}
                      />
                      <FormErrorMessage>{errors.username}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.email && touched.email}>
                      <FormLabel htmlFor="email">Email Address</FormLabel>
                      <Field
                        as={Input}
                        id="email"
                        name="email"
                        type="email"
                        variant="filled"
                        validate={(value: any) => {
                          let error;

                          if(!value.includes("@")) {
                            error = "Invalid email address";
                          }

                          return error;
                        }}
                      />
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.password && touched.password}>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Field
                        as={Input}
                        id="password"
                        name="password"
                        type="password"
                        variant="filled"
                        validate={(value: any) => {
                          let error;

                          if (value.length < 3) {
                            error = "Password must contain at least 3 characters";
                          }

                          return error;
                        }}
                      />
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
                    </FormControl>
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

export default /*withApollo({ ssr: false })(*/Register//);
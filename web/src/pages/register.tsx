import { Field, Formik } from 'formik';
import React from 'react';
import { Text, Box, Button, Flex, Field as ChakraField, Input, VStack } from '@chakra-ui/react';
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
                  <VStack gap={10} align="flex-start">
                    <ChakraField.Root invalid={!!errors.username && touched.username}>
                      <ChakraField.Label >Username</ChakraField.Label>
                      <Field
                        as={Input}
                        id="username"
                        name="username"
                        type="username"
                        variant="subtle"
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
                      <ChakraField.ErrorText>{errors.username}</ChakraField.ErrorText>
                    </ChakraField.Root>
                    <ChakraField.Root invalid={!!errors.email && touched.email}>
                      <ChakraField.Label>Email Address</ChakraField.Label>
                      <Field
                        as={Input}
                        id="email"
                        name="email"
                        type="email"
                        variant="subtle"
                        validate={(value: any) => {
                          let error;

                          if(!value.includes("@")) {
                            error = "Invalid email address";
                          }

                          return error;
                        }}
                      />
                      <ChakraField.ErrorText>{errors.email}</ChakraField.ErrorText>
                    </ChakraField.Root>
                    <ChakraField.Root invalid={!!errors.password && touched.password}>
                      <ChakraField.Label>Password</ChakraField.Label>
                      <Field
                        as={Input}
                        id="password"
                        name="password"
                        type="password"
                        variant="subtle"
                        validate={(value: any) => {
                          let error;

                          if (value.length < 3) {
                            error = "Password must contain at least 3 characters";
                          }

                          return error;
                        }}
                      />
                      <ChakraField.ErrorText>{errors.password}</ChakraField.ErrorText>
                    </ChakraField.Root>
                    <Button type="submit" colorPalette="teal" width="full" loading={ isSubmitting }>
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
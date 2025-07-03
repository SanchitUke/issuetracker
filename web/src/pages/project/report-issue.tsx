import { Flex, VStack, Field as ChakraField, Input, Button, Text, Box, Link, Textarea, Select } from '@chakra-ui/react';
import { Formik, Field } from 'formik';
import { useRouter } from 'next/router';
import React from 'react'
import { toErrorMap } from '../../utils/toErrorMap';
// import { withApollo } from '../../utils/withApollo';
import login from '../login';
import NextLink from 'next/link'
import { useCreateIssueMutation, useUserProjectsQuery } from '../../graphql/generated/graphql';
import { useApolloClient } from '@apollo/client';


const ReportIssue: React.FC<{}> = () => {
  const router = useRouter();
  const [createIssue] = useCreateIssueMutation();
  const {data} = useUserProjectsQuery();
  const intId = typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  let invalidAccess = true;
  data?.userProjects.forEach((up) => {
    if(up.id === intId) {
      invalidAccess = false;
    }
  })
  const apolloClient = useApolloClient();
  if(invalidAccess) {
    return(
      <>
        <div>Unauthorized access</div>
        <NextLink href={"/"}>
          <Button variant="outline">Click here to go back to home page</Button>
        </NextLink>
      </>
    );
  }
  return (
    <Flex bg="gray.100"  justify="center" h="980px" >
        <Formik
          initialValues={{
            title: "",
            text: "",
            priority: ""
          }}
          onSubmit={ async (values) => {
            const response =  await createIssue({ variables:{
              id: intId,
              title: values.title,
              text: values.text,
              priority: values.priority
            }});
            if(!response.data?.createIssue) {
              router.push("/");
            } else {
              router.back();
              await apolloClient.resetStore();
            }
          }}
        >
          {({ handleSubmit, errors, touched, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <Box bg="white" p={6} rounded="md" w={80} h="auto" mt={240}>
                <VStack gap={10} align="flex-start">
                  <ChakraField.Root isRequired>
                    <ChakraField.Label>Title</ChakraField.Label>
                    <Field
                      as={Input}
                      id="title"
                      name="title"
                      type="title"
                      variant="filled"
                    />
                  </ChakraField.Root>
                  <ChakraField.Root >
                    <ChakraField.Label>Text</ChakraField.Label>
                    <Field
                      as={Textarea}
                      id="text"
                      name="text"
                      type="text"
                      variant="filled"
                    />
                  </ChakraField.Root>
                  <ChakraField.Root isRequired>
                    <ChakraField.Label>Priority</ChakraField.Label>
                    <Field
                      as={Select}
                      id="priority"
                      name="priority"
                      type="priority"
                      variant="filled"
                      placeholder="select"
                    >
                      <option>low</option>
                      <option>medium</option>
                      <option>high</option>
                    </Field>
                      
                  </ChakraField.Root>
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

export default /*withApollo()(*/ReportIssue//);
import { Flex, VStack, FormControl, FormLabel, Input, FormErrorMessage, Button, Text, Box, Link, Textarea, Select } from '@chakra-ui/react';
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
          <Button variant="link">Click here to go back to home page</Button>
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
                <VStack spacing={10} align="flex-start">
                  <FormControl isRequired>
                    <FormLabel htmlFor="title">Title</FormLabel>
                    <Field
                      as={Input}
                      id="title"
                      name="title"
                      type="title"
                      variant="filled"
                    />
                  </FormControl>
                  <FormControl >
                    <FormLabel htmlFor="text">Text</FormLabel>
                    <Field
                      as={Textarea}
                      id="text"
                      name="text"
                      type="text"
                      variant="filled"
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Priority</FormLabel>
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

export default /*withApollo()(*/ReportIssue//);
import { Flex, VStack, Field as ChakraField, Input, Button, Box, Textarea, Select, createListCollection, Portal, Heading  } from '@chakra-ui/react';
import { Formik, Field } from 'formik';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
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
  const [issuePriority, setIssuePriority] = useState("")
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
    <Flex bg="gray.100"  justify="center" h="980px">
      <VStack  mt={'20'}>
        <Heading fontSize={45}>Report Issue</Heading>
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
              priority: issuePriority
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
              <Box bg="white" p={6} rounded="md" w={80} h="auto" mt={20}>
                <VStack gap={10} align="flex-start">
                  <ChakraField.Root required>
                    <ChakraField.Label>Title</ChakraField.Label>
                    <Field
                      as={Input}
                      id="title"
                      name="title"
                      type="title"
                      variant="subtle"
                    />
                  </ChakraField.Root>
                  <ChakraField.Root >
                    <ChakraField.Label>Text</ChakraField.Label>
                    <Field
                      as={Textarea}
                      id="text"
                      name="text"
                      type="text"
                      variant="subtle"
                    />
                  </ChakraField.Root>
                  <ChakraField.Root>
                  <Select.Root 
                    id="priority" 
                    name="priority" 
                    collection={priorities} 
                    variant={"subtle"} 
                    onChange={(e:any) => setIssuePriority(e.target.value)}
                  >
                    <Select.HiddenSelect />
                    <Select.Label>Select priority</Select.Label>
                    <Select.Control>
                      <Select.Trigger>
                        <Select.ValueText key={"Select"} />
                      </Select.Trigger>
                      <Select.IndicatorGroup>
                        <Select.Indicator />
                      </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                      <Select.Positioner>
                        <Select.Content >
                          {priorities.items.map((priority: any) => (
                            <Select.Item  item={priority} key={priority.value}>
                              {priority.label}
                              <Select.ItemIndicator />
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Positioner>
                    </Portal>
                  </Select.Root>
                  {/* <ChakraField.ErrorText>This is an error</ChakraField.ErrorText> */}
                  </ChakraField.Root>
                  <Button type="submit" colorPalette={"teal"} width="full" loading={ isSubmitting }>
                    Submit
                  </Button>
                </VStack>
              </Box>
            </form>
          )}
        </Formik>
        </VStack>
    </Flex>
  );
};

export default /*withApollo()(*/ReportIssue//);

const priorities = createListCollection({
  items: [
    { label: "High", value: "High" },
    { label: "Medium", value: "Medium" },
    { label: "Low", value: "Low" },
  ],
})
import {Tag, Box, Button, ButtonGroup, Flex, Heading, IconButton, Spacer, Tab, TabList, 
  TabPanel, TabPanels, Tabs, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react'
import NavBar from '../../components/NavBar';
import { useMeQuery, useProjectQuery } from '../../graphql/generated/graphql';
// import { withApollo } from '../../utils/withApollo';
import NextLink from 'next/link'
import AddMember from '../../components/AddMember';
import MembersList from '../../components/MembersList';


const Project = () => {
  const router = useRouter();
  const {data: meData} = useMeQuery();
  const intId = typeof router.query.id === 'string'? parseInt(router.query.id) : -1;
  const {data, loading} = useProjectQuery({
    variables: {
      id: intId
    }
  });
  if(loading || !data) {
    return(
      <>
        <NavBar />
        <div>loading...</div>
      </>
    );
  }
  const createdAt = new Date(parseInt(data?.project.createdAt));
  let lastUpdate = (Date.now() - parseInt(data?.project.lastUpdate)) / (1000 * 60 * 60 * 24);
  let lastUpdateString = Math.floor(lastUpdate).toString() + " days ago";
  if(!Math.floor(lastUpdate)) {
    lastUpdate = lastUpdate * 24;
    lastUpdateString = Math.floor(lastUpdate).toString() + " hours ago";
    if(!Math.floor(lastUpdate)) {
      lastUpdate = lastUpdate * 60;
      lastUpdateString = Math.floor(lastUpdate).toString() + " minutes ago";
    }
  }
  const memNames = data.project.members.map((m) => m.username);
  const openIssues = data.project.issues.filter((i) => i.status === "open");
  const closedIssues = data.project.issues.filter((i) => i.status === "closed");
  return (
    <>
      <NavBar />
      <Flex mx="auto" mt={5} w={1300}>
        <Heading fontSize={45} >{data?.project.name}</Heading>
        <Spacer />
        <ButtonGroup ml={4} mt={2} size="lg" isAttached variant='outline'>
          <MembersList memberNames={memNames} />
          {(meData?.me?.userId === data.project.ownerId) 
          ? <AddMember /> 
          : null }
        </ButtonGroup>
        <NextLink href={{pathname:"/project/report-issue", query: {id: intId}}}  >
          <Button ml={4} mt={2} size="lg" bgColor="red.300">Report a bug</Button>
        </NextLink>
      </Flex>
      <Flex mx="auto" mt={5} w={1300}>
        <Text mt={2.5} color="gray.700" fontSize={18}>
          Owner: {data?.project.owner.username}
        </Text>
        <Spacer />
        <Box>
        <Text color="gray.500">Created at: {createdAt.toDateString()}</Text>
        <Text color="gray.500">Last updated on: {lastUpdateString}</Text>
        </Box>
      </Flex>
      
      <Tabs mx="auto" mt={6} w={1300}>
        <TabList >
          <Tab>Open</Tab>
          <Tab>Closed</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
          { !openIssues ? <div>loading..</div> : openIssues.map((i) => 
          // eslint-disable-next-line
            <Flex >
              <NextLink 
                href={{pathname:'project/issue/[id].tsx', query: {projectId: intId}}} 
                as={`/project/issue/${i.id}`}
              >
              <Box as='button' 
                w={1300} 
                key={i.id} 
                p={4} 
                rounded="md" 
                h="auto" 
                borderWidth={2} 
                textAlign="left"
                mt={1}
              >
                <Flex>
                <Box>
                { i.title }
                </Box>
                <Spacer />
                { i.priority === "low" ? <Tag colorScheme='green' fontWeight="bold">Low</Tag> : null}
                { i.priority === "medium" ? <Tag colorScheme='yellow' fontWeight="bold">Medium</Tag> : null}
                { i.priority === "high" ? <Tag colorScheme='red' fontWeight="bold">High</Tag> : null}
                </Flex>
              </Box>
              </NextLink>
            </Flex>
          )}
          </TabPanel>
          <TabPanel>
          
          { !closedIssues ? <div>loading..</div> : closedIssues.map((i) => 
          // eslint-disable-next-line
            <Flex >
              <NextLink 
                href={{pathname:'project/issue/[id].tsx', query: {projectId: intId}}} 
                as={`/project/issue/${i.id}`}
              >
              <Box as='button' 
                w={1300} 
                key={i.id} 
                p={4} 
                rounded="md" 
                h="auto" 
                borderWidth={2} 
                textAlign="left"
                textColor="gray.600"
              >
                { i.title }
                
              </Box>
              </NextLink>
            </Flex>
          )}
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Box mx="auto" mt={6} w={1300}>
      
      </Box>
    </>
  );
};

export default /*withApollo()(*/Project//);
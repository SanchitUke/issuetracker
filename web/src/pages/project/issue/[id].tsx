import { Flex, Heading, Spacer, Box, Text, Button, Avatar, Icon } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react'
import NavBar from '../../../components/NavBar';
import WriteComment from '../../../components/WriteComment';
import { useCloseIssueMutation, useIssueQuery, useMeQuery, useWriteCommentMutation } from '../../../graphql/generated/graphql';
// import { withApollo } from '../../../utils/withApollo';
import { FaRegCircleCheck } from "react-icons/fa6";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const Issue = () => {
  const router = useRouter();
  const intId = typeof router.query.id === 'string'? parseInt(router.query.id) : -1;
  const {data: meData} = useMeQuery();
  const {data, loading} = useIssueQuery({ variables: {
    id: intId
  } });
  const [closeIssue] = useCloseIssueMutation();
  if(loading || !data) {
    return(
      <>
        <NavBar />
        <div>loading...</div>
      </>
    );
  }
  const createdAt = new Date(parseInt(data?.issue.createdAt));

  return (
    <>
      <NavBar />
      <Flex mx="auto" mt={5} w={1300}>
        <Heading fontSize={45} >{data?.issue.title}</Heading>
        <Spacer />
        { data.issue.status === "open" 
        ? (meData?.me?.userId === data.issue.project.ownerId) 
          ? <Button size="lg" variant={"surface"} onClick={() => closeIssue()}> <FaRegCircleCheck color="green" /> Close Issue</Button>
          : <Button size="lg" variant="outline" fontWeight="bold" >
              <Icon  color='red.500' mr={1} my="auto" >
                <AiOutlineExclamationCircle/>
              </Icon>
              Open
            </Button>
        : <Button size="lg" variant="outline" fontWeight="bold" >
          <Icon mr={2}>
            <FaRegCircleCheck />
          </Icon>
          Closed
          </Button>
        }
        {/* { ((meData?.me?.userId === data.issue.project.ownerId) && data.issue.status === "open") 
          ? <Button size="lg" onClick={() => closeIssue()}>Close Issue</Button>
          :  <Box p={6} rounded="md" h="auto" borderWidth={2} >
              {}
            </Box>} */}
      </Flex>
      <Flex mx="auto" mt={5} w={1300}>
        <Text mt={2.5} color="gray.700" fontSize={18}>Raised by: {data?.issue.raisedBy}</Text>
        <Spacer />
        <Box>
          <Text color="gray.500">Created at: {createdAt.toDateString()}</Text>
        </Box>
      </Flex>
      { !data.issue.text ? null : 
        <Flex mx="auto" mt={7} w={1300}>
          <Box  w={1300}>
            <Heading fontSize={25}  >Description</Heading>
            <Text mt={4}>{data.issue.text}</Text>
          </Box>
        </Flex>
      }
      <Heading fontSize={30} mx="auto" mt={10} w={1300}>Discussion</Heading>
      { !data.issue.comments ? <div>loading..</div> : data.issue.comments.map((c) => 
        // eslint-disable-next-line
        <Flex mx="auto" mt={5} w={1300}>
          <Box w={1300} 
            p={6} 
            rounded="md" 
            h="auto" 
            borderWidth={2} 
            textAlign="left"
          >
            <Flex>
            <Avatar.Root>
              <Avatar.Fallback />
            </Avatar.Root>
            <Box ml={5}>
            <Text fontWeight="bold">{c.commentedBy}</Text>
            <Text color="gray.500">{c.commentedOn}</Text>
            <Text>{ c.text }</Text>
            </Box>
            </Flex>
          </Box>
        </Flex>
      )}
      <Flex mx="auto" mt={5} w={1300} mb={5}>
        <WriteComment />
      </Flex>
    </>
  );
};

export default /*withApollo()(*/Issue//);
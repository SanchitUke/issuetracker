import { Box, Flex, VStack, Link as ChakraLink } from '@chakra-ui/react';
import React from 'react'
import { useUserProjectsQuery } from '../graphql/generated/graphql';
import NextLink from 'next/link'

interface ProjectsProps {

}

const Projects: React.FC<ProjectsProps> = ({}) => {
    const {data, loading} = useUserProjectsQuery();

    return (
        <>
            <Flex justify="center" mt={10} h={400}>
            <VStack gap={5}>

            { !data ? <div>loading..</div> : data.userProjects.map((p) => 
            // eslint-disable-next-line
                <ChakraLink as={NextLink} href={`/project/${p.id}`}>
                    <Box as='button'  key={p.id} p={6} rounded="md" w={1000} h="auto" borderWidth={2}>{ p.name }</Box>
                </ChakraLink>
            )}
            </VStack>
            </Flex>
        </>
    );
};

export default Projects;
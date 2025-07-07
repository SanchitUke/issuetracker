import { Flex, Link as ChakraLink, Image, Button, Card, For, Stack } from '@chakra-ui/react';
import React from 'react'
import { useUserProjectsQuery } from '../graphql/generated/graphql';
import NextLink from 'next/link'

interface ProjectsProps {

}

const Projects: React.FC<ProjectsProps> = ({}) => {
    const {data, loading} = useUserProjectsQuery();

    return (
        <>
            <Flex mt={50} mx="10%">
                { !data ? <div>loading..</div> : 
                data.userProjects.length ?
                (
                    <Stack  gap="4" direction="row" wrap="wrap">
                        <For each={data.userProjects}>
                            {(p) => (
                            <Card.Root maxW="280px" overflow="hidden">
                                <Image
                                    src="https://plus.unsplash.com/premium_photo-1720287601920-ee8c503af775"
                                    alt="Project X"
                                />
                                <Card.Body gap="2">
                                    <Card.Title>{ p.name }</Card.Title>
                                    {/* <Card.Description>Owner: {p.owner.userId}</Card.Description> */}
                                </Card.Body>
                                <Card.Footer justifyContent="flex-end">
                                    <ChakraLink as={NextLink} href={`/project/${p.id}`}>
                                        <Button variant="surface">View</Button>
                                    </ChakraLink>
                                </Card.Footer>
                                </Card.Root>
                            )}
                        </For>
                    </Stack>
                ) : <div style={{margin: 'auto'}}>No projects to show. Add one to get started!</div>
                }
            </Flex>
        </>
    );
};

export default Projects;
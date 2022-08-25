import React from 'react'
import { Button, ButtonGroup, FormControl, FormErrorMessage, FormLabel, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { useAddMemberMutation } from '../graphql/generated/graphql';
import { useApolloClient } from '@apollo/client';
import { Field, Formik } from 'formik';
import { toErrorMap } from '../utils/toErrorMap';
import { AddIcon } from '@chakra-ui/icons'
import MembersList from './MembersList';



const AddMember: React.FC<{}> = ({}) => {
  const [addMember] = useAddMemberMutation();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const apolloClient = useApolloClient();
  
  return (
    <>    
      <IconButton aria-label='Add to friends' onClick={onOpen} icon={<AddIcon />} />
      {/* <Button mt={2} size="lg" onClick={onOpen}>Add a member</Button> */}
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new member to the project</ModalHeader>
          <ModalCloseButton />
          <Formik
          initialValues={{
            username: ""
          }}
          onSubmit={ async (values: any, {setErrors}: any) => {
            const response = await addMember({ variables: values });
            if(response.data?.addMember !== "") {
              setErrors({username: response.data?.addMember});
            } else {
              await apolloClient.resetStore();
            }
          }}
        >
          {({ handleSubmit, errors, touched, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <ModalBody pb={6}>
                <FormControl isInvalid={!!errors.username && touched.username}>
                  <FormLabel htmlFor="username">User Name</FormLabel>
                  <Field
                      as={Input}
                      id="username"
                      name="username"
                      type="username"
                      variant="filled"
                      validate={(value: any) => {
                        let error;
                        if (value === "") {
                          error = "username cannot be empty";
                        }
                        return error;
                      }}
                    />
                  <FormErrorMessage>{errors.username}</FormErrorMessage>
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button type="submit" colorScheme='blue' mr={3} isLoading={ isSubmitting } >
                  Add
                </Button>
                <Button  onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </form>
          )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
    
  );
};

export default AddMember;
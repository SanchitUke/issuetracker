import React from 'react'
import NavBar from './NavBar';
import { Button, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { useCreateProjectMutation } from '../graphql/generated/graphql';
import { useApolloClient } from '@apollo/client';
import { Field, Formik } from 'formik';
import { toErrorMap } from '../utils/toErrorMap';


const CreateProject: React.FC<{}> = ({}) => {
  const [createProject] = useCreateProjectMutation();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const apolloClient = useApolloClient();
  let closeOnSave = true
  return (
    <>    
      <Button mt={2} size="lg" onClick={onOpen}>Create Project</Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new project</ModalHeader>
          <ModalCloseButton />
          <Formik
          initialValues={{
            name: ""
          }}
          onSubmit={ async (values: any, {setErrors}: any) => {
            const response = await createProject({ variables: values });
            await apolloClient.resetStore();
          }}
        >
          {({ handleSubmit, errors, touched, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <ModalBody pb={6}>
                <FormControl isInvalid={!!errors.name && touched.name}>
                  <FormLabel htmlFor="name">Project name</FormLabel>
                  <Field
                      as={Input}
                      id="name"
                      name="name"
                      type="username"
                      variant="filled"
                      validate={(value: any) => {
                        let error;
                        if (value === "") {
                          error = "Project name cannot be empty";
                        }
                        closeOnSave = false;
                        return error;
                      }}
                    />
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button 
                  type="submit" 
                  colorScheme='blue' 
                  mr={3} 
                  isLoading={ isSubmitting }  
                  onClick={closeOnSave ? onClose : onOpen}
                >
                  Save
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

export default CreateProject;
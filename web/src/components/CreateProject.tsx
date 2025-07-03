import React from 'react'
import { Button, Field as ChakraField,  Input, Dialog, useDisclosure, CloseButton } from '@chakra-ui/react';
import { useCreateProjectMutation } from '../graphql/generated/graphql';
import { useApolloClient } from '@apollo/client';
import { Field, Formik } from 'formik';


const CreateProject: React.FC<{}> = ({}) => {
  const [createProject] = useCreateProjectMutation();
  const { open, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const apolloClient = useApolloClient();
  let closeOnSave = true
  return (
    <>    
      <Button mt={2} size="lg" onClick={onOpen}>Create Project</Button>
      <Dialog.Root
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        open={open}
        onClose={onClose}
      >
        <Dialog.Backdrop />
        <Dialog.Content>
          <Dialog.Header>Create new project</Dialog.Header>
          <Dialog.CloseTrigger>
            <CloseButton size="sm" />
          </Dialog.CloseTrigger>
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
              <Dialog.Body pb={6}>
                <ChakraField.Root isInvalid={!!errors.name && touched.name}>
                  <ChakraField.Label>Project name</ChakraField.Label>
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
                  <ChakraField.ErrorText>{errors.name}</ChakraField.ErrorText>
                </ChakraField.Root>
              </Dialog.Body>
              <Dialog.Footer>
                <Button 
                  type="submit" 
                  colorScheme='blue' 
                  mr={3} 
                  loading={ isSubmitting }  
                  onClick={closeOnSave ? onClose : onOpen}
                >
                  Save
                </Button>
                <Button  onClick={onClose}>Cancel</Button>
              </Dialog.Footer>
            </form>
          )}
          </Formik>
        </Dialog.Content>
      </Dialog.Root>
    </>
    
  );
};

export default CreateProject;
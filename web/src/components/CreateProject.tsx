import React, { useState } from 'react'
import { Button, Field as ChakraField,  Input, Dialog, useDisclosure, Portal } from '@chakra-ui/react';
import { useCreateProjectMutation } from '../graphql/generated/graphql';
import { useApolloClient } from '@apollo/client';
import { Field, Formik } from 'formik';
import { IoMdAdd } from "react-icons/io";


const CreateProject: React.FC<{}> = ({}) => {
  const [createProject] = useCreateProjectMutation();
  const { open, onOpen, onClose } = useDisclosure()
  // const initialRef = React.useRef(null)
  // const finalRef = React.useRef(null)
  const apolloClient = useApolloClient();
  const [errorAlert, setErrorAlert] = useState(false);
  let closeOnSave = true
  return (
    <>    
      <Dialog.Root
        // initialFocusRef={initialRef}
        // finalFocusRef={finalRef}
        open={open}
        // onClose={onClose}
      >
        <Dialog.Trigger>
          <Button mt={2} size="lg" variant={'subtle'} onClick={onOpen}><IoMdAdd />New Project</Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Create new project</Dialog.Title>
              </Dialog.Header>
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
                      <ChakraField.Root invalid={!!errors.name && touched.name && errorAlert}>
                        <ChakraField.Label>Project name</ChakraField.Label>
                        <Field
                            as={Input}
                            id="name"
                            name="name"
                            type="username"
                            variant="subtle"
                            validate={(value: string) => {
                              let error: string | undefined;
                              if (value === "") {
                                error = "Project name cannot be empty";
                                closeOnSave = false;
                              } else
                                closeOnSave = true
                              return error;
                            }}
                          />
                        { errorAlert ? <ChakraField.ErrorText>{errors.name}</ChakraField.ErrorText> : undefined }
                      </ChakraField.Root>
                    </Dialog.Body>
                    <Dialog.Footer> 
                      <Button 
                        type="submit" 
                        variant={"solid"}
                        colorPalette={"teal"}
                        mr={3} 
                        loading={ isSubmitting }  
                        onClick={() => {
                          setErrorAlert(true)
                          closeOnSave ? onClose(): onOpen()
                        }
                      }
                      >
                        Save
                      </Button>
                      <Button variant={"surface"} color={"red"} onClick={() => {
                        setErrorAlert(false);
                        onClose()
                      }}>Cancel</Button>
                    </Dialog.Footer>
                  </form>
                )}
              </Formik>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
    
  );
};

export default CreateProject;
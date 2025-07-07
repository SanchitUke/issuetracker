import React, { useState } from 'react'
import { Button, Field as ChakraField, IconButton, Input, Dialog, useDisclosure, CloseButton, Portal } from '@chakra-ui/react';
import { useAddMemberMutation } from '../graphql/generated/graphql';
import { useApolloClient } from '@apollo/client';
import { Field, Formik } from 'formik';
import { IoMdPersonAdd } from "react-icons/io";


const AddMember: React.FC<{}> = ({}) => {
  const [addMember] = useAddMemberMutation();
  const { open, onOpen, onClose } = useDisclosure()
  // const initialRef = React.useRef(null)
  // const finalRef = React.useRef(null)
  const apolloClient = useApolloClient();
  const [errorAlert, setErrorAlert] = useState(false);
  let closeOnSave: Boolean = true
  return (
    <>    
      {/* <Button mt={2} size="lg" onClick={onOpen}>Add a member</Button> */}
      <Dialog.Root
        // initialFocusEl={() => initialRef.current}
        // finalFocusEl={finalRef}
        open={open}
        // onClose={onClose}
      >
        <Dialog.Trigger>
          <IconButton aria-label='Add to friends' onClick={onOpen}  >
            <IoMdPersonAdd />
          </IconButton>        
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>Add a new member to the project</Dialog.Header>
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
                  <Dialog.Body pb={6}>
                    <ChakraField.Root invalid={!!errors.username && touched.username && errorAlert}>
                      <ChakraField.Label >User Name</ChakraField.Label>
                      <Field
                        as={Input}
                        id="username"
                        name="username"
                        type="username"
                        variant="subtle"
                        validate={(value: string) => {
                          let error: string | undefined;
                          if (value === "") {
                            error = "username cannot be empty";
                            closeOnSave = false;
                          } else
                            closeOnSave = true
                          return error;
                        }}
                      />
                      { errorAlert ? <ChakraField.ErrorText>{errors.username}</ChakraField.ErrorText> : undefined }
                    </ChakraField.Root>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Button type="submit" 
                      variant={"solid"}
                      colorPalette={"teal"} 
                      mr={3} 
                      loading={ isSubmitting } 
                      onClick={() => {
                        setErrorAlert(true)
                        closeOnSave ? onClose(): onOpen()
                      }}
                    >
                      Add
                    </Button>
                    <Button variant={"surface"} color={"red"}  onClick={() => {
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

export default AddMember;
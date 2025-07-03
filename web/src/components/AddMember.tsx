import React from 'react'
import { Button, Field as ChakraField, IconButton, Input, Dialog, useDisclosure, CloseButton } from '@chakra-ui/react';
import { useAddMemberMutation } from '../graphql/generated/graphql';
import { useApolloClient } from '@apollo/client';
import { Field, Formik } from 'formik';
import { IoMdPersonAdd } from "react-icons/io";


const AddMember: React.FC<{}> = ({}) => {
  const [addMember] = useAddMemberMutation();
  const { open, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const apolloClient = useApolloClient();
  
  return (
    <>    
      <IconButton aria-label='Add to friends' onClick={onOpen}  >
        <IoMdPersonAdd />
      </IconButton>
      {/* <Button mt={2} size="lg" onClick={onOpen}>Add a member</Button> */}
      <Dialog.Root
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        open={open}
        onClose={onClose}
      >
        <Dialog.Backdrop />
        <Dialog.Content>
          <Dialog.Header>Add a new member to the project</Dialog.Header>
          <Dialog.CloseTrigger>
            <CloseButton size="sm" />
          </Dialog.CloseTrigger>
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
                <ChakraField.Root isInvalid={!!errors.username && touched.username}>
                  <ChakraField.Label >User Name</ChakraField.Label>
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
                  <ChakraField.ErrorText>{errors.username}</ChakraField.ErrorText>
                </ChakraField.Root>
              </Dialog.Body>
              <Dialog.Footer>
                <Button type="submit" colorScheme='blue' mr={3} loading={ isSubmitting } variant={'surface'}>
                  Add
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

export default AddMember;
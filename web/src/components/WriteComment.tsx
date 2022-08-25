import { useApolloClient } from '@apollo/client';
import { FormControl, FormLabel, Input, FormErrorMessage, Button, Textarea } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import React from 'react'
import { useWriteCommentMutation } from '../graphql/generated/graphql';



const WriteComment: React.FC<{}> = () => {
  const [writeComment] = useWriteCommentMutation();
  const apolloClient = useApolloClient();

  return (
    <Formik
      initialValues={{ text: '' }}
      onSubmit={ async (values) => {
        const response =  await writeComment({ variables: values});
        await apolloClient.resetStore();
      }}
    >
      {(props) => (
        <Form>
          <FormControl isRequired>
            <Field
              as={Textarea}
              placeholder="write..."
              id="text"
              name="text"
              type="text"
              variant="filled"
              w={1300}
            />
          </FormControl>
          <Button
            mt={3}
            
            colorScheme='teal'
            isLoading={props.isSubmitting}
            type='submit'
          >
            Post
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default WriteComment;
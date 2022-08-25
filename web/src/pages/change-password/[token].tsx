import { Flex, VStack, FormControl, FormLabel, Input, FormErrorMessage, Button, Box, Text } from "@chakra-ui/react";
import { Formik, Field } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { toErrorMap } from "../../utils/toErrorMap";
import {withApollo} from "../../utils/withApollo";
import { useChangePasswordMutation } from "../../graphql/generated/graphql";
6

const ChangePassword: NextPage = () => {
  const router = useRouter();
  const [changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState<string | undefined>();
  return(
      <Flex bg="gray.100"  justify="center" h="980px" >
        <Formik
          initialValues={{ newPassword: "" }}
          onSubmit={ async (values) => {
            const response = await changePassword({ 
              variables: { 
                newPassword: values.newPassword, 
                token: typeof router.query.token === "string" ? router.query.token : ""
              }});
            if(response.data?.changePassword.errors) {
              const errorMap = toErrorMap(response.data.changePassword.errors);
              setTokenError(errorMap.token)
            } else {
              router.push("/");
            }
          }}
        >
          {({ handleSubmit, errors, touched, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <Box bg="white" p={6} rounded="md" w={80} h="auto" mt={240}>
                <VStack spacing={10} align="flex-start">
                  <FormControl isInvalid={!!errors.newPassword && touched.newPassword}>
                    <FormLabel htmlFor="password">New password</FormLabel>
                    <Field
                      as={Input}
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      variant="filled"
                      validate={(value: any) => {
                        let error;

                        if (value.length < 3) {
                          error = "Password must contain at least 3 characters";
                        }
                        return error;
                      }}
                    />
                    <FormErrorMessage>{errors.newPassword}</FormErrorMessage>
                  </FormControl>
                  {tokenError ? <Box color="red">{tokenError}</Box> : null}
                  <Button type="submit" colorScheme="purple" width="full" isLoading={ isSubmitting }>
                    Change Password
                  </Button>
                </VStack>
              </Box>
            </form>
          )}
        </Formik>
    </Flex>
  );
}

export default withApollo()(ChangePassword);